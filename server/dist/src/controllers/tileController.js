"use strict";
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
exports.TileController = void 0;
const tileService_1 = require("../service/tileService");
class TileController {
    constructor() {
        this.getIntersectingTiles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const clientAOI = req.body;
            try {
                const intersectingTiles = yield this.tileService.getIntersectingTiles(clientAOI);
                res.status(200).json(intersectingTiles);
            }
            catch (err) {
                console.error(err);
                res
                    .status(500)
                    .json({ error: "An error occurred while processing your request." });
            }
        });
        this.tileService = new tileService_1.TileService();
    }
}
exports.TileController = TileController;
