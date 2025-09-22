import express from "express";
import { createStation } from "../controllers/stationsController.js";

const router = express.Router();

// Ruta de prueba (borrar luego!!)
router.get("/", (req, res) => {
  res.json({ message: "Stations Service funcionando 🚉" });
});

// Crear estación
router.post("/", createStation);

export default router;
