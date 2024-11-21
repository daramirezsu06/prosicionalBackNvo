import { IsNotEmpty, IsNumber } from 'class-validator';

export class Step3LanguageSkillsDto {
  @IsNotEmpty()
  @IsNumber()
  languageId: number;

  @IsNotEmpty()
  @IsNumber()
  levelId: number;
}