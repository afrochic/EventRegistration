/*
  Warnings:

  - A unique constraint covering the columns `[checkInToken]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Registration" ADD COLUMN     "checkInToken" TEXT,
ADD COLUMN     "checkedIn" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Registration_checkInToken_key" ON "public"."Registration"("checkInToken");
