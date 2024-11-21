import {
  Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, Delete, ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CountryDto, TimezoneDto, KeyValueDto, MissionInstitutionQuery } from './common.dto';
import { CustomMessage } from './utils/decorator/custom-message.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }


  @Get("health")
  getHealth(): string {
    return this.appService.getHealth();
  }

  @CustomMessage('File uploaded successfully')
  @Post("uploadFiles")
  @UseInterceptors(FilesInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  async uploadAvatar(
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.appService.uploadFile(files);
  }

  @UseGuards(JwtAuthGuard)
  @Get("getTimezones")
  getTimezones(): Promise<TimezoneDto[]> {
    return this.appService.getTimezones();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("getLevels")
  getLevels(): Promise<KeyValueDto[]> {
    return this.appService.getLevels();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getLanguages")
  getLanguages(): Promise<KeyValueDto[]> {
    return this.appService.getLanguages();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getUserTypes")
  getUserTypes(): Promise<KeyValueDto[]> {
    return this.appService.getUserTypes();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getCountries")
  getCountries(): Promise<CountryDto[]> {
    return this.appService.getCountries();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getCitiesByCountryId")
  getCitiesByCountryId(
    @Query() {countryId} : any
  ): Promise<KeyValueDto[]> {
    return this.appService.getCitiesByCountryId(countryId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("getGender")
  getGender(): Promise<KeyValueDto[]> {
    return this.appService.getGender();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getRoles")
  getRoles(): Promise<KeyValueDto[]> {
    return this.appService.getRoles();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getYearsOfExperiences")
  getYearsOfExperiences(): Promise<KeyValueDto[]> {
    return this.appService.getYearsOfExperiences();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getMemberships")
  getMemberships(): Promise<KeyValueDto[]> {
    return this.appService.getMemberships();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getBillingStatus")
  getBillingStatus(): Promise<KeyValueDto[]> {
    return this.appService.getBillingStatus();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getMissionInstitutions")
  getMissionInstitutions(
    @Query() query: MissionInstitutionQuery
  ): Promise<KeyValueDto[]> {
    return this.appService.getMissionInstitutions(query.countryId,query.cityId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("getChronicDiseases")
  getChronicDiseases(
  ): Promise<KeyValueDto[]> {
    return this.appService.getChronicDiseases();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getHobbies")
  getHobbies(
  ): Promise<KeyValueDto[]> {
    return this.appService.getHobbies();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getInsuranceTypes")
  getInsuranceTypes(
  ): Promise<KeyValueDto[]> {
    return this.appService.getInsuranceTypes();
  }

  @UseGuards(JwtAuthGuard)
  @Get("getVehicleTypes")
  getVehicleTypes(
  ): Promise<KeyValueDto[]> {
    return this.appService.getVehicleTypes();
  }
}
