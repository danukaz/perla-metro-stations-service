import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Crear estación
export const createStation = async (req, res) => {
    try {
        const { nombre, ubicacion, tipo } = req.body;

        // Validar campos obligatorios
        if (!nombre || !ubicacion || !tipo) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        // Validar tipo permitido (origen, destino, intermedia)
        const tiposPermitidos = ["origen", "destino", "intermedia"];
        if (!tiposPermitidos.includes(tipo.toLowerCase())) {
            return res.status(400).json({
                error: "Tipo inválido. Debe ser 'origen', 'destino' o 'intermedia'."
            });
        }

        // Validar ubicación (mínimo 5 caracteres, solo letras, números, espacios y algunos símbolos)
        const direccionRegex = /^[a-zA-Z0-9\s.,-]+$/;
        if (ubicacion.trim().length < 5 || !direccionRegex.test(ubicacion)) {
            return res.status(400).json({
                error: "Ubicación inválida. Debe tener al menos 5 caracteres y solo contener letras, números, espacios, comas, puntos y guiones."
            });
        }

        // Validar nombre (mínimo 3 caracteres, solo letras y espacios)
        const nombreRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (nombre.trim().length < 3 || !nombreRegex.test(nombre)) {
            return res.status(400).json({
                error: "Nombre inválido. Debe tener al menos 3 caracteres y solo contener letras y espacios."
            });
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

// Obtener todas las estaciones activas
export const getStations = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT id, nombre, ubicacion, tipo, estado, created_at, updated_at
            FROM stations 
            WHERE deleted_at IS NULL`
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Obtener estación por ID
export const getStationById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `SELECT id, nombre, ubicacion, tipo, created_at, updated_at
       FROM stations
       WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Estación no encontrada" });
    }

    const station = rows[0];

    // Si está inactiva, no devolvemos el estado
    if (station.estado === "inactiva") {
      const { estado, ...resto } = station;
      return res.json(resto);
    }

    res.json(station);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

