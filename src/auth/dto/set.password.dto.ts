import {
    IsString,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetPasswordDTO {
    @ApiProperty()
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly code: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}
