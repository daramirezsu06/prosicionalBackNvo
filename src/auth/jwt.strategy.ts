// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { userTypes } from 'src/prisma/data/common';
import { UserTypeList } from 'src/shared/enum/user.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      throw new UnauthorizedException();
    }
    let assignedCountryId;
    if (user.userTypeId === UserTypeList.Diplomat) {
      const diplomat = await this.prisma.diplomat.findUnique({ where: { userId: user.id } });
      if (diplomat) assignedCountryId = diplomat.assignedCountry["id"];
    }
    return { id: user.id, email: user.email, userType: user.userTypeId, assignedCountryId: assignedCountryId };
  }
}

