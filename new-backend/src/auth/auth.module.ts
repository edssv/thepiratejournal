import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
