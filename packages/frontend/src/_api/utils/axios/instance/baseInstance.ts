import {
  createBaseAPI,
  addRequestInterceptors,
  addResponseInterceptors,
} from "../axios.config";
import { APP_SERVER_BASE_URL } from "../constant";

/**
 * @description 일반적인 API 요청시 사용하는 axios 인스턴스입니다.
 */
const baseInstance = createBaseAPI(APP_SERVER_BASE_URL);

addRequestInterceptors(baseInstance);
addResponseInterceptors(baseInstance);

export default baseInstance;
