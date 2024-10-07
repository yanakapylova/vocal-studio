/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherame` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `birthdate` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `photoURL` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "songs" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "fatherame" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "school" TEXT NOT NULL,
DROP COLUMN "birthdate",
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "photoURL" SET NOT NULL,
ALTER COLUMN "photoURL" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
