// src/usermemberships/usermemberships.module.ts
import { Module } from '@nestjs/common';
import { UserMembershipsService } from './usermemberships.service';
import { UserMembershipsController } from './usermemberships.controller';
import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from './stripe/stripe.service';

@Module({
  providers: [UserMembershipsService, PrismaService, StripeService],
  controllers: [UserMembershipsController],
})
export class UserMembershipsModule {}
