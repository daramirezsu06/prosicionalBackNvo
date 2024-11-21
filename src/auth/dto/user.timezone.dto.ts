import { IsOptional, IsInt, IsString, MaxLength } from 'class-validator';

export class UserTimeoneDTO {
  @IsOptional()
  @IsInt()
  timeZoneId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  dateFormat?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  timeFormat?: string;
}
