// src/auth/auth.service.ts
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { genSalt, hash, compare } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { addMinutes, isBefore } from 'date-fns';
import { config } from 'src/config/config';
import * as path from 'path';
import * as fs from 'fs';
import { EmailService } from 'src/shared/email/email.service';
import { UserDto } from './dto/user.dto';
import { VerifyOTPCodeDTO } from './dto/verify.otp-code.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserTypeList } from 'src/shared/enum/user.types';
import { CommonErrorName } from 'src/utils/enum/error-name.enum';
import { SendOtpDTO } from './dto/send-otp.dto';
import { SetPasswordDTO } from './dto/set.password.dto';
import { isPublicEmail } from 'src/utils/common.utils';
import { UpdatePasswordDTO } from './dto/set.update.password.dto';
import { AuthUser } from 'src/utils/auth.user';
import { UserTimeoneDTO } from './dto/user.timezone.dto';
const baseDir = process.env.NODE_ENV === 'production' ? path.join(process.cwd(), 'dist') : path.join(process.cwd(), 'src');


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private emailService: EmailService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: UserLoginRequestDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw new HttpException(
        'Invalid email',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await compare(dto.password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const access_token = this.jwtService.sign({ email: user.email });
    return new UserLoginResponseDto(user, access_token);
  }

  async register(dto: RegisterDTO) {
    if (
      dto.userTypeId === UserTypeList.Diplomat || dto.userTypeId === UserTypeList.ServiceProvider
    ) {
      const userExist = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (userExist && userExist.isEmailVerified) {
        throw new HttpException(
          CommonErrorName.EmailAreadyExist,
          HttpStatus.BAD_REQUEST,
        );
      }
      else if (!userExist) {
        let result = await this.prisma.user.create({ data: { password: null, updatedAt: new Date(), email: dto.email, userTypeId: dto.userTypeId } });
        let officialEmail = isPublicEmail(dto.email) ? null : dto.email;
        if (dto.userTypeId === UserTypeList.Diplomat) {
          await this.prisma.diplomat.create({ data: { userId: result.id, officialEmail: officialEmail, createdAt: new Date() } });
        }
      }
      await this.sendOTPToEmail(dto.email);
    }
    else {
      throw new HttpException(
        CommonErrorName.InvalidUserType,
        HttpStatus.BAD_REQUEST,
      );
    }

  }

  async sendOtp(dto: SendOtpDTO) {

    const userExist = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!userExist) {
      throw new HttpException(
        CommonErrorName.ResourceNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.sendOTPToEmail(dto.email);
  }

  async sendOTPToEmail(email: string) {
    const concurrentOTP = await this.prisma.otp.findFirst({
      where: {
        email: email,
        expiresAt: {
          gte: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (concurrentOTP) {
      throw new HttpException(
        CommonErrorName.ConcurrentOTP,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const getRandomPin = (chars, len) => [...Array(len)].map(
      (i) => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    const code = getRandomPin('0123456789', 4);
    let d1 = new Date(),
      expireTime = new Date(d1);
    expireTime.setMinutes(d1.getMinutes() + config.OTPExpiryTimeInMinute);
    let subject = `${code} is your Nvoye OTP`;
    let template = fs.readFileSync(path.join(baseDir, './assets/template/otp.html'), 'utf-8').toString();
    try {
      await this.emailService.sendEmail(email, subject, template.replace("#OTP", code).replace("#OTPExpiryTimeInMinute", config.OTPExpiryTimeInMinute.toString()));
      await this.prisma.otp.create({ data: { email: email, code: code, expiresAt: expireTime } });
    }
    catch (err) {
      throw new HttpException(
        CommonErrorName.ErrorOccurredSendingOTP,
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async verifyOTP(dto: VerifyOTPCodeDTO) {
    const otpRequest = await this.prisma.otp.findFirst({
      where: {
        email: dto.email,
        code: dto.code,
      },
    });

    if (!otpRequest) {
      throw new HttpException(
        CommonErrorName.ResourceNotFound,
        HttpStatus.NOT_FOUND,
      );
    }
    else if (otpRequest && otpRequest.isVerified) {
      throw new HttpException(
        CommonErrorName.OTPAlreadyUsed,
        HttpStatus.BAD_REQUEST,
      );
    }
    else if (otpRequest && (new Date() > otpRequest.expiresAt)) {
      throw new HttpException(
        CommonErrorName.OTPExpired,
        HttpStatus.GONE,
      );
    }
    else {
      await this.prisma.otp.update({
        where: {
          id: otpRequest.id,
        },
        data: {
          isVerified: true,
        },
      });
      this.verifyEmail(otpRequest.email);
    }
  }
  async verifyEmail(email: string) {

    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (user) {
        const updatedUser = await this.prisma.user.update({
          where: { email: email },
          data: {
            updatedAt: new Date(),
            isEmailVerified: true,
          },
        });
        if (!isPublicEmail(email)) {
          await this.prisma.diplomat.update({
            where: { officialEmail: email },
            data: {
              updatedAt: new Date(),
              isOfficialEmailVerified: true,
            },
          });
        }
        return new UserDto(updatedUser);
      }
      else {
        const diplomat = await this.prisma.diplomat.findUnique({
          where: { officialEmail: email },
        });
        if (!diplomat) {
          throw new HttpException(
            CommonErrorName.ResourceNotFound,
            HttpStatus.NOT_FOUND,
          );
        }
        await this.prisma.diplomat.update({
          where: { id: diplomat.id },
          data: {
            updatedAt: new Date(),
            isOfficialEmailVerified: true,
          },
        });
        return new UserDto({ id: diplomat.userId });
      }

    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getPasswordOtpStatus(email: string, code: string) {
    const otp_requests = await this.prisma.otp.findFirst({
      where: {
        email: email,
        code: code,
      },
    });
    if (!otp_requests) {
      throw new HttpException(CommonErrorName.OTPCodeNotFound, HttpStatus.NOT_FOUND);
    }

    else if (!otp_requests.isVerified) {
      throw new HttpException(CommonErrorName.OTPNotVerified, HttpStatus.BAD_REQUEST);
    }

    else if (otp_requests.isPasswordTaken) {
      throw new HttpException(CommonErrorName.OTPAlreadyUsedForPassword, HttpStatus.BAD_REQUEST);
    }

    await this.prisma.otp.update({
      where: {
        id: otp_requests.id,
      },
      data: {
        isPasswordTaken: true,
      },
    });
  }
  async setPassword(dto: SetPasswordDTO) {
    await this.getPasswordOtpStatus(dto.email, dto.code);

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException(CommonErrorName.ResourceNotFound, HttpStatus.NOT_FOUND);
    }

    // Generate salt and hash the new password
    const salt = await genSalt(10);
    const hashedPassword = await hash(dto.password, salt);

    // Update user's password and updatedAt fields
    try {
      const updatedUser = await this.prisma.user.update({
        where: { email: dto.email },
        data: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      });

      return updatedUser; // You can transform this to a DTO if needed
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updatePassword(authUser: AuthUser, dto: UpdatePasswordDTO): Promise<void> {
    // Fetch the user by their ID
    await this.getPasswordOtpStatus(authUser.email, dto.code);
    const user = await this.prisma.user.findUnique({
      where: { id: authUser.userId },
    });

    if (!user) {
      throw new HttpException(CommonErrorName.ResourceNotFound, HttpStatus.NOT_FOUND);
    }

    // Check if the current password matches the one stored in the database
    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new HttpException(CommonErrorName.CurrentPsswordIsIncorrect, HttpStatus.BAD_REQUEST);
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);

    // Update the password in the database
    try {
      await this.prisma.user.update({
        where: { id: authUser.userId },
        data: {
          password: hashedNewPassword,
          updatedAt: new Date(),
        },
      });

    } catch (err) {
      console.log("testing");
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTimezoneSetting(userId: number, dto: UserTimeoneDTO): Promise<void> {
    // Find the user by ID
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(CommonErrorName.ResourceNotFound, HttpStatus.NOT_FOUND);
    }

    // Update the user's preferences
    await this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });
  }
}
