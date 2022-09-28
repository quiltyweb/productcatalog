import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRoleEnumToString1664365082448 implements MigrationInterface {
  name = "ChangeRoleEnumToString1664365082448";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" type VARCHAR`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'admin'`
    );
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'editor')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`
    );

    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "user_role_enum" USING "role"::"public"."user_role_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'admin'`
    );
  }
}
