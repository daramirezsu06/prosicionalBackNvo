import { Injectable, NotFoundException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from 'src/payment-methods/encryption/encryption.service';
import { CreatePaymentMethodDto } from './dto/create.payment.method.dto';
import { UpdatePaymentMethodDto } from './dto/update.payment.method.dto';
import { PaymentMethodMapper } from './mapper/payment.method.mapper';
import { PaymentMethodDTO } from './dto/payment.method.dto';

@Injectable()
export class PaymentMethodsService {
    constructor(
        private prisma: PrismaService,
        private encryptionService: EncryptionService,
    ) { }

    async create(userId: number, createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethodDTO> {
        try {
            const expiryDate = new Date(createPaymentMethodDto.expiryYear, createPaymentMethodDto.expiryMonth - 1, 1);  // Month is 0-indexed in JavaScript
            // Encrypt card details
            const encryptedCardNumber = await this.encryptionService.encrypt(createPaymentMethodDto.cardNumber);
            const encryptedCvc = await this.encryptionService.encrypt(createPaymentMethodDto.cvc.toString());

            // Check for existing payment methods with the same card details
            const existingPaymentMethod = await this.prisma.paymentMethods.findFirst({
                where: {
                    userId,
                    cardNumber: encryptedCardNumber,
                    expiryDate: expiryDate,
                },
            });

            if (existingPaymentMethod) {
                throw new HttpException('This card has already been added', HttpStatus.CONFLICT);
            }
            // Check if there are existing payment methods for the user
            const existingPaymentMethods = await this.prisma.paymentMethods.findFirst({
                where: { userId },
            });

            // Set `isDefault` to true if this is the first payment method
            const isDefault = existingPaymentMethods ? createPaymentMethodDto.isDefault : true;

            // Create the new payment method
            const paymentMethod = await this.prisma.paymentMethods.create({
                data: {
                    billingAddress: createPaymentMethodDto.billingAddress,
                    isDefault,
                    cardHolderName: createPaymentMethodDto.cardHolderName,
                    userId,
                    expiryDate,
                    createdAt: new Date(),
                    cardNumber: encryptedCardNumber,
                    cvc: encryptedCvc,
                },
            });
            return PaymentMethodMapper.toDto(paymentMethod, this.encryptionService);
        } catch (error) {
            console.error('Error creating payment method:', error);
            throw new HttpException(error.message || 'Failed to create payment method', HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(userId: number): Promise<PaymentMethodDTO[]> {
        try {
            const paymentMethods = await this.prisma.paymentMethods.findMany({ where: { userId } });
            return await PaymentMethodMapper.toDtoList(paymentMethods, this.encryptionService);
        } catch (error) {
            console.error('Error finding payment methods:', error);
            throw new InternalServerErrorException('Failed to retrieve payment methods');
        }
    }

    async findOne(userId: number, id: number) {
        try {
            const paymentMethod = await this.prisma.paymentMethods.findUnique({ where: { id, userId } });
            if (!paymentMethod) throw new NotFoundException(`Payment method with ID ${id} not found`);
            // Decrypt card number and return masked version
            return PaymentMethodMapper.toDto(paymentMethod, this.encryptionService);
        } catch (error) {
            console.error(`Error finding payment method with ID ${id}:`, error);
            throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to retrieve payment method');
        }
    }

    async update(userId: number, id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
        try {
            const paymentMethod = await this.prisma.paymentMethods.findUnique({ where: { id, userId } });

            if (updatePaymentMethodDto.cardNumber) {
                updatePaymentMethodDto.cardNumber = await this.encryptionService.encrypt(updatePaymentMethodDto.cardNumber);
            }

            if (updatePaymentMethodDto.cvc) {
                updatePaymentMethodDto.cvc = await this.encryptionService.encrypt(updatePaymentMethodDto.cvc.toString());
            }
            let expiryDate;
            if (updatePaymentMethodDto.expiryYear && updatePaymentMethodDto.expiryMonth) expiryDate = new Date(updatePaymentMethodDto.expiryYear, updatePaymentMethodDto.expiryMonth - 1, 1);
            // Construct the update data
            const updateData = {
                cardHolderName: updatePaymentMethodDto.cardHolderName ?? paymentMethod.cardHolderName,
                expiryDate: expiryDate ?? paymentMethod.expiryDate,
                isDefault: updatePaymentMethodDto.isDefault ?? paymentMethod.isDefault,
                billingAddress: updatePaymentMethodDto.billingAddress ?? paymentMethod.billingAddress,
                cardNumber: updatePaymentMethodDto.cardNumber ?? paymentMethod.cardNumber,
                cvc: updatePaymentMethodDto.cvc ?? paymentMethod.cvc,
                updatedAt: new Date(), // Always update the timestamp
            };


            const _paymentMethod = await this.prisma.paymentMethods.update({
                where: { id },
                data: updateData,
            });
            return PaymentMethodMapper.toDto(_paymentMethod, this.encryptionService);
        } catch (error) {
            console.error(`Error updating payment method with ID ${id}:`, error);
            throw new InternalServerErrorException('Failed to update payment method');
        }
    }

    async delete(userId: number, id: string) {
        const paymentMethod = await this.prisma.paymentMethods.findUnique({ where: { id: parseInt(id), userId } });
        if (!paymentMethod) throw new NotFoundException(`Payment method with ID ${id} not found`);
        try {
            await this.prisma.paymentMethods.delete({ where: { id: parseInt(id), userId } });
        } catch (error) {
            console.error(`Error removing payment method with ID ${id} for user ID ${userId}:`, error);
            throw new InternalServerErrorException('Failed to remove payment method');
        }
    }
}
