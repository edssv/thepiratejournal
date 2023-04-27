import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailData } from './interfaces/mail-data.interface';
import { AllConfigType } from 'src/config/config.type';
import { MaybeType } from 'src/utils/types/maybe.type';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    let emailConfirmTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${this.configService.get('app.clientDomain', {
        infer: true,
      })}/confirm-email/${mailData.data.hash} ${emailConfirmTitle}`,
      template: 'activation',
      context: {
        title: emailConfirmTitle,
        url: `${this.configService.get('app.clientDomain', {
          infer: true,
        })}/confirm-email/${mailData.data.hash}`,
        actionTitle: emailConfirmTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        text1: 'hey1!',
        text2: 'hey2!',
        text3: 'hey3!',
      },
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>): Promise<void> {
    let resetPasswordTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;
    let text4: MaybeType<string>;

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: resetPasswordTitle,
      text: `${this.configService.get('app.clientDomain', {
        infer: true,
      })}/password-change/${mailData.data.hash} ${resetPasswordTitle}`,
      template: 'reset-password',
      context: {
        title: resetPasswordTitle,
        url: `${this.configService.get('app.clientDomain', {
          infer: true,
        })}/password-change/${mailData.data.hash}`,
        actionTitle: resetPasswordTitle,
        app_name: this.configService.get('app.name', {
          infer: true,
        }),
        text1,
        text2,
        text3,
        text4,
      },
    });
  }
}
