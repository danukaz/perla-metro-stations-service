import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const seedStations = async () => {
  try {
    const stations = [
      {
        nombre: "Estación Central",
        ubicacion: "Av. Siempre Viva 742",
        tipo: "origen",
        estado: "activa"
      },
      {
        nombre: "Estación Norte",
        ubicacion: "Calle Los Olivos 1200",
        tipo: "intermedia",
        estado: "activa"
      },
      {
        nombre: "Estación Sur",
        ubicacion: "Av. Las Industrias 450",
        tipo: "destino",
        estado: "inactiva"
      }
    ];

    for (const st of stations) {
      const id = uuidv4();
      await pool.query(
        `INSERT IGNORE INTO stations (id, nombre, ubicacion, tipo, estado) VALUES (?, ?, ?, ?, ?)`,
        [id, st.nombre, st.ubicacion, st.tipo, st.estado]
      );
    }

    console.log("✅ Seeder ejecutado con éxito");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error ejecutando seeder:", error);
    process.exit(1);
  }
};

seedStations();
