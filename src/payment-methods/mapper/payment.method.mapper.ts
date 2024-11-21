import { PaymentMethodDTO } from '../dto/payment.method.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { CardUtils } from '../utils/card.utils';

export class PaymentMethodMapper {
    // Transform a single payment method, using an injected encryption service
    static async toDto(paymentMethod: PaymentMethodDTO, encryptionService: EncryptionService): Promise<PaymentMethodDTO> {
        return {
            id: paymentMethod.id,
            cardHolderName: paymentMethod.cardHolderName,
            expiryDate: paymentMethod.expiryDate,
            cardNumber: await PaymentMethodMapper.getLastFourDigits(paymentMethod.cardNumber, encryptionService),
            cvc: await encryptionService.decrypt(paymentMethod.cvc),
            isDefault: paymentMethod.isDefault,
            createdAt: paymentMethod.createdAt,
            billingAddress: paymentMethod.billingAddress,
            updatedAt: paymentMethod.updatedAt,
        };
    }

    // Transform a list of payment methods
    static async toDtoList(paymentMethods: PaymentMethodDTO[], encryptionService: EncryptionService): Promise<PaymentMethodDTO[]> {
        return await Promise.all(paymentMethods.map(paymentMethod => PaymentMethodMapper.toDto(paymentMethod, encryptionService)));
    }

    // Get the last 4 digits of the card number
    static async getLastFourDigits(encryptedCardNumber: string, encryptionService: EncryptionService) {
        try {
            const decryptedCardNumber = await encryptionService.decrypt(encryptedCardNumber);
            const cardType = CardUtils.getCardType(decryptedCardNumber);
            return (cardType ? (cardType + " ending ") : '************') + decryptedCardNumber.slice(-4); // Return the last 4 digits
        } catch (error) {
            console.error('Error decrypting card number:', error);
            return '****'; // Return masked value if decryption fails
        }
    }
}

