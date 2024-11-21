import { ApiProperty } from '@nestjs/swagger';
import { SendOtpDTO } from './send-otp.dto';

export class UserDto extends SendOtpDTO {
    id: number;
    isEmailVerified: boolean;
    updatedAt: Date;

    constructor(user: any) {
        super();
        this.id = user.id;
    }
}
