import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class Step2PersonalDetailsDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  genderId: number;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}