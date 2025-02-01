-- CreateTable
CREATE TABLE "Period" (
    "id" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "finishTime" TEXT NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);
