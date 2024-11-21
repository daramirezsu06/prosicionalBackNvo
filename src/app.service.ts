import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CountryDto, KeyValueDto, TimezoneDto } from './common.dto';
import { EntityMapper } from './utils/mapper/entity.mapper';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { extname } from 'path';

@Injectable()
export class AppService {
  private readonly s3Client: S3Client;
  constructor(
    private readonly prisma: PrismaService
  ) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  getHealth(): string {
    return 'Yes,Application is working fine!';
  }

  async uploadFile(files: Express.Multer.File[]): Promise<string[]> {
    if (!files || !files.length) {
      throw new BadRequestException('No file uploaded');
    }
    let savedFiles = [];
    for (const file of files) {
      const uniqueFileName = `${uuidv4()}${extname(file.originalname)}`;
      savedFiles.push(await this.uploadS3(file, uniqueFileName));
    }
    return savedFiles.length === 1 ? savedFiles[0] : savedFiles;
  }

  private async uploadS3(file: Express.Multer.File, fileName: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: file.buffer,
    });

    try {
      await this.s3Client.send(command);
      return fileName;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file to S3');
    }
  }

  async getTimezones(): Promise<TimezoneDto[]> {
    const timezones = await this.prisma.timezone.findMany();
    return timezones.map(EntityMapper.toTimezoneDto);
  }

  async getUserTypes(): Promise<KeyValueDto[]> {
    const userTypes = await this.prisma.userType.findMany();
    return userTypes.map(EntityMapper.toKeyValueDto);
  }

  async getLanguages(): Promise<KeyValueDto[]> {
    const languages = await this.prisma.language.findMany();
    return languages.map(EntityMapper.toKeyValueDto);
  }

  async getGender(): Promise<KeyValueDto[]> {
    const genders = await this.prisma.gender.findMany();
    return genders.map(EntityMapper.toKeyValueDto);
  }

  async getLevels(): Promise<KeyValueDto[]> {
    const levels = await this.prisma.level.findMany();
    return levels.map(EntityMapper.toKeyValueDto);
  }

  async getCountries(): Promise<CountryDto[]> {
    const countries = await this.prisma.country.findMany();
    return countries.map(EntityMapper.toCountryDto);
  }

  async getRoles(): Promise<KeyValueDto[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map(EntityMapper.toKeyValueDto);
  }

  async getYearsOfExperiences(): Promise<KeyValueDto[]> {
    const yearsOfExperiences = await this.prisma.yearsOfExperience.findMany();
    return yearsOfExperiences.map(EntityMapper.toKeyValueDto);
  }

  async getMemberships(): Promise<KeyValueDto[]> {
    const memberships = await this.prisma.memberships.findMany();
    return memberships.map(EntityMapper.toKeyValueDto);
  }

  async getBillingStatus(): Promise<KeyValueDto[]> {
    const billingStatuses = await this.prisma.billingStatus.findMany();
    return billingStatuses.map(EntityMapper.toKeyValueDto);
  }

  async getMissionInstitutions(countryId: string, cityId:string): Promise<KeyValueDto[]> {
    let condition = { countryId: null, cityId:null };
    if (countryId) condition.countryId = parseInt(countryId);
    if (cityId) condition.cityId = parseInt(cityId);
    const missionInstitutions = await this.prisma.missionInstitution.findMany({ where: condition });
    return missionInstitutions.map(EntityMapper.toKeyValueDto);
  }

  async getCitiesByCountryId(countryId: string): Promise<KeyValueDto[]> {
    let condition = { countryId: null };
    if (countryId) condition.countryId = parseInt(countryId);
    const cities = await this.prisma.city.findMany({ where: condition });
    return cities.map(EntityMapper.toKeyValueDto);
  }

  async getHobbies(): Promise<KeyValueDto[]> {
    const hobbies = await this.prisma.hobbies.findMany();
    return hobbies.map(EntityMapper.toKeyValueDto);
  }

  async getVehicleTypes(): Promise<KeyValueDto[]> {
    const vehicleType = await this.prisma.vehicleType.findMany();
    return vehicleType.map(EntityMapper.toKeyValueDto);
  }

  async getInsuranceTypes(): Promise<KeyValueDto[]> {
    const insuranceType = await this.prisma.insuranceType.findMany();
    return insuranceType.map(EntityMapper.toKeyValueDto);
  }

  async getChronicDiseases(): Promise<KeyValueDto[]> {
    const chronicDiseases = await this.prisma.chronicDiseases.findMany();
    return chronicDiseases.map(EntityMapper.toKeyValueDto);
  }
}
