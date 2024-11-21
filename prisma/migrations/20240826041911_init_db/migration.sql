-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "gender" (
    "id" INTEGER NOT NULL,
    "name" "GenderType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userType" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "userType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(500),
    "birthDate" TIMESTAMP(3),
    "genderId" INTEGER,
    "email" VARCHAR(255) NOT NULL,
    "profilePicture" VARCHAR(200),
    "displayName" VARCHAR(100),
    "displayEmail" VARCHAR(100),
    "timeZoneId" INTEGER,
    "dateFormat" VARCHAR(50),
    "timeFormat" VARCHAR(50),
    "isEmailVerified" BOOLEAN DEFAULT false,
    "password" TEXT,
    "userTypeId" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diplomat" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "officialEmail" TEXT,
    "isOfficialEmailVerified" BOOLEAN DEFAULT false,
    "currentOnboardingStep" INTEGER DEFAULT 1,
    "homeCountry" JSONB,
    "assignedCountry" JSONB,
    "assignedCity" JSONB,
    "roleId" INTEGER,
    "customRole" TEXT,
    "yearsOfExperienceId" INTEGER,
    "introduction" TEXT,
    "vehicleTypeId" INTEGER,
    "insuranceTypeId" INTEGER,
    "chronicDiseasesId" INTEGER,
    "missionInstitutionId" INTEGER,
    "isWithSpouse" BOOLEAN,
    "isWithChildren" BOOLEAN,
    "isNeedHousingHelp" BOOLEAN,
    "isWithPets" BOOLEAN,
    "isPlanAdoptingPets" BOOLEAN,
    "hobbies" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "diplomat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "isPasswordTaken" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskType" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "process" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "taskType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskTypeCategory" (
    "taskTypeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "taskTypeCategory_pkey" PRIMARY KEY ("taskTypeId","categoryId")
);

-- CreateTable
CREATE TABLE "category" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskTypeId" INTEGER NOT NULL,
    "taskStatusId" INTEGER NOT NULL,
    "remindDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "priorityId" INTEGER NOT NULL,
    "documents" JSONB,
    "notes" TEXT,
    "subTasks" JSONB,
    "customTitle" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taskCategory" (
    "taskId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "taskCategory_pkey" PRIMARY KEY ("taskId","categoryId")
);

-- CreateTable
CREATE TABLE "taskStatus" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "taskStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "priority" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "priority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentMethods" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cardNumber" VARCHAR(200),
    "cardHolderName" VARCHAR(200),
    "billingAddress" VARCHAR(300),
    "expiryDate" TIMESTAMP(3),
    "cvc" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "paymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "appName" VARCHAR(200),
    "description" VARCHAR(500),
    "isConnected" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "accessToken" VARCHAR(255),
    "refreshToken" VARCHAR(255),
    "tokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billingInvoices" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" VARCHAR(500),
    "description" TEXT,
    "amount" DOUBLE PRECISION,
    "currency" VARCHAR(20),
    "billingStatusId" INTEGER NOT NULL,
    "stripeDetail" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "billingInvoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(10),
    "dialingCode" VARCHAR(255),
    "flag" VARCHAR(200),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billingStatus" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "billingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languageSkills" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "languageSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timezone" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(255),
    "value" VARCHAR(255),
    "region" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "timezone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chronicDiseases" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" VARCHAR(500),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "chronicDiseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insuranceType" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "insuranceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hobbies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "hobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicleType" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "vehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userMemberships" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "membershipId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" VARCHAR(20),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "userMemberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" VARCHAR(20),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "countryId" INTEGER NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "missionInstitution" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "countryId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "missionInstitution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeedHistory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeedHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yearsOfExperience" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "yearsOfExperience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "diplomat_userId_key" ON "diplomat"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "diplomat_officialEmail_key" ON "diplomat"("officialEmail");

-- CreateIndex
CREATE UNIQUE INDEX "SeedHistory_name_key" ON "SeedHistory"("name");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_timeZoneId_fkey" FOREIGN KEY ("timeZoneId") REFERENCES "timezone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "userType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomat" ADD CONSTRAINT "diplomat_insuranceTypeId_fkey" FOREIGN KEY ("insuranceTypeId") REFERENCES "insuranceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomat" ADD CONSTRAINT "diplomat_chronicDiseasesId_fkey" FOREIGN KEY ("chronicDiseasesId") REFERENCES "chronicDiseases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomat" ADD CONSTRAINT "diplomat_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomat" ADD CONSTRAINT "diplomat_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "vehicleType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomat" ADD CONSTRAINT "diplomat_missionInstitutionId_fkey" FOREIGN KEY ("missionInstitutionId") REFERENCES "missionInstitution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomat" ADD CONSTRAINT "diplomat_yearsOfExperienceId_fkey" FOREIGN KEY ("yearsOfExperienceId") REFERENCES "yearsOfExperience"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskTypeCategory" ADD CONSTRAINT "taskTypeCategory_taskTypeId_fkey" FOREIGN KEY ("taskTypeId") REFERENCES "taskType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskTypeCategory" ADD CONSTRAINT "taskTypeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_taskStatusId_fkey" FOREIGN KEY ("taskStatusId") REFERENCES "taskStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_taskTypeId_fkey" FOREIGN KEY ("taskTypeId") REFERENCES "taskType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "priority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskCategory" ADD CONSTRAINT "taskCategory_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskCategory" ADD CONSTRAINT "taskCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billingInvoices" ADD CONSTRAINT "billingInvoices_billingStatusId_fkey" FOREIGN KEY ("billingStatusId") REFERENCES "billingStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languageSkills" ADD CONSTRAINT "languageSkills_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languageSkills" ADD CONSTRAINT "languageSkills_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languageSkills" ADD CONSTRAINT "languageSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "diplomat"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userMemberships" ADD CONSTRAINT "userMemberships_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "memberships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missionInstitution" ADD CONSTRAINT "missionInstitution_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missionInstitution" ADD CONSTRAINT "missionInstitution_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
