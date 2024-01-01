export const HOUR_IN_SEC = 60 * 60;
export const DAY_IN_SEC = HOUR_IN_SEC * 24;
export const MILLISECOND = 1000;

export const LIMITER_BY_IP = {
    KEY_PREFIX: 'login_fail_ip_per_day',
    MAX_WRONG_ATTEMPTS_BY_IP_PER_DAY: 100,
    DURATION: DAY_IN_SEC,
    BLOCK_DURATION: DAY_IN_SEC
};

export const LIMITER_BY_USERNAME_AND_IP = {
    KEY_PREFIX: 'login_fail_consecutive_username_and_ip',
    MAX_CONSECUTIVE_FAILS_BY_USERNAME_AND_IP: 5,
    DURATION: 90 * DAY_IN_SEC,
    BLOCK_DURATION: HOUR_IN_SEC
};
