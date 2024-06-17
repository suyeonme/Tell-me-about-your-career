import baseInstance from "@api/utils/axios/instance/base.instance";

/**
 * @description 로그인
 */
export const signin = async (param: { email: string; password: string }) => {
  return baseInstance.post("/auth/signin", param);
};
