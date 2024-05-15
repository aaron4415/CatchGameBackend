import { AppDataSource } from "./data-source";
import express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRecordroute } from "./routes/userRecordroutes";
import "reflect-metadata";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";
import { DataSource } from "typeorm";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(cors());

const { PORT } = process.env;
// app.get("*", (req: Request, res: Response) => {
//   res.status(505).json({ message: "Bad Request" });
// });

AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};

app.use("/", userRecordroute);

export default app;
