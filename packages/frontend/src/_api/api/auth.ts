import baseInstance from "@api/utils/axios/instance/baseInstance";
import type { BaseResponse, User } from "@api/utils/response.type";

export const signin = async (param: { email: string; password: string }) => {
  /**@todo authInstance에 기본경로 /auth로 설정 후 적용 */
  const response = await baseInstance.post<BaseResponse<User>>(
    "/auth/signin",
    param
  );
  return response.data;
};
