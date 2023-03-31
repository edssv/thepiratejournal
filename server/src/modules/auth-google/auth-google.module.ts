import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleController } from './auth-google.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [ConfigModule, AuthModule],
    controllers: [AuthGoogleController],
    providers: [AuthGoogleService],
    exports: [AuthGoogleService],
})
export class AuthGoogleModule {}
