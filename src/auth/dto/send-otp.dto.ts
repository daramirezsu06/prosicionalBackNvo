import {
    IsString,
    IsOptional,
    IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDTO {
    @ApiProperty()
    @IsEmail()
    @IsString()
    email: string;

}
