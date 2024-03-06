import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";

export class UserController {
  static async getAllUser(req: Request, res: Response) {}
  static async createUser(req: Request, res: Response) {
    const { name, score } = req.body;
    const user = new User();
    user.name = name;
    user.score = score;
    user.createAt = new Date();
    const movieRepository = AppDataSource.getRepository(User);
    await movieRepository.save(user);
    return res.status(200).json({ message: "User created successfully", user });
  }
}
