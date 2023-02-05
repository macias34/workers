-- RedefineIndex
CREATE INDEX `FK_Workers_Bosses` ON `Workers`(`bossID`);
DROP INDEX `FK_Workers_Workers` ON `workers`;
