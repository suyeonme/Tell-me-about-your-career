import React, { useContext, useLayoutEffect } from "react";
import { AuthContext } from "_context/AuthContext";
import { useRouter } from "next/router";
import { LoadingSpinner } from "@components/index";

/**@description 로그인이 요구되는 페이지에 사용합니다. */
const withProtectedRoute = <P extends {}>(
  WrappedComponent: React.ComponentType
) => {
  const router = useRouter();
  const { user, isLoading } = useContext(AuthContext);

  return (props: P) => {
    useLayoutEffect(() => {
      if (isLoading === false && user === null) {
        router.push("/signin");
      }
    }, [JSON.stringify(user), isLoading]);

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (user === null) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;
