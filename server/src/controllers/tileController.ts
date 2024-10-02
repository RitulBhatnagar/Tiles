import { Request, Response } from "express";
import { TileService } from "../service/tileService";
import { ClientAOI } from "../types";

export class TileController {
  private tileService: TileService;

  constructor() {
    this.tileService = new TileService();
  }

  getIntersectingTiles = async (req: Request, res: Response) => {
    const clientAOI: ClientAOI = req.body;

    try {
      const intersectingTiles = await this.tileService.getIntersectingTiles(
        clientAOI
      );
      res.status(200).json(intersectingTiles);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  };
}
