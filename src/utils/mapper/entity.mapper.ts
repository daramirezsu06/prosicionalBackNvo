// mapper/entity.mapper.ts

import { CountryDto, TimezoneDto, KeyValueDto, TaskTypeDto } from "src/common.dto";

export class EntityMapper {


  static toCountryDto(entity: any): CountryDto {
    return {
      id: entity.id,
      name: entity.name,
      code: entity.code,
      dialingCode:entity.dialingCode,
      flag: entity.flag
    };
  }

  static toTimezoneDto(entity: any): TimezoneDto {
    return {
      id: entity.id,
      region: entity.region,
      code: entity.code,
      value: entity.value
    };
  }

  static toKeyValueDto(entity: any): KeyValueDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity?.description,
    };
  }

  static toTaskTypeDto(entity: any): TaskTypeDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity?.description,
      process: entity?.process,
    };
  }

}
