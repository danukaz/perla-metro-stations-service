import express from "express";
import stationsRouter from "./routes/stations.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use("/stations", stationsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Stations Service running on port ${PORT}`);
});
