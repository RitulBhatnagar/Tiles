import { Router } from "express";
import { TileController } from "../controllers/tileController";

const router = Router();
const tileController = new TileController();

router.post("/intersecting-tiles", tileController.getIntersectingTiles);

export default router;
