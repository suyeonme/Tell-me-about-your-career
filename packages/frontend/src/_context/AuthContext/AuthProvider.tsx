import React, { useState, useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { User } from "@api/utils/response.type";
import localStorageKey from "@config/localStorage.meta";
import { getUserProfile } from "@api/api/auth";

import { AuthContext } from "./AuthContext";

/**@todo 새로고침시에도 로그인 상태 유지 */

/**@description 로그인 상태 및 로그인된 유저를 관리합니다. */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { isLoading } = useQuery("auth/profile", getUserProfile, {
    onSuccess: (res) => {
      setUser(res.data);
    },
    onError: (error) => {
      console.error(error);
      setUser(null);
    },
  });

  const login = useCallback((data: User): void => {
    setUser(data);
    localStorage.setItem("accessToken", data.accessToken);
  }, []);

  const logout = useCallback((): void => {
    setUser(null);
    localStorage.removeItem(localStorageKey.AccessToken);
  }, []);

  const contextValue = useMemo(
    () => ({ user, login, logout, isLoading }),
    [user, login, logout, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
