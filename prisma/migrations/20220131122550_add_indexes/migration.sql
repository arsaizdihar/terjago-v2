-- CreateIndex
CREATE INDEX `Major_majorType_universityId_idx` ON `Major`(`majorType`, `universityId`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);
