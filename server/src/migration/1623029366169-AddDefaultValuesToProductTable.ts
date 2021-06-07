import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValuesToProductTable1623029366169
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "imagePath" SET DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "attachmentPath" SET DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "purchasePrice" SET DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "salePrice" SET DEFAULT '0'`
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
      `ALTER TABLE "product" ALTER COLUMN "salePrice" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "purchasePrice" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "attachmentPath" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "imagePath" DROP DEFAULT`
    );
  }
}
