import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import appConfig from '@config/app.config';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    constructor(
        private readonly mailerService: MailerService,
        @Inject(appConfig.KEY)
        private config: ConfigType<typeof appConfig>
    ) {}

    public async sendSignUpCongratMail(to: string): Promise<void> {
        try {
            const result = await this.mailerService.sendMail({
                to,
                from: this.config.nodemailer.senderEmail,
                subject:
                    '[tellmeaboutyourcareer] Congratulations on signing up for Our service!',
                text: 'welcome'
                /**@todo Write HTML body content */
                // html: '<b>welcome</b>'
            });
            if (result) {
                this.logger.log(
                    `Sending congrat email for signup successful: to=${to}`
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                this.logger.error(
                    `Failed to send congrat mail for signup: to=${to}&message=${error.message}`
                );
            }
        }
    }
}
