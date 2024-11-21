import { IsOptional, IsBoolean, IsString, IsDate } from 'class-validator';

export class UpdateIntegrationDto {
    @IsString()
    accessToken?: string;
  
    @IsString()
    refreshToken?: string;
  
    @IsString()
    tokenExpiresAt?: string;
}
