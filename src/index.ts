import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRecordroute } from "./routes/userRecordroutes";
import "reflect-metadata";
import { errorHandler } from "./middlewares/error.middleware";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const { PORT } = process.env;
app.use("/user", userRecordroute);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
