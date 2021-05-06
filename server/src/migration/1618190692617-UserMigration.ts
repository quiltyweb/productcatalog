import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1618190692617 implements MigrationInterface {
  name = "UserMigration1618190692617";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "password" TO "encryptedPassword"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "encryptedPassword" TO "password"`
    );
  }
}
