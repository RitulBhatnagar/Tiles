"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tileController_1 = require("../controllers/tileController");
const router = (0, express_1.Router)();
const tileController = new tileController_1.TileController();
router.post("/intersecting-tiles", tileController.getIntersectingTiles);
exports.default = router;
