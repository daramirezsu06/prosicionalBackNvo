import { IsInt, IsOptional, IsDateString, IsBoolean, IsNumber } from 'class-validator';

export class CreateUserMembershipDto {

  @IsInt()
  membershipId: number;

}