import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSingularNameTables1623124715097
  implements MigrationInterface {
  name = "CreateSingularNameTables1623124715097";

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (
      process.env.NODE_ENV === "test" ||
      process.env.NODE_ENV === "production"
    ) {
      await queryRunner.query(
        `CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "imagePath" character varying NOT NULL DEFAULT '', "attachmentPath" character varying NOT NULL DEFAULT '', "purchasePrice" integer NOT NULL DEFAULT '0', "salePrice" integer NOT NULL DEFAULT '0', "supplierName" character varying NOT NULL DEFAULT '', "categoryId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
      );
      await queryRunner.query(
        `CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
      );
      await queryRunner.query(
        `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (
      process.env.NODE_ENV === "test" ||
      process.env.NODE_ENV === "production"
    ) {
      await queryRunner.query(
        `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`
      );
      await queryRunner.query(`DROP TABLE "category"`);
      await queryRunner.query(`DROP TABLE "product"`);
    }
  }
}
