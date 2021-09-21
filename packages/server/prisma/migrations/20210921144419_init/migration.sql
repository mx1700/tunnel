-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "time" DATETIME NOT NULL,
    "request" TEXT NOT NULL,
    "response" TEXT NOT NULL
);
