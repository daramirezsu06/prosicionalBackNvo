import { Prisma } from '@prisma/client';
import { IsString, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class CreateSubHubDto {
  @IsString()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  tags?: any; // Adjust the type as per your requirement

  @IsOptional()
  overview?: string;

  @IsOptional()
  detail?: any; // Adjust the type as per your requirement

  @IsArray()
  @IsOptional()
  principalContent?: Prisma.JsonValue;

  @IsArray()
  @IsOptional()
  rightContend?: Prisma.JsonValue;

  @IsNumber()
  hubId: number;

  @IsNumber()
  countryId: number;
}

export class SubHubDto extends CreateSubHubDto {
  @IsNumber()
  id: number;
}

export class UpdateSubHubDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  tags?: any; // Adjust the type as per your requirement

  @IsOptional()
  overview?: string;

  @IsOptional()
  detail?: any; // Adjust the type as per your requirement

  @IsArray()
  @IsOptional()
  principalContent?: Prisma.JsonValue;

  @IsArray()
  @IsOptional()
  rightContend?: Prisma.JsonValue;
}
