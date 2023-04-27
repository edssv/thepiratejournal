import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash as argonHash, verify } from 'argon2';
import * as crypto from 'crypto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { GenerateJwtTokenDto } from './dto/generate-jwt-token.dto';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { MailService } from '../mail/mail.service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneForAuth(email);
    if (!user) throw new NotFoundException('Пользователь не найден.');
    if (!user.password) throw new NotFoundException('Зарегистрирован через социальную сеть или пароль не найден.');

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) throw new UnauthorizedException('Неверный почтовый адрес или пароль.');

    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateSocialLogin(socialData: SocialInterface) {
    let user: User;
    const socialEmail = socialData.email?.toLowerCase();
    const userByEmail = await this.userService.findOneByEmail(socialEmail);
    user = userByEmail;

    if (userByEmail) {
      this.userService.update(user.id, {
        username: `${socialData.firstName} ${socialData.lastName}`,
        email: socialEmail,
        firstName: socialData.firstName,
        lastName: socialData.lastName,
        image: socialData.image,
      });
    } else {
      user = await this.userService.create({
        username: `${socialData.firstName} ${socialData.lastName}`,
        email: socialEmail,
        firstName: socialData.firstName,
        lastName: socialData.lastName,
        image: socialData.image,
      });

      user = await this.userService.findOne({ id: user.id });
    }

    return {
      user: user,
      accessToken: this.generateJwtTokens({ ...user, sub: user.id }).accessToken,
      refreshToken: this.generateJwtTokens({ ...user, sub: user.id }).refreshToken,
    };
  }

  generateJwtTokens(dto: GenerateJwtTokenDto) {
    const payload = { email: dto.email, sub: dto.sub, role: dto.role };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('auth.refreshSecret'),
      expiresIn: this.configService.get('auth.refreshExpires'),
    });

    return { accessToken, refreshToken };
  }

  async login(user: User) {
    const { password, ...userData } = user;

    return {
      user: userData,
      accessToken: this.generateJwtTokens({ ...user, sub: user.id }).accessToken,
      refreshToken: this.generateJwtTokens({ ...user, sub: user.id }).refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const findByEmail = await this.userService.findOneForAuth(signUpDto.email);
    const findByUsername = await this.userService.findOneByUsername(signUpDto.username);
    if (findByEmail) throw new BadRequestException('Данный почтовый адрес уже занят.');
    if (findByUsername) throw new BadRequestException('Данный никнейм уже занят.');

    const hash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');

    const { password, ...user } = await this.userService.create({
      username: signUpDto.username,
      email: signUpDto.email,
      password: await argonHash(signUpDto.password),
      hash: hash,
    });

    await this.mailService.userSignUp({
      to: signUpDto.email,
      data: {
        hash,
      },
    });

    return {
      user,
      accessToken: this.generateJwtTokens({ ...user, sub: user.id }).accessToken,
      refreshToken: this.generateJwtTokens({ ...user, sub: user.id }).refreshToken,
    };
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.userService.findOne({
      hash,
    });

    if (!user) throw new NotFoundException();

    user.hash = null;
    user.emailVerified = true;

    await this.userService.update(user.id, user);
  }

  async refresh(id: number) {
    const user = await this.userService.findOne({ id });

    if (!user) throw new UnauthorizedException('Пользователь не найден');

    return {
      user,
      accessToken: this.generateJwtTokens({ ...user, sub: user.id }).accessToken,
      refreshToken: this.generateJwtTokens({ ...user, sub: user.id }).refreshToken,
    };
  }

  async getProfile(user: User) {
    return this.userService.findOne({ id: user.id });
  }
}
