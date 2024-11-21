import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { level, language, yearsOfExperienceData, memberships, billingStatus } from './data/common';
import { userTypes } from './data/common';
import { countries } from './data/countries';
import cities from './data/cities';
import { timezones } from './data/timezone';
import { roles } from './data/roles';
import missionInstitutions from './data/mission.institution';
import { hobbies } from './data/hobbies';
import { chronicDiseases } from './data/chronic.diseases';
import { insuranceTypes } from './data/insurance.type';
import { vehicleTypes } from './data/vehicle.type';
import { categories } from './data/categories';
import { taskTypeCategory } from './data/task.type.categories';
import { taskType } from './data/task.type';
import { taskCategory } from './data/task.category';
import { priority } from './data/priority';
import { taskStatus } from './data/task.status';
import { recommendedTask } from './data/recommended.task';
import { hub } from './data/hub';
import { subHub } from './data/sub.hub';

const prisma = new PrismaClient();

async function main() {
    dotenv.config();

    const seedNames = [
        'gender',
        'userType',
        'language',
        'level',
        'country',
        'city',
        'timezone',
        'role',
        'missionInstitutions',
        'yearsOfExperience',
        "memberships",
        'billingStatus',
        'hobbies',
        'chronicDiseases',
        'insuranceTypes',
        'vehicleTypes',
        'categories',
        'taskType',
        'taskTypeCategory',
        'taskStatus',
        'priority',
        'recommendedTask',
        'taskCategory',
        'hub',
        'subHub'
    ];

    try {
        // Check executed seeds
        const executedSeeds = await prisma.seedHistory.findMany({
            where: { name: { in: seedNames } },
        });

        const executedSeedNames = new Set(executedSeeds.map(seed => seed.name));

        for (const seedName of seedNames) {
            if (executedSeedNames.has(seedName)) {
                console.log(`Skipping already executed seed: ${seedName}`);
                continue;
            }

            switch (seedName) {
                case 'gender':
                    await prisma.gender.createMany({
                        data: [
                            { id: 1, name: 'MALE' },
                            { id: 2, name: 'FEMALE' },
                            { id: 3, name: 'OTHER' },
                        ],
                    });
                    break;

                case 'userType':
                    await prisma.userType.createMany({
                        data: userTypes,
                    });
                    break;

                case 'language':
                    await prisma.language.createMany({
                        data: language,
                    });
                    break;

                case 'level':
                    await prisma.level.createMany({
                        data: level,
                    });
                    break;

                case 'country':
                    await prisma.country.createMany({
                        data: countries,
                    });
                    break;

                case 'city':
                    await prisma.city.createMany({
                        data: cities,
                    });
                    break;

                case 'timezone':
                    await prisma.timezone.createMany({
                        data: timezones,
                    });
                    break;

                case 'role':
                    await prisma.role.createMany({
                        data: roles,
                    });
                    break;

                case 'missionInstitutions':
                    await prisma.missionInstitution.createMany({
                        data: missionInstitutions,
                    });
                    break;

                case 'yearsOfExperience':
                    await prisma.yearsOfExperience.createMany({
                        data: yearsOfExperienceData,
                    });
                    break;

                case 'memberships':
                    await prisma.memberships.createMany({
                        data: memberships,
                    });
                    break;

                case 'billingStatus':
                    await prisma.billingStatus.createMany({
                        data: billingStatus,
                    });
                    break;

                case 'hobbies':
                    await prisma.hobbies.createMany({
                        data: hobbies,
                    });
                    break;

                case 'chronicDiseases':
                    await prisma.chronicDiseases.createMany({
                        data: chronicDiseases,
                    });
                    break;

                case 'insuranceTypes':
                    await prisma.insuranceType.createMany({
                        data: insuranceTypes,
                    });
                    break;

                case 'vehicleTypes':
                    await prisma.vehicleType.createMany({
                        data: vehicleTypes,
                    });
                    break;

                case 'categories':
                    await prisma.category.createMany({
                        data: categories,
                    });
                    break;

                case 'taskTypeCategory':
                    await prisma.taskTypeCategory.createMany({
                        data: taskTypeCategory,
                    });
                    break;

                case 'taskType':
                    await prisma.taskType.createMany({
                        data: taskType,
                    });
                    break;

                case 'recommendedTask':
                    await prisma.recommendedTask.createMany({
                        data: recommendedTask,
                    });
                    break;

                case 'taskCategory':
                    await prisma.taskCategory.createMany({
                        data: taskCategory,
                    });
                    break;

                case 'priority':
                    await prisma.priority.createMany({
                        data: priority,
                    });
                    break;

                case 'taskStatus':
                    await prisma.taskStatus.createMany({
                        data: taskStatus,
                    });
                    break;

                case 'hub':
                    await prisma.hub.createMany({
                        data: hub,
                    });
                    break;

                // case 'subHub':
                //     await prisma.subHub.createMany({
                //         data: subHub,
                //     });
                    break;
                default:
                    throw new Error(`Unknown seed: ${seedName}`);
            }

            // Record that the seed has been executed
            await prisma.seedHistory.create({
                data: {
                    name: seedName,
                },
            });

            console.log(`Seed executed: ${seedName}`);
        }

        console.log('Seeding completed.');
    } catch (error) {
        console.error('Error seeding data', error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    });
