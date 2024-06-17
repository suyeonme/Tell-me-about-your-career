import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "@config/env.config";
import { APP_SERVER_BASE_URL, REQUEST_TIMEOUT } from "../constant";
import { generateMessageByStatusCode } from "../utils";

/**
 * @description 일반적인 API 요청시 사용하는 axios 인스턴스입니다.
 */
const baseAPI = (baseUrl: string, options: Record<string, unknown> = {}) => {
  return axios.create(
    Object.assign(
      {
        baseURL: baseUrl,
        timeout: REQUEST_TIMEOUT,
        headers: {
          "Content-Type": "application/json",
        },
      },
      options
    )
  );
};

if (APP_SERVER_BASE_URL === undefined) {
  throw new Error(
    "APP_SERVER_BASE_URL is undefined. Please define process.env.NEXT_PUBLIC_API_BASE_URL in env file."
  );
}

const baseInstance = baseAPI(APP_SERVER_BASE_URL);

baseInstance.interceptors.response.use(
  (response) => {
    // 2xx 범위에 있는 상태 코드
    return response;
  },
  (error: AxiosError) => {
    // 2xx 외의 범위에 있는 상태 코드
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { status: statusCode, statusText } = error.response as AxiosResponse;

    if (config.nodeEnv === "development") {
      /**@todo 토스트로 에러 메세지 디스플레이 */
      let errorMessage = generateMessageByStatusCode(statusCode);
      console.error(errorMessage);

      /**@todo 요청 정보와 함께 에러 메세지를 Sentry에 로그로 남기기 */
      console.error(
        `[${method?.toUpperCase()}] ${url} | Error ${statusCode} ${statusText} | ${message}`
      );
    }

    return Promise.reject(error);
  }
);

export default baseInstance;
