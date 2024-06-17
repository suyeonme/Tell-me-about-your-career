import config from "@config/env.config";

export const APP_SERVER_BASE_URL = config.serverBaseUrl ?? "";
export const REQUEST_TIMEOUT = 5000;
