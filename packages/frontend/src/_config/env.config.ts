/**@description 환경변수 사용시 이 객체를 통해서 사용합니다. */
const config = Object.freeze({
  /** 어플리케이션 모드 */
  nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV,
  /** 개발환경에 따른 기본 URL */
  baseUrl: process.env.NEXT_APP_API_BASE_URL,
});

export default config;
