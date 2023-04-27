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
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Активация аккаунта',
      text: `${this.configService.get('app.clientDomain', {
        infer: true,
      })}/${this.configService.get('app.apiPrefix', {
        infer: true,
      })}/confirm/${mailData.data.hash} 'Активация аккаунта'`,
      template: 'activation',
      context: {
        title: 'Активация аккаунта',
        url: `${this.configService.get('app.clientDomain', {
          infer: true,
        })}/${this.configService.get('app.apiPrefix', {
          infer: true,
        })}/confirm/${mailData.data.hash}`,
        actionTitle: 'Активировать аккаунт',
        app_name: this.configService.get('app.name', { infer: true }),
        text1: 'Нажмите на ссылку ниже, чтобы активировать свою учетную запись.',
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
