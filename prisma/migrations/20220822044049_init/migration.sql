/*
  Warnings:

  - You are about to drop the column `workmanId` on the `work` table. All the data in the column will be lost.
  - You are about to drop the `workman` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workmanlocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workmanservice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workerId` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `work` DROP FOREIGN KEY `Work_workmanId_fkey`;

-- DropForeignKey
ALTER TABLE `workmanlocation` DROP FOREIGN KEY `WorkmanLocation_workmanId_fkey`;

-- DropForeignKey
ALTER TABLE `workmanservice` DROP FOREIGN KEY `WorkmanService_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `workmanservice` DROP FOREIGN KEY `WorkmanService_workmanId_fkey`;

-- AlterTable
ALTER TABLE `work` DROP COLUMN `workmanId`,
    ADD COLUMN `workerId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `workman`;

-- DropTable
DROP TABLE `workmanlocation`;

-- DropTable
DROP TABLE `workmanservice`;

-- CreateTable
CREATE TABLE `Worker` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NULL DEFAULT false,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `joinedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `address` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `phoneVerified` BOOLEAN NULL DEFAULT false,
    `avatar` VARCHAR(191) NULL,
    `dob` DATETIME(3) NULL,
    `bio` VARCHAR(191) NULL,
    `verified` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `Worker_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkerLocation` (
    `id` VARCHAR(191) NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `workerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WorkerLocation_workerId_key`(`workerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkerService` (
    `workerId` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`workerId`, `serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkerLocation` ADD CONSTRAINT `WorkerLocation_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkerService` ADD CONSTRAINT `WorkerService_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkerService` ADD CONSTRAINT `WorkerService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
