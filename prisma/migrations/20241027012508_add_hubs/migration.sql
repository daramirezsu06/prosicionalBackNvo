-- CreateTable
CREATE TABLE "hub" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "tags" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "hub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subHub" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "tags" JSONB,
    "overview" TEXT,
    "detail" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "hubId" INTEGER NOT NULL,

    CONSTRAINT "subHub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subHub" ADD CONSTRAINT "subHub_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "hub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
