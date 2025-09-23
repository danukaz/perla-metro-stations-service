import express from "express";
import { createStation, getStations, getStationById, updateStation } from "../controllers/stationsController.js";

const router = express.Router();

// Visualizar estaciones
router.get("/", getStations);

// Crear estación
router.post("/", createStation);

// Obtener estación por ID
router.get("/:id", getStationById);

// Editar estación
router.put("/:id", updateStation);

export default router;
