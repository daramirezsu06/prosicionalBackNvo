import {
    IsString,
    IsEmail,
    IsEnum,
    IsISO8601,
    IsOptional,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOTPCodeDTO {
    @ApiProperty()
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly code: string;
}
