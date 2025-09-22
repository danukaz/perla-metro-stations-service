import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Crear estación
export const createStation = async (req, res) => {
  try {
    const { nombre, ubicacion, tipo } = req.body;

    if (!nombre || !ubicacion || !tipo) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const id = uuidv4();

    const [result] = await pool.query(
      `INSERT INTO stations (id, nombre, ubicacion, tipo) VALUES (?, ?, ?, ?)`,
      [id, nombre, ubicacion, tipo]
    );

    res.status(201).json({ message: "Estación creada con éxito", id });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Ya existe una estación con ese nombre y ubicación" });
    }
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
