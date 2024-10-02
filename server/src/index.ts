import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import tileRoutes from "./routes/tileRoute";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", tileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
