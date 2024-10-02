-- CreateTable
CREATE TABLE "Tile" (
    "id" SERIAL NOT NULL,
    "geometry" JSONB NOT NULL,

    CONSTRAINT "Tile_pkey" PRIMARY KEY ("id")
);
