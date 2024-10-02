// src/types/index.ts

export interface GeoJSON {
  type: string;
  coordinates: number[][][];
}

export interface ClientAOI {
  type: string;
  geometry: GeoJSON;
}

export interface Tile {
  id: number;
  geometry: any;
  fill?: string;
}
