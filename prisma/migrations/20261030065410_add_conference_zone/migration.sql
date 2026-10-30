-- CreateTable
CREATE TABLE "ConferenceZone" (
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tone" TEXT NOT NULL DEFAULT 'navy',
    "description" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConferenceZone_pkey" PRIMARY KEY ("key")
);
