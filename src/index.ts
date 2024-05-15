import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRecordroute } from "./routes/userRecordroutes";
import "reflect-metadata";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(cors());

const { PORT } = process.env;
// app.get("*", (req: Request, res: Response) => {
//   res.status(505).json({ message: "Bad Request" });
// });
async function initDbConnection() {
  await AppDataSource.initialize()
    .then(async () => {
      app.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT);
      });
      console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));
}
initDbConnection();

app.use("/", userRecordroute);

export default app;
