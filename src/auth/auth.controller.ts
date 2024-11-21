// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, BadRequestException, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CustomMessage } from 'src/utils/decorator/custom-message.decorator';
import { SendOtpDTO } from './dto/send-otp.dto';
import { RegisterDTO } from './dto/register.dto';
import { VerifyOTPCodeDTO } from './dto/verify.otp-code.dto';
import { SetPasswordDTO } from './dto/set.password.dto';
import { UpdatePasswordDTO } from './dto/set.update.password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { AuthUser } from 'src/utils/auth.user';
import { UserTimeoneDTO } from './dto/user.timezone.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() dto: UserLoginRequestDto) {
    return this.authService.login(dto);
  }


  @CustomMessage('OTP has been sent to your email')
  @Post("register")
  async register(@Body() dto: RegisterDTO) {
    return await this.authService.register(dto);
  }

  @CustomMessage('OTP has been sent to your email')
  @Post("sendOtp")
  async sendOtp(@Body() dto: SendOtpDTO) {
    return await this.authService.sendOtp(dto);
  }

  @CustomMessage('OTP verified successfully')
  @Post('verifyOTP')
  async verifyOtp(@Body() body: VerifyOTPCodeDTO) {
    return await this.authService.verifyOTP(body);
  }

  @CustomMessage('Password has been set successfully')
  @Post('setPassword')
  async setPassword(@Body() body: SetPasswordDTO) {
    await this.authService.setPassword(body);
  }

  @CustomMessage('Password has been updated successfully')
  @Put('changePassword')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @User() authUser: AuthUser,
    @Body() dto: UpdatePasswordDTO,
  ) {
    await this.authService.updatePassword(authUser, dto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put('updateTimezoneSettings')
  async updateTimezoneSetting(
    @User() authUser: AuthUser,
    @Body() dto: UserTimeoneDTO,
  ) {
    await this.authService.updateTimezoneSetting(authUser.userId, dto);
  }
}
