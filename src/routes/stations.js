import express from "express";
import { createStation, getStations } from "../controllers/stationsController.js";

const router = express.Router();

// Visualizar estaciones
router.get("/", getStations);

// Crear estación
router.post("/", createStation);

export default router;
