import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeDbStructure1664687003784 implements MigrationInterface {
  name = "InitializeDbStructure1664687003784";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "product_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "product" ("id" INT DEFAULT nextval('"product_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "name" varchar NOT NULL, "description" varchar NOT NULL, "imagePath" varchar NOT NULL DEFAULT '', "attachmentPath" varchar NOT NULL DEFAULT '', "purchasePrice" int8 NOT NULL DEFAULT (0), "salePrice" int8 NOT NULL DEFAULT (0), "supplierName" varchar NOT NULL DEFAULT '', "categoryId" int8, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_ff0c0301a95e517153df97f681" ON "product" ("categoryId") `
    );
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "category_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "category" ("id" INT DEFAULT nextval('"category_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "name" varchar NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_id_seq"`);
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" ("id" INT DEFAULT nextval('"user_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "email" varchar NOT NULL, "encryptedPassword" varchar NOT NULL, "role" varchar NOT NULL DEFAULT 'admin', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );

    // Turns out checking for a foreign key constraint before adding it
    // to a table isn't so simple in SQL, so cheating by using JS instead
    const matchingConstraints = await queryRunner.query(
      `SELECT * FROM pg_constraint WHERE conname = 'FK_ff0c0301a95e517153df97f6812'`
    );
    if (!matchingConstraints.length) {
      await queryRunner.query(
        `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP SEQUENCE "category_id_seq"`);
    await queryRunner.query(
      `DROP INDEX "product"@"IDX_ff0c0301a95e517153df97f681" CASCADE`
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP SEQUENCE "product_id_seq"`);
  }
}
