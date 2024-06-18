import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const generateMessageByStatusCode = (
  statusCode: number,
  errorMessage?: string
) => {
  switch (statusCode) {
    case 400:
      return "잘못된 요청입니다.";
    case 401: {
      return "인증 실패입니다.";
    }
    case 403: {
      return "권한이 없습니다.";
    }
    case 404: {
      return "찾을 수 없는 페이지입니다.";
    }
    case 500: {
      return "서버 오류입니다.";
    }
    default: {
      return `에러가 발생했습니다. ${errorMessage ?? ""}`;
    }
  }
};

export const errorMessageLogger = (error: AxiosError): void => {
  const { message } = error;
  const { method, url } = error.config as AxiosRequestConfig;

  /**@todo 토스트로 에러 메세지 디스플레이 */
  if (error?.response) {
    if (error.response?.status && error.response?.statusText) {
      const {
        status: statusCode,
        statusText,
        data,
      } = error.response as AxiosResponse<{ message: string }>;
      let errorMessage = generateMessageByStatusCode(statusCode);

      /**@todo 요청 정보와 함께 에러 메세지를 Sentry에 로그로 남기기 */
      console.error(
        `[${method?.toUpperCase()}] ${url} | Error ${statusCode} ${statusText} | ${errorMessage} | ${
          data?.message ?? error.message
        }`
      );
    }
  }
};
