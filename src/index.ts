import express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRecordroute } from "./routes/userRecordroutes";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";
import { pool } from "./db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(cors());

const { PORT } = process.env;

async function initDbConnection() {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
  });

  try {
    await pool.connect();
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}

initDbConnection();

app.use("/", userRecordroute);

export default app;
