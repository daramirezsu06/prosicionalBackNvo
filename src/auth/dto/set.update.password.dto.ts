import {
    IsString,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDTO {
    @ApiProperty()
    @IsString()
    readonly code: string;

    @ApiProperty()
    @IsString()
    readonly currentPassword: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    readonly newPassword: string;
}
