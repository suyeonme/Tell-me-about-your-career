import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { utilities, WinstonModule } from 'nest-winston';
import * as path from 'path';

const NODE_ENV = process.env.NODE_ENV;
const LOG_DIRECTORY_PATH = path.join(__dirname, '..', '..', '..', 'logs');
const DATE_PATTERN = 'YYYY-MM-DD'; // rotating
const MAX_FILES = 30; // logs to keep

const winstonLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                NODE_ENV === 'production'
                    ? winston.format.simple()
                    : winston.format.combine(
                          winston.format.timestamp(),
                          utilities.format.nestLike('Nest', {
                              colors: true,
                              prettyPrint: true
                          })
                      )
            )
        }),
        new winstonDaily({
            level: 'error',
            filename: `error-app.log%DATE%`,
            datePattern: DATE_PATTERN,
            dirname: LOG_DIRECTORY_PATH,
            maxFiles: MAX_FILES,
            zippedArchive: true,
            handleExceptions: true,
            json: false
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.printf((info) => {
            console.log(info);
            // [YYYY-MM-DD HH:mm:ss] [LEVEL] [PID] [LOGGER_NAME]: [MESSAGE]
            return `[${info.timestamp}] [${info.level}] [${process.pid}] [${info.context}]: ${info.message}`;
        })
    )
});

export default winstonLogger;
