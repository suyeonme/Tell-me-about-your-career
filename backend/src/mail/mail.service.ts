import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    constructor(
        private readonly mailerService: MailerService,
        private configService: ConfigService
    ) {}

    public sendSignUpCongratMail(to: string): void {
        this.mailerService
            .sendMail({
                to,
                from: this.configService.get<string>('MAIL_USER'),
                subject:
                    '[tellmeaboutyourcareer] Congratulations on signing up for Our service!',
                text: 'welcome'
                /**@todo Write HTML body content */
                // html: '<b>welcome</b>'
            })
            .then((result) => {
                this.logger.log(
                    `Sending congrat email for signup successful: to=${to}`
                );
            })
            .catch((error) => {
                this.logger.error(
                    `Failed to send congrat mail for signup: to=${to}&message=${error.message}`
                );
            });
    }
}
