import { SendOtpDTO } from './send-otp.dto';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponseDto extends SendOtpDTO {

    @ApiProperty()
    id: number;

    @ApiProperty()
    token: string;

    constructor(user: UserDto, token?: string) {
        super();
        this.token = token;
        this.email = user.email;
        this.id = user.id;
    }
}
