import { MigrationInterface, QueryRunner } from "typeorm";

export class defaultValuesToProductFields1622287611679
  implements MigrationInterface {
  name = "defaultValuesToProductFields1622287611679";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "product"."imagePath" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "imagePath" SET DEFAULT ''`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."attachmentPath" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "attachmentPath" SET DEFAULT ''`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."purchasePrice" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "purchasePrice" SET DEFAULT '0'`
    );
    await queryRunner.query(`COMMENT ON COLUMN "product"."salePrice" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "salePrice" SET DEFAULT '0'`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."supplierName" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "supplierName" SET DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "supplierName" DROP DEFAULT`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."supplierName" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "salePrice" DROP DEFAULT`
    );
    await queryRunner.query(`COMMENT ON COLUMN "product"."salePrice" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "purchasePrice" DROP DEFAULT`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."purchasePrice" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "attachmentPath" DROP DEFAULT`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."attachmentPath" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "imagePath" DROP DEFAULT`
    );
    await queryRunner.query(`COMMENT ON COLUMN "product"."imagePath" IS NULL`);
  }
}
