import { IsInt, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateUserMembershipDto {
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsDateString()
  endedAt?: Date;
}