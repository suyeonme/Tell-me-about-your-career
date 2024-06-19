import { createContext } from "react";
import { User } from "@api/utils/response.type";

export interface AuthContextType {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
  isLoading: boolean;
}

/**@description 로그인된 유저를 조회합니다.. */
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => undefined,
  logout: () => undefined,
  isLoading: false,
});
