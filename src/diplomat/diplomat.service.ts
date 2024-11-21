import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Step1HomeCountryDto } from './dto/step1-home-country.dto';
import { Step2PersonalDetailsDto } from './dto/step2-personal-details.dto';
import { Step3LanguageSkillsDto } from './dto/step3-language-skills.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { mapDiplomatProfile } from 'src/utils/mapper/diplomat-profile.mapper';
import { AuthService } from 'src/auth/auth.service';
import { CommonErrorName } from 'src/utils/enum/error-name.enum';
import { SendOtpDTO } from 'src/auth/dto/send-otp.dto';
import { UpdateDiplomatProfileDTO } from './dto/update.diplomat.profile';
import { PreChecklistDiplomatDTO } from './dto/pre.checklist.diplomat';

@Injectable()
export class DiplomatService {
    constructor(
        private prisma: PrismaService,
        private authService: AuthService
    ) { }

    async getDiplomatProfile(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                timezone: { select: { region: true, code: true, id: true } }
            }
        });
        const diplomat = await this.prisma.diplomat.findFirst({
            where: { userId: userId },
            include: {
                languageSkills: {
                    include: {
                        language: { select: { name: true, id: true, description: true } },
                        level: { select: { name: true, id: true, description: true } },
                    },
                },
                missionInstitution: {
                    select: { name: true, description: true }
                },
                role: {
                    select: { name: true, description: true }
                },
                yearsOfExperience: {
                    select: { name: true, description: true }
                },
                // vehicleType: {
                //     select: { name: true, description: true }
                // },
                // insuranceType: {
                //     select: { name: true, description: true }
                // },
                // chronicDiseases: {
                //     select: { name: true, description: true }
                // },
            },
        });

        if (!user || !diplomat) {
            throw new HttpException('User or Diplomat not found', HttpStatus.NOT_FOUND);
        }

        return mapDiplomatProfile(user, diplomat);
    }

    async updateStep1(userId: number, dto: Step1HomeCountryDto) {
        await this.prisma.diplomat.update({
            where: { userId: userId },
            data: {
                homeCountry: dto.homeCountry,
                assignedCountry: dto.assignedCountry,
                currentOnboardingStep: 2,
            },
        });

        return this.getDiplomatProfile(userId);
    }

    async updateStep2(userId: number, dto: Step2PersonalDetailsDto) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                genderId: dto.genderId,
                profilePicture: dto.profilePicture,
            },
        });

        return this.getDiplomatProfile(userId);
    }

    async updateStep3(userId: number, dto: Step3LanguageSkillsDto) {
        const existingRecord = await this.prisma.languageSkills.findFirst({
            where: {
                userId: userId,
                languageId: dto.languageId,
                levelId: dto.levelId,
                isActive: true,
            },
        });

        if (existingRecord) {
            throw new HttpException('Record already exists', HttpStatus.CONFLICT);
        }

        await this.prisma.languageSkills.create({
            data: {
                userId,
                languageId: dto.languageId,
                levelId: dto.levelId,
                createdAt: new Date(),
            },
        });

        return this.getDiplomatProfile(userId);
    }

    async updatePrechecklist(userId: number, dto: PreChecklistDiplomatDTO) {
        try {

            await this.prisma.diplomat.update({
                where: { userId: userId },
                data: {
                    isNeedHousingHelp: dto.isNeedHousingHelp,
                    isPlanAdoptingPets: dto.isPlanAdoptingPets,
                    isWithChildren: dto.isWithChildren,
                    isWithPets: dto.isWithPets,
                    isWithSpouse: dto.isWithSpouse,
                    insuranceTypes: dto.insuranceType,
                    vehicleType: dto.vehicleType,
                    hobbies: dto.hobbies,
                    chronicDiseases: dto.chronicDiseases,
                },
            });

            return this.getDiplomatProfile(userId);

        } catch (error) {
            throw new HttpException(CommonErrorName.SomethingWentWrong, HttpStatus.NOT_FOUND);
        }
    }

    async sendOtp(userId: number, dto: SendOtpDTO) {
        const diplomatExist = await this.prisma.diplomat.findUnique({
            where: {
                userId: userId,
            },
        });

        if (!diplomatExist) {
            throw new HttpException(
                CommonErrorName.ResourceNotFound,
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.prisma.diplomat.update({
            where: { id: diplomatExist.id },
            data: {
                updatedAt: new Date(),
                officialEmail: dto.email,
            },
        });
        await this.authService.sendOTPToEmail(dto.email);
    }

    async updateDiplomatProfile(userId: number, dto: UpdateDiplomatProfileDTO) {
        try {

            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    displayName: dto.displayName,
                    displayEmail: dto.displayEmail,
                },
            });

            await this.prisma.diplomat.update({
                where: { userId: userId },
                data: {
                    missionInstitutionId: dto.missionInstitutionId,
                    assignedCity: dto.assignedCity,
                    roleId: dto.roleId,
                    customRole: dto.customRole,
                    yearsOfExperienceId: dto.yearsOfExperienceId,
                    introduction: dto.introduction
                },
            });

            return this.getDiplomatProfile(userId);
        } catch (error) {

        }
    }
}
