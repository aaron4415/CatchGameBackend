import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserRecord } from "../entity/UserRecord.entity";
import { pool } from "../db";

export class UserRecordController {
  static async getLeaderboard(req: Request, res: Response) {
    try {
      const client = await pool.connect();

      const queryResult = await client.query(
        "SELECT * FROM user_record ORDER BY score DESC LIMIT 100"
      );

      const rankedUserRecords = queryResult.rows.map((userRecord, index) => ({
        ...userRecord,
        ranking: index + 1,
      }));

      client.release();

      return res.status(200).json({ data: rankedUserRecords });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createUserRecord(req: Request, res: Response) {
    try {
      const { name, score } = req.body;

      const client = await pool.connect();

      await client.query(
        "INSERT INTO user_record (name, score) VALUES ($1, $2)",
        [name, score]
      );

      client.release();

      return res
        .status(200)
        .json({
          message: "User record created successfully",
          userRecord: { name, score },
        });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
