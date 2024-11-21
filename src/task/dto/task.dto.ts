import { IsNotEmpty, IsOptional, IsBoolean, IsString, IsDate, IsInt, IsArray, IsNumber } from 'class-validator';

export class TaskDto {

  @IsInt()
  @IsNotEmpty()
  taskTypeId: number;

  @IsInt()
  @IsNotEmpty()
  taskStatusId: number;

  @IsString()
  @IsOptional()
  remindDate?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsInt()
  @IsNotEmpty()
  priorityId: number;

  @IsOptional()
  documents?: object;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  subTasks?: object;

  @IsOptional()
  @IsString()
  customTitle?: string;

  @IsOptional()
  @IsString()
  customDescription: string;

  @IsArray()
  categories: { categoryId: number }[]; 
}
