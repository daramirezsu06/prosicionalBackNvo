
export interface KeyValueDto {
    id: number;
    name: string;
    description?: string
}

// dto/country.dto.ts
export class CountryDto {
    id: number;
    name: string;
    code: string;
    dialingCode: string;
    flag: string;
}


//timezone 
export class TimezoneDto {
    id: number;
    region: string;
    code: string;
    value: string;
}

export interface TaskTypeDto {
    id: number;
    name: string;
    description?: string
    process?: string;
}

export class MissionInstitutionQuery {
    countryId: string;
    cityId: string;
}