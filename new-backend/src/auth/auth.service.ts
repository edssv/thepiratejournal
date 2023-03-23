import { Injectable } from '@nestjs/common';

import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signIn(signInDto: SignInDto) {
        const user = await this.userService.findOneByEmail(signInDto.email);

        if (user) {
            return user;
        }

        return this.userService.create(signInDto);
    }
}
