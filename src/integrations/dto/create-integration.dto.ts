import { IsNotEmpty, IsOptional, IsBoolean, IsString, IsDate } from 'class-validator';

export class CreateIntegrationDto {

  @IsOptional()
  @IsString()
  appName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isConnected?: boolean;

  @IsString()
  accessToken?: string;

  @IsString()
  refreshToken?: string;

  @IsString()
  tokenExpiresAt?: string;
}
