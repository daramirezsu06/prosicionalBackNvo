import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { DiplomatService } from './diplomat.service';
import { Step1HomeCountryDto } from './dto/step1-home-country.dto';
import { Step2PersonalDetailsDto } from './dto/step2-personal-details.dto';
import { Step3LanguageSkillsDto } from './dto/step3-language-skills.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserTypes } from 'src/utils/decorator/user.types';
import { UserTypeList } from 'src/shared/enum/user.types';
import { User } from 'src/utils/decorator/user.decorator';
import { AuthUser } from 'src/utils/auth.user';
import { CustomMessage } from 'src/utils/decorator/custom-message.decorator';
import { SendOtpDTO } from 'src/auth/dto/send-otp.dto';
import { VerifyOTPCodeDTO } from 'src/auth/dto/verify.otp-code.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateDiplomatProfileDTO } from './dto/update.diplomat.profile';
import { PreChecklistDiplomatDTO } from './dto/pre.checklist.diplomat';
import { DeleteLanguageSkillsQuery } from './dto/delete-Language-skills.dto';

@UseGuards(JwtAuthGuard)
@UserTypes(UserTypeList.Diplomat)
@Controller('diplomat')
export class DiplomatController {
  constructor(
    private readonly diplomatService: DiplomatService,
    private readonly authService: AuthService,
  ) {}

  @Put('updateStep1')
  async updateStep1(@User() user: AuthUser, @Body() dto: Step1HomeCountryDto) {
    return this.diplomatService.updateStep1(user.userId, dto);
  }

  @Put('updateStep2')
  async updateStep2(
    @User() user: AuthUser,
    @Body() dto: Step2PersonalDetailsDto,
  ) {
    return this.diplomatService.updateStep2(user.userId, dto);
  }

  @Put('updateStep3')
  async updateStep3(
    @User() user: AuthUser,
    @Body() dto: Step3LanguageSkillsDto,
  ) {
    return this.diplomatService.updateStep3(user.userId, dto);
  }
  @Put('deleteLanguageSkills')
  async deleteLanguageSkills(
    @User() user: AuthUser,
    @Query() query: DeleteLanguageSkillsQuery,
  ) {
    return this.diplomatService.deleteLanguageSkills(user.userId, query.languageSkillId);
  }

  @Get('getDiplomatProfile')
  async getDiplomatProfile(@User() user: AuthUser) {
    return this.diplomatService.getDiplomatProfile(user.userId);
  }

  @CustomMessage('OTP has been sent to your email')
  @Post('sendOtp')
  async sendOtp(@User() user: AuthUser, @Body() dto: SendOtpDTO) {
    return await this.diplomatService.sendOtp(user.userId, dto);
  }

  @CustomMessage('Email verified successfully')
  @Post('verifyOTP')
  async verifyOtp(@Body() body: VerifyOTPCodeDTO) {
    return await this.authService.verifyOTP(body);
  }

  @CustomMessage('Profile updated successfully')
  @Put('updateDiplomatProfile')
  async updateDiplomatProfile(
    @User() user: AuthUser,
    @Body() dto: UpdateDiplomatProfileDTO,
  ) {
    return await this.diplomatService.updateDiplomatProfile(user.userId, dto);
  }

  @Put('updatePrechecklist')
  async updatePrechecklist(
    @User() user: AuthUser,
    @Body() dto: PreChecklistDiplomatDTO,
  ) {
    return await this.diplomatService.updatePrechecklist(user.userId, dto);
  }
}
