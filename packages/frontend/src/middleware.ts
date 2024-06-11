/**
 * @description
 * Break out middleware functionalities into separate .ts files and import them into your main middleware.ts file.
 * This allows for cleaner management of route-specific middleware, aggregated in the middleware.ts for centralized control.
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * @field matcher
 * matcher allows you to filter Middleware to run on specific paths.
 * 정규표현식 지원
 */
export const config = {
  matcher: ["/interview/:path*", "/user/:path*"],
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  /**
   * @todo
   * 로그인 여부에 따라서 페이지 리다이렉트
   * 어드민이 아니라면 /admin 페이지 리다이렉트
   */

  return response;
}
