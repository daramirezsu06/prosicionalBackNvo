import { Module } from '@nestjs/common';
import { DiplomatService } from './diplomat.service';
import { DiplomatController } from './diplomat.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DiplomatController],
  providers: [DiplomatService, PrismaService, JwtService,AuthService],
})
export class DiplomatModule {}
