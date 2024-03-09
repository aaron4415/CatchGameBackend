import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRecords1709808235350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_record" (
                "id" SERIAL PRIMARY KEY,
                "score" integer NOT NULL,
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_record"`);
  }
}
