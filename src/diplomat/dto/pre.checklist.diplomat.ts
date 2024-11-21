import { IsNotEmpty, IsOptional, IsNumber, IsObject, IsBoolean, IsArray } from 'class-validator';

export class PreChecklistDiplomatDTO {

  @IsBoolean()
  isNeedHousingHelp: boolean;

  @IsBoolean()
  isWithSpouse: boolean;

  @IsBoolean()
  isWithChildren: boolean;

  @IsBoolean()
  isWithPets: boolean;

  @IsBoolean()
  isPlanAdoptingPets: boolean;

  @IsArray()
  @IsOptional()
  insuranceType: any[];

  @IsArray()
  @IsOptional()
  chronicDiseases: any[];

  @IsArray()
  @IsOptional()
  vehicleType: any[];

  @IsArray()
  hobbies: any[]
}
