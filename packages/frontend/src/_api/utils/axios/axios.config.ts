import axios, { AxiosRequestConfig } from "axios";
import config from "@config/env.config";
import { REQUEST_TIMEOUT, ACCESS_TOKEN_KEY } from "./axios.meta";
import { errorMessageLogger } from "./utils";

export const createBaseAPI = (
  baseUrl: string,
  options: AxiosRequestConfig = {}
) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
};

/**
 * @description 요청 인터셉터, 액세스토큰을 헤더에 추가합니다.
 */
export const addRequestInterceptors = (
  instance: ReturnType<typeof axios.create>
) => {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

/**
 * @description
 * - 응답 인터셉터, 액세스토큰이 만료되었을 경우, 리프레시 토큰을 사용하여 재발급합니다.
 * - 에러 발생시 에러 로그를 출력합니다.
 */
export const addResponseInterceptors = (
  instance: ReturnType<typeof axios.create>
) => {
  instance.interceptors.response.use(
    (response) => {
      const accessToken = response.data.data[ACCESS_TOKEN_KEY];
      if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      }
      return response;
    },
    async (error) => {
      if (config.nodeEnv === "development") {
        // 에러 로깅
        errorMessageLogger(error);
      }

      // 액세스토큰 만료시 리프레시 토큰 재발급
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error?.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;
        try {
          const { data } = await instance.get("/auth/refresh");
          const accessToken = data[ACCESS_TOKEN_KEY];

          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      /**@description 서버에서 보낸 에러 메세지를 전달 */
      return Promise.reject({
        ...error,
        message: error?.response?.data?.message ?? error.message,
        status: error?.response?.status,
      });
    }
  );
};
