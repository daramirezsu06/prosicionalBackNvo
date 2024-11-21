import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsString()
  @IsOptional()
  cardNumber?: string;

  @IsString()
  @IsOptional()
  cardHolderName?: string;

  @IsNotEmpty()
  @IsString()
  billingAddress?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  expiryMonth: number;

  @IsOptional()
  @IsInt()
  @Min(2024) 
  expiryYear: number;

  @IsOptional()
  cvc?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
