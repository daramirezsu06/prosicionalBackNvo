import { IsInt, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateBillingInvoiceDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  amount: number;

  @IsInt()
  billingStatusId: number;
}