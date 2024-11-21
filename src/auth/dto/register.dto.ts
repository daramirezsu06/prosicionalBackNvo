import {
    IsString,
    IsOptional,
    IsEmail,
    IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
    @ApiProperty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNumber()
    userTypeId: number;

}
