import { IsNotEmpty, IsOptional, IsNumber, IsObject } from 'class-validator';

export class UpdateDiplomatProfileDTO {
  @IsOptional()
  displayName: string;

  @IsOptional()
  displayEmail: string;

  @IsObject()
  @IsOptional()
  assignedCity: object;

  @IsOptional()
  missionInstitutionId: number;

  @IsOptional()
  @IsNumber()
  roleId?: number;

  @IsOptional()
  customRole: string;

  @IsNumber()
  yearsOfExperienceId: number;

  @IsOptional()
  introduction: string;
}
