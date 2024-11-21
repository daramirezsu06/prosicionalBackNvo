// src/usermemberships/usermemberships.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserMembershipDto } from './dto/create-usermembership.dto';
import { UpdateUserMembershipDto } from './dto/update-usermembership.dto';
import { StripeService } from './stripe/stripe.service';
import { BillingStatus } from 'src/utils/enum/billing.status';

@Injectable()
export class UserMembershipsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly stripeService: StripeService,
    ) { }

    // 1. Subscribe to a membership
    async subscribeMembership(createUserMembershipDto: CreateUserMembershipDto, userId: number) {
        const { membershipId } = createUserMembershipDto;

        let userMembership;
        userMembership = await this.prisma.userMemberships.findFirst({ where: { userId, membershipId } });

        if (userMembership && userMembership.isActive) {
            throw new HttpException('This membership already subscribed', HttpStatus.CONFLICT);
        }
        const membership = await this.prisma.memberships.findUnique({ where: { id: membershipId } });
        // Fetch user’s default payment method
        const defaultPaymentMethod = await this.prisma.paymentMethods.findFirst({
            where: { userId, isDefault: true },
        });

        if (!defaultPaymentMethod) {
            throw new HttpException('No default payment method found.', HttpStatus.CONFLICT);
        }

        // Make payment using Stripe
        // const paymentIntent = await this.stripeService.charge(amount, defaultPaymentMethod.stripePaymentMethodId);

        let billingStatusId;
        // if (paymentIntent.status === 'succeeded') {
        //   billingStatusId = BillingStatus.Paid; // Paid
        // } else if (paymentIntent.status === 'failed') {
        //   billingStatusId = BillingStatus.Failed; // Failed
        // } else {
        billingStatusId = BillingStatus.Pending; // Pending
        //}

        // Create userMembership
        let date = new Date();
        let endsAt = date.setFullYear(date.getFullYear() + 1);

        if (!userMembership) {
            userMembership = await this.prisma.userMemberships.create({
                data: {
                    userId,
                    currency: membership.currency,
                    membershipId,
                    amount: membership.amount,
                    startedAt: new Date(),
                    createdAt: new Date(),
                    endedAt: new Date(endsAt),
                    isActive: true,

                },
            });
        }
        else {
            await this.prisma.userMemberships.update({
                where: { id: userMembership.id },
                data: {
                    amount: membership.amount,
                    startedAt: new Date(),
                    endedAt: new Date(endsAt),
                    isActive: true
                },
            });
        }

        // Create billingInvoice
        await this.prisma.billingInvoices.create({
            data: {
                userId,
                currency: membership.currency,
                amount: membership.amount,
                billingStatusId,
                createdAt: new Date(),
                name: membership.name,
                description: membership.description,
            },
        });

        // return await this.prisma.userMemberships.findUnique({ 
        //     // {select:{amount:true}},
        //     // :{amount:true},
        //     where: { id: userMembership.id }, 
        //     select: {
        //         id: true
        //       },
        //     include: { memberships: { select: { name: true, description: true, currency: true } } } 
        // }
        // );
        return await this.prisma.userMemberships.findUnique({
            where: { id: userMembership.id },
            select: {
                id: true,
                amount: true,
                currency: true,
                startedAt: true,
                endedAt: true,
                membershipId: true,
                isActive: true,
                memberships: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
            },
        });

    }

    // 2. Pay for a failed user membership
    async payFailedMembership(userMembershipId: number, userId: number) {
        const userMembership = await this.prisma.userMemberships.findUnique({
            where: { id: userMembershipId },
        });

        if (!userMembership || userMembership.userId !== userId || userMembership.isActive) {
            throw new Error('Invalid membership');
        }

        const defaultPaymentMethod = await this.prisma.paymentMethods.findFirst({
            where: { userId, isDefault: true },
        });

        if (!defaultPaymentMethod) {
            throw new Error('No default payment method found.');
        }

        // const paymentIntent = await this.stripeService.charge(userMembership.amount, defaultPaymentMethod.stripePaymentMethodId);

        // if (paymentIntent.status === 'succeeded') {
        //     await this.prisma.userMemberships.update({
        //         where: { id: userMembershipId },
        //         data: { isActive: true },
        //     });

        //     await this.prisma.billingInvoices.updateMany({
        //         where: { userId, billingStatusId: 3 }, // Failed
        //         data: { billingStatusId: 2, paidAt: new Date() }, // Paid
        //     });
        // }

        // return paymentIntent;
    }

    // 3. List all subscribed memberships
    async listSubscribedMemberships(userId: number) {
        return await this.prisma.userMemberships.findMany({
            where: { userId },
            select: {
                id: true,
                amount: true,
                currency: true,
                startedAt: true,
                endedAt: true,
                membershipId: true,
                isActive: true,
                memberships: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
            },
        });
    }

    // 4. Inactivate a membership
    async inactivateMembership(userId: number, userMembershipId: number) {
        try {
            await this.prisma.userMemberships.update({
                where: { id: userMembershipId, userId: userId },
                data: { isActive: false, endedAt: new Date() },
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    // 5. List all billing invoices with filters
    async listBillingInvoices(userId: number, status?: number, amount?: number, createdAt?: Date) {
        
        let dateFilter: { gte?: Date; lte?: Date } | undefined = undefined;

        if (createdAt) {
          // Convert the string to a Date object
          const date = new Date(createdAt);
          
          // Start of the day
          const startOfDay = new Date(date.setHours(0, 0, 0, 0));
          
          // End of the day
          const endOfDay = new Date(date.setHours(23, 59, 59, 999));
          
          // Set the date range filter
          dateFilter = {
            gte: startOfDay,
            lte: endOfDay
          };
        }
      
        return this.prisma.billingInvoices.findMany({
            where: {
                userId,
                billingStatusId: status,
                amount,
                createdAt: dateFilter || undefined,
            },
            select: {
                id: true,
                amount: true,
                createdAt: true,
                paidAt: true,
                name: true,
                description: true,
                stripeDetail: true,
                updatedAt: true,
                billingStatusId: true,  
                currency: true,             
                billingStatus: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
            },
        });

    }
}
