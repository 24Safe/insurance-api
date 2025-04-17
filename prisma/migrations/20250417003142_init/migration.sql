-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "PolicyType" AS ENUM ('DZO', 'PZO', 'PNP');

-- CreateEnum
CREATE TYPE "CaseServiceStatus" AS ENUM ('PENDING', 'APPROVED', 'SUBMITTED_TO_MEDIFIT', 'REJECTED', 'BOOKED', 'SERVICE_DELIVERED', 'DOCUMENTS_COMPLETED', 'LIQUIDATED', 'CLOSED', 'CLOSED_NO_SHOW', 'STORNO', 'CANCELED');

-- CreateEnum
CREATE TYPE "LimitType" AS ENUM ('LIMIT', 'NO_LIMIT', 'NUMBER_OF_OCCURRENCES');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('INVOICE', 'MEDICAL_REPORT', 'MEDICAL_REFERRAL', 'OTHER', 'CUSTOMER_DOCUMENT', 'CONTRACT');

-- CreateTable
CREATE TABLE "policyholders" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "date_of_birth" DATE,
    "email" TEXT,
    "phone_number" TEXT,
    "street" TEXT,
    "city" TEXT,
    "zip" TEXT,
    "country" TEXT,
    "unique_master_citizen_number" TEXT NOT NULL,
    "passport_number" TEXT,
    "gender" "Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "policyholders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contractor_name" TEXT,
    "insurance_start" DATE NOT NULL,
    "start" DATE NOT NULL,
    "end" DATE NOT NULL,
    "policy_number" TEXT NOT NULL,
    "insurance_card_number" TEXT,
    "type" "PolicyType" NOT NULL,
    "limit_type" "LimitType" NOT NULL,
    "limit" INTEGER NOT NULL,
    "limit_usage" INTEGER NOT NULL,
    "license_plate" TEXT,
    "vin_number" TEXT,
    "color" TEXT,
    "vehicle_make" TEXT,
    "vehicle_model" TEXT,
    "year" INTEGER,
    "policyholder_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "status" "PolicyStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coverages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "limit_type" "LimitType" NOT NULL,
    "limit_usage" INTEGER NOT NULL,
    "sub_limit" INTEGER NOT NULL,
    "sub_limit_type" "LimitType" NOT NULL,
    "sub_limit_usage" INTEGER NOT NULL,
    "parentId" INTEGER,
    "level" INTEGER NOT NULL,
    "note" TEXT,
    "templateId" INTEGER,
    "policyId" INTEGER NOT NULL,
    "participation" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coverages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coverageTemplates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "type" "PolicyType" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coverageTemplates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coverage_template_relations" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "child_id" INTEGER NOT NULL,

    CONSTRAINT "coverage_template_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coverageTemplatesService" (
    "id" SERIAL NOT NULL,
    "coverageTemplateId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "coverageTemplatesService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "associates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "registration_number" TEXT NOT NULL,
    "tax_id" TEXT NOT NULL,
    "types" JSONB NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "associates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" SERIAL NOT NULL,
    "service_name" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "associateId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "networks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "participation" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "network_associate" (
    "id" SERIAL NOT NULL,
    "networkId" INTEGER NOT NULL,
    "associateId" INTEGER NOT NULL,

    CONSTRAINT "network_associate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "policies" ADD CONSTRAINT "policies_policyholder_id_fkey" FOREIGN KEY ("policyholder_id") REFERENCES "policyholders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coverages" ADD CONSTRAINT "coverages_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "coverages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coverages" ADD CONSTRAINT "coverages_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "coverageTemplates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coverages" ADD CONSTRAINT "coverages_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coverage_template_relations" ADD CONSTRAINT "coverage_template_relations_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "coverageTemplates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coverage_template_relations" ADD CONSTRAINT "coverage_template_relations_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "coverageTemplates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coverageTemplatesService" ADD CONSTRAINT "coverageTemplatesService_coverageTemplateId_fkey" FOREIGN KEY ("coverageTemplateId") REFERENCES "coverageTemplates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coverageTemplatesService" ADD CONSTRAINT "coverageTemplatesService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_associateId_fkey" FOREIGN KEY ("associateId") REFERENCES "associates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "network_associate" ADD CONSTRAINT "network_associate_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "networks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "network_associate" ADD CONSTRAINT "network_associate_associateId_fkey" FOREIGN KEY ("associateId") REFERENCES "associates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
