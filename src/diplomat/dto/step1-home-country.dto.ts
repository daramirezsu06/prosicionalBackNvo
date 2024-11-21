import { IsNotEmpty, IsString } from 'class-validator';

export class Step1HomeCountryDto {
  @IsNotEmpty()
  homeCountry: string;

  @IsNotEmpty()
  assignedCountry: string;
}