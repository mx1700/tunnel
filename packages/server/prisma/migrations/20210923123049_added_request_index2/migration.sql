-- DropIndex
DROP INDEX "Request_username_time_idx";

-- CreateIndex
CREATE INDEX "Request_time_username_idx" ON "Request"("time", "username");
