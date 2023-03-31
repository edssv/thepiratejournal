import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGoogleService } from './auth-google.service';

@Controller('auth/google')
export class AuthGoogleController {
    constructor(public authService: AuthService, public authGoogleService: AuthGoogleService) {}

    @Post('login')
    async login(@Body() body: { code: string }) {
        const socialData = await this.authGoogleService.getProfileByCode(body.code);

        return this.authService.validateSocialLogin(socialData);
    }

    @Post('onetap')
    async oneTap(@Body() body: { credential: string }) {
        const socialData = await this.authGoogleService.getProfileByCredential(body.credential);

        return this.authService.validateSocialLogin(socialData);
    }
}
