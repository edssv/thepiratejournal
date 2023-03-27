import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { GenerateJwtTokenDto } from './dto/generate-jwt-token.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneForAuth(email);
        if (!user) throw new NotFoundException('Пользователь не найден.');

        const isValidPassword = await verify(user.password, password);
        if (!isValidPassword) throw new UnauthorizedException('Неверный почтовый адрес или пароль.');

        if (user && isValidPassword) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    generateJwtToken(dto: GenerateJwtTokenDto) {
        const payload = { email: dto.email, sub: dto.sub, role: dto.role };
        return this.jwtService.sign(payload);
    }

    async login(user: User) {
        const { password, ...userData } = user;

        return {
            userData,
            accessToken: this.generateJwtToken({ ...user, sub: user.id }),
        };
    }

    async signUp(signUpDto: SignUpDto) {
        const findByEmail = await this.userService.findOneForAuth(signUpDto.email);
        const findByUsername = await this.userService.findOneByUsername(signUpDto.username);
        if (findByEmail) throw new BadRequestException('Данный почтовый адрес уже занят.');
        if (findByUsername) throw new BadRequestException('Данный никнейм уже занят.');

        const { password, ...user } = await this.userService.create({
            username: signUpDto.username,
            email: signUpDto.email,
            password: await hash(signUpDto.password),
        });

        return { user, accessToken: this.generateJwtToken({ ...user, sub: user.id }) };
    }

    async getProfile(user: User) {
        return this.userService.findOne(user.id);
    }
}
