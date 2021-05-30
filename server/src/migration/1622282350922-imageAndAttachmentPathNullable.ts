import { MigrationInterface, QueryRunner } from "typeorm";

export class imageAndAttachmentPathNullable1622282350922
  implements MigrationInterface {
  name = "imageAndAttachmentPathNullable1622282350922";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "imagePath" DROP NOT NULL`
    );
    await queryRunner.query(`COMMENT ON COLUMN "product"."imagePath" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "attachmentPath" DROP NOT NULL`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."attachmentPath" IS NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."attachmentPath" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "attachmentPath" SET NOT NULL`
    );
    await queryRunner.query(`COMMENT ON COLUMN "product"."imagePath" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "imagePath" SET NOT NULL`
    );
  }
}
