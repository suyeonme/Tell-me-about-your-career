import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import {
    LIMITER_BY_IP,
    LIMITER_BY_USERNAME_AND_IP,
    DAY_IN_SEC,
    HOUR_IN_SEC
} from './rateLimiterRedis.meta';

const redisClient = new Redis({ enableOfflineQueue: false });

// Block for 1 day, if 100 wrong attempts per day
const limiterSlowBruteByIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: LIMITER_BY_IP.KEY_PREFIX,
    /**
     * Maximum number of failed logins allowed.
     * Each failed login consumes a point (1 fail = 1 point)
     */
    points: LIMITER_BY_IP.MAX_WRONG_ATTEMPTS_BY_IP_PER_DAY,
    /** Delete key after 24 hours */
    duration: DAY_IN_SEC,
    /** Number of seconds to block route if consumed points > points */
    blockDuration: DAY_IN_SEC
});

// Block for 1 hour, if 5 consecutive wrong attempts for 1 hour
const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: LIMITER_BY_USERNAME_AND_IP.KEY_PREFIX,
    points: LIMITER_BY_USERNAME_AND_IP.MAX_CONSECUTIVE_FAILS_BY_USERNAME_AND_IP,
    /** Delete key after 1 hour */
    duration: HOUR_IN_SEC,
    /** Block for 1 hour */
    blockDuration: HOUR_IN_SEC
});

export { limiterSlowBruteByIP, limiterConsecutiveFailsByUsernameAndIP };
