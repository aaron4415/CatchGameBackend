import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserRecord } from "../entity/UserRecord.entity";

export class UserRecordController {
  static async getLeaderboard(req: Request, res: Response) {
    const userRecordRepository = AppDataSource.getRepository(UserRecord);
    const userRecords = await userRecordRepository
      .createQueryBuilder("userRecord")
      .orderBy("userRecord.score", "DESC")
      .getMany();

    // Assign ranking based on the order in the array
    const rankedUserRecords = userRecords.map((userRecord, index) => ({
      ...userRecord,
      ranking: index + 1,
    }));
    return res.status(200).json({
      data: rankedUserRecords,
    });
  }
  static async createUserRecord(req: Request, res: Response) {
    const { name, score } = req.body;
    const userRecord = new UserRecord();
    userRecord.name = name;
    userRecord.score = score;
    const userRecordRepository = AppDataSource.getRepository(UserRecord);
    await userRecordRepository.save(userRecord);
    return res
      .status(200)
      .json({ message: "User record created successfully", userRecord });
  }
}
