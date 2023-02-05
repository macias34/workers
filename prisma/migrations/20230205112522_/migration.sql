-- CreateTable
CREATE TABLE `JobPositions` (
    `jobPositionID` INTEGER NOT NULL AUTO_INCREMENT,
    `positionName` VARCHAR(15) NOT NULL,
    `minSalary` FLOAT NULL,
    `maxSalary` FLOAT NULL,

    PRIMARY KEY (`jobPositionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teams` (
    `teamID` INTEGER NOT NULL AUTO_INCREMENT,
    `teamName` VARCHAR(20) NULL,
    `address` VARCHAR(20) NULL,

    PRIMARY KEY (`teamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bosses` (
    `workerID` INTEGER NOT NULL,

    PRIMARY KEY (`workerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workers` (
    `workerID` INTEGER NOT NULL AUTO_INCREMENT,
    `surname` VARCHAR(15) NULL,
    `name` VARCHAR(20) NULL,
    `jobPositionID` INTEGER NULL,
    `bossID` INTEGER NULL,
    `isBoss` BOOLEAN NULL DEFAULT false,
    `employedSince` DATE NULL,
    `baseSalary` FLOAT NULL,
    `bonusSalary` FLOAT NULL,
    `teamID` INTEGER NULL,

    INDEX `FK_Workers_Teams`(`teamID`),
    INDEX `FK_Workers_Workers`(`bossID`),
    PRIMARY KEY (`workerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Workers` ADD CONSTRAINT `FK_Workers_Teams` FOREIGN KEY (`teamID`) REFERENCES `Teams`(`teamID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Workers` ADD CONSTRAINT `FK_Workers_JobPositions` FOREIGN KEY (`jobPositionID`) REFERENCES `JobPositions`(`jobPositionID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Workers` ADD CONSTRAINT `FK_Workers_Bosses` FOREIGN KEY (`bossID`) REFERENCES `Bosses`(`workerID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
