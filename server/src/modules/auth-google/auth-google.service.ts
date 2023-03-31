import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { SocialInterface } from '../../social/interfaces/social.interface';

@Injectable()
export class AuthGoogleService {
    private google: OAuth2Client;

    constructor(private configService: ConfigService) {
        this.google = new OAuth2Client(
            configService.get('google.clientId'),
            configService.get('google.clientSecret'),
            'postmessage'
        );
    }

    async getProfileByCode(code: string) {
        const { tokens } = await this.google.getToken(code);

        const ticket = await this.google.verifyIdToken({
            idToken: tokens.id_token,
            audience: [this.configService.get('google.clientId')],
        });

        const data = ticket.getPayload();

        return {
            id: data.sub,
            email: data.email,
            firstName: data.given_name,
            lastName: data.family_name,
            image: data.picture,
        };
    }

    async getProfileByCredential(credential: string) {
        const ticket = await this.google.verifyIdToken({
            idToken: credential,
            audience: [this.configService.get('google.clientId')],
        });

        const { sub, email, given_name, family_name, picture } = ticket.getPayload();

        return {
            id: sub,
            email: email,
            firstName: given_name,
            lastName: family_name,
            image: picture,
        };
    }
}
