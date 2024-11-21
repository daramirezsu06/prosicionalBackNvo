// src/usermemberships/usermemberships.controller.ts
import { Controller, Post, Get, Body, Param, Query, UseGuards, Put } from '@nestjs/common';
import { UserMembershipsService } from './usermemberships.service';
import { CreateUserMembershipDto } from './dto/create-usermembership.dto';
import { User } from 'src/utils/decorator/user.decorator';
import { AuthUser } from 'src/utils/auth.user';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomMessage } from 'src/utils/decorator/custom-message.decorator';

@UseGuards(JwtAuthGuard)
@Controller('usermemberships')
export class UserMembershipsController {
    constructor(private readonly userMembershipsService: UserMembershipsService) { }

    // 1. Subscribe to a membership
    @Post('subscribe')
    async subscribeMembership(
        @Body() createUserMembershipDto: CreateUserMembershipDto,
        @User() user: AuthUser
    ) {
        return this.userMembershipsService.subscribeMembership(createUserMembershipDto, user.userId);
    }

    // 2. Pay for a failed membership
    @Post('pay-failed/:id')
    async payFailedMembership(
        @Param('id') userMembershipId: number,
        @User() user: AuthUser) {
        return this.userMembershipsService.payFailedMembership(userMembershipId, user.userId);
    }

    // 3. List all subscribed memberships
    @Get('subscribed')
    async listSubscribedMemberships(
        @User() user: AuthUser
    ) {
        return this.userMembershipsService.listSubscribedMemberships(user.userId);
    }

    // 4. Inactivate a membership
    @CustomMessage('Membership unsubscribed successfully')
    @Put('unsubscribe/:id')
    async inactivateMembership(
        @User() user: AuthUser,
        @Param('id') userMembershipId: string
    ) {
        return this.userMembershipsService.inactivateMembership(user.userId, parseInt(userMembershipId));
    }

    // 5. List all billing invoices
    @Get('billing-invoices')
    async listBillingInvoices(
        @User() user: AuthUser,
        @Query('status') status?: number,
        @Query('amount') amount?: string,
        @Query('createdAt') createdAt?: Date,
    ) {
        return this.userMembershipsService.listBillingInvoices(user.userId, status, parseFloat(amount), createdAt);
    }
}
