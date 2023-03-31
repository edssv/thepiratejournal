import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/entities/user.entity';

type JwtPayload = Pick<User, 'email' | 'role'> & { sub: string } & { iat: number; exp: number };

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('auth.refreshSecret'),
        });
    }

    async validate(payload: JwtPayload) {
        return { id: payload.sub, email: payload.email, role: payload.role };
    }
}
