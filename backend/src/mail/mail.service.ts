import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import appConfig from '@config/app.config';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        @Inject(appConfig.KEY)
        private config: ConfigType<typeof appConfig>
    ) {}

    public sendSignUpCongratMail(to: string): void {
        this.mailerService
            .sendMail({
                to,
                from: this.config.nodemailer.senderEmail,
                subject:
                    '[tellmeaboutyourcareer] Congratulations on signing up for Our service!',
                text: 'welcome'
                // html: '<b>welcome</b>' // HTML body content
            })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
