import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsNotEmpty, Length, Matches, IsDateString, MinDate, IsNumberString, IsInt, Min, Max } from 'class-validator';
import { IsCreditCard } from 'class-validator'; // Optional: Built-in class-validator for credit card validation
import { IsValidCardNumber } from '../validators/card.number.validator';
import { IsCardExpiryDate } from '../validators/card.expiry.date.validator';

export class CreatePaymentMethodDto {

  @IsNotEmpty()
  @IsString()
  @Length(13, 19, { message: 'Card number must be between 13 and 19 digits' })
  @Matches(/^[0-9]+$/, { message: 'Card number can only contain numbers' })
  @IsCreditCard({ message: 'Invalid card number' }) // Optional: This checks the format against a valid credit card number pattern
  @IsValidCardNumber({ message: 'Invalid card number' })
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cardHolderName?: string;

  @IsNotEmpty()
  @IsString()
  billingAddress?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  expiryMonth: number;

  @IsNotEmpty()
  @IsInt()
  @Min(2024) 
  expiryYear: number;

  @IsNotEmpty()
  @IsNumberString()
  @Length(3, 4)
  cvc: number;

  @IsBoolean()
  isDefault: boolean;
}
