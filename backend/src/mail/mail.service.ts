import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
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
