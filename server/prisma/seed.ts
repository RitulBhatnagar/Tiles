import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const rawdata = fs.readFileSync(path.join(__dirname, "tiles.json"), "utf8");
  const geojson = JSON.parse(rawdata);

  for (const feature of geojson.features) {
    await prisma.tile.create({
      data: {
        geometry: feature.geometry,
        fill: feature.properties.fill,
      },
    });
  }

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
