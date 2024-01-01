/**@returns Number of milliseconds before next action can be done */
export const getRetrySecond = (rateLimiterRedisInstance): number => {
    return Math.round(rateLimiterRedisInstance.msBeforeNext / 1000) || 1;
};
