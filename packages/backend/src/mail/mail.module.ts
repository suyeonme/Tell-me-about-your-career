import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService, type ConfigType } from '@nestjs/config';
import { MailService } from './mail.service';
import appConfig from '@config/app.config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule.forFeature(appConfig)],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const config: ConfigType<typeof appConfig> | undefined = configService.get('app');

                if (!config) {
                    throw new Error('{app} configuration is not defined');
                }

                return {
                    transport: {
                        host: config.nodemailer.host,
                        port: config.nodemailer.port,
                        auth: {
                            user: config.nodemailer.senderEmail,
                            pass: config.nodemailer.senderPassword,
                        },
                    },
                    defaults: {
                        from: '"nest-modules" <modules@nestjs.com>',
                    },
                };
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
