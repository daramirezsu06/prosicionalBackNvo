import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class HubDto {
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  tags?: any; // Adjust the type as per your requirement

  @IsBoolean()
  isActive: boolean;
}
