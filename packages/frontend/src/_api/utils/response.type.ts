import { AxiosError } from "axios";

/**@description 서버에서 전달하는 응답 데이터 형식 */
export interface BaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

/**
 * @description axios 에러 형식
 * 자주 사용하는 값을 쉽게 접근하기 위함입니다.
 */
export interface CustomAxiosError extends AxiosError {
  message: string;
  status: number;
}

/**@description 사용자 정보 */
export interface User {
  id: number;
  email: string;
  username: string;
  job: string;
  phone: string;
  accessToken: string;
  refreshToken: string;
  role: "USER" | "ADMIN";
}
