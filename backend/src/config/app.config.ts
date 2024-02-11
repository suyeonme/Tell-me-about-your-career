import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessExpireTime: process.env.JWT_ACCESS_EXPIRE_TIME,
        refreshExpireTime: process.env.JWT_REFRESH_EXPIRE_TIME
    },
    throttle: {
        timeToLiveMilliSec: parseInt(process.env.TIME_TO_LIVE_MILLISEC),
        limitRequestTimeToLive: parseInt(process.env.LIMIT_REQUEST_TIME_TO_LIVE)
    },
    nodemailer: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        senderEmail: process.env.MAIL_USER,
        senderPassword: process.env.MAIL_PASSWORD
    }
}));
