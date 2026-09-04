-- CreateEnum
CREATE TYPE "hiring_request_status" AS ENUM ('submitted', 'under-review', 'in-progress', 'fulfilled', 'closed');

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN "sourceHiringRequestId" TEXT;

-- CreateTable
CREATE TABLE "recruiters" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "industry" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recruiters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hiring_requests" (
    "id" TEXT NOT NULL,
    "recruiterId" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "numberOfPositions" INTEGER NOT NULL,
    "roleTitle" TEXT NOT NULL,
    "jobType" "job_type" NOT NULL,
    "experienceRequired" TEXT NOT NULL,
    "preferredStartDate" TIMESTAMP(3),
    "additionalNotes" TEXT,
    "status" "hiring_request_status" NOT NULL DEFAULT 'submitted',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hiring_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recruiters_email_key" ON "recruiters"("email");

-- AddForeignKey
ALTER TABLE "hiring_requests" ADD CONSTRAINT "hiring_requests_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_sourceHiringRequestId_fkey" FOREIGN KEY ("sourceHiringRequestId") REFERENCES "hiring_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
