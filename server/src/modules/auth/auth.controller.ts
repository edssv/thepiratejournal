import { Controller, Post, Body, HttpCode, HttpStatus, Request, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RtGuard } from './guards/rt.guard';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(@Body() confirmEmailDto: AuthConfirmEmailDto): Promise<void> {
    return this.authService.confirmEmail(confirmEmailDto.hash);
  }

  @UseGuards(RtGuard)
  @Get('refresh')
  refresh(@Request() req) {
    return this.authService.refresh(+req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
