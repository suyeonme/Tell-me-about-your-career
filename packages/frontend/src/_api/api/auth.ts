import baseInstance from "@api/utils/axios/instance/baseInstance";
import type { BaseResponse } from "@api/utils/response.type";

export const signin = async (param: { email: string; password: string }) => {
  /**@todo authInstance에 기본경로 /auth로 설정 후 적용 */
  return baseInstance.post<
    BaseResponse<{
      id: number;
      email: string;
      username: string;
      job: string;
      phone: string;
      accessToken: string;
      refreshToken: string;
      role: "USER" | "ADMIN";
    }>
  >("/auth/signin", param);
};
