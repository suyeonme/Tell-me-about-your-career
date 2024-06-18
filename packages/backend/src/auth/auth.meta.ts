const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**@description process.env.JWT_REFRESH_EXPIRE_TIME와 동일함 */
export const REFRESH_TOKEN_COOKIE_MAX_AGE = 14 * DAY;
