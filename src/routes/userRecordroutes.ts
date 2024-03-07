import * as express from "express";
import { UserRecordController } from "../controllers/userRecordController.controllers";
const Router = express.Router();

Router.get("/leaderboard", UserRecordController.getLeaderboard);
Router.post("/create/userRecord", UserRecordController.createUserRecord);

export { Router as userRecordroute };
