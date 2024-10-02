import { PrismaClient } from "@prisma/client";
import { GeoJSON, ClientAOI, Tile } from "../types";
import * as turf from "@turf/turf";

const prisma = new PrismaClient();

export class TileService {
  async getIntersectingTiles(clientAOI: ClientAOI) {
    const allTiles = await prisma.tile.findMany();
    return allTiles.filter((tile) => {
      const geoJSON = this.convertToGeoJSON(tile.geometry);
      return geoJSON ? this.doesIntersect(geoJSON, clientAOI.geometry) : false;
    });
  }

  private convertToGeoJSON(geometry: any): GeoJSON | null {
    if (
      typeof geometry === "object" &&
      geometry !== null &&
      "type" in geometry &&
      "coordinates" in geometry &&
      Array.isArray(geometry.coordinates)
    ) {
      return geometry as GeoJSON;
    }
    console.error("Invalid geometry format:", geometry);
    return null;
  }

  private doesIntersect(tileGeometry: GeoJSON, aoiGeometry: GeoJSON): boolean {
    try {
      const tilePolygon = turf.polygon(tileGeometry.coordinates);
      const aoiPolygon = turf.polygon(aoiGeometry.coordinates);
      return turf.booleanIntersects(tilePolygon, aoiPolygon);
    } catch (error) {
      console.error("Error in intersection calculation:", error);
      return false;
    }
  }
}
