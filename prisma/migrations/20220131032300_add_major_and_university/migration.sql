-- AlterTable
ALTER TABLE `User` ADD COLUMN `major1Id` INTEGER NULL,
    ADD COLUMN `major2Id` INTEGER NULL,
    ADD COLUMN `majorType` ENUM('SAINTEK', 'SOSHUM') NOT NULL DEFAULT 'SAINTEK';

-- CreateTable
CREATE TABLE `Major` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `universityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `University` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
