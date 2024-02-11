import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { MailService } from './mail.service';
import appConfig from '@config/app.config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule.forFeature(appConfig)],
            inject: [appConfig.KEY],
            useFactory: (config: ConfigType<typeof appConfig>) => ({
                transport: {
                    host: config.nodemailer.host, // 이메일을 보낼 SMTP 서버의 주소
                    port: config.nodemailer.port, // SMTP 서버의 포트 번호
                    auth: {
                        user: config.nodemailer.senderEmail, // SMTP 서버 인증을 위한 사용자 이름
                        pass: config.nodemailer.senderPassword // SMTP 서버 인증을 위한 비밀번호
                    }
                },
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>'
                }
            })
        })
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
