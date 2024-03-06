import * as express from "express";
import { UserController } from "../controllers/user.controllers";
const Router = express.Router();

Router.get("/users", UserController.getAllUser);
Router.post("/movies", UserController.createUser);

export { Router as userRouter };
