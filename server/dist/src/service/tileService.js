"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileService = void 0;
const client_1 = require("@prisma/client");
const turf = __importStar(require("@turf/turf"));
const prisma = new client_1.PrismaClient();
class TileService {
    getIntersectingTiles(clientAOI) {
        return __awaiter(this, void 0, void 0, function* () {
            const allTiles = yield prisma.tile.findMany();
            return allTiles.filter((tile) => {
                const geoJSON = this.convertToGeoJSON(tile.geometry);
                return geoJSON ? this.doesIntersect(geoJSON, clientAOI.geometry) : false;
            });
        });
    }
    convertToGeoJSON(geometry) {
        if (typeof geometry === "object" &&
            geometry !== null &&
            "type" in geometry &&
            "coordinates" in geometry &&
            Array.isArray(geometry.coordinates)) {
            return geometry;
        }
        console.error("Invalid geometry format:", geometry);
        return null;
    }
    doesIntersect(tileGeometry, aoiGeometry) {
        try {
            const tilePolygon = turf.polygon(tileGeometry.coordinates);
            const aoiPolygon = turf.polygon(aoiGeometry.coordinates);
            return turf.booleanIntersects(tilePolygon, aoiPolygon);
        }
        catch (error) {
            console.error("Error in intersection calculation:", error);
            return false;
        }
    }
}
exports.TileService = TileService;
