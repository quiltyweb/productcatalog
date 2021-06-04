import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultValuesToProductFieldsAndTableNamesInModels1622771106739
  implements MigrationInterface {
  name = "DefaultValuesToProductFieldsAndTableNamesInModels1622771106739";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image_path"`);
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "attachment_path"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "supplier_name"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "purchase_price"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sale_price"`);
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "imagePath" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "attachmentPath" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "purchasePrice" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "salePrice" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "supplierName" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(`ALTER TABLE "products" ADD "categoryId" integer`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `CREATE SEQUENCE "products_id_seq" OWNED BY "products"."id"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT nextval('products_id_seq')`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "UQ_4c9fb58de893725258746385e16"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "description" character varying NOT NULL`
    );
    await queryRunner.query(
      `CREATE SEQUENCE "categories_id_seq" OWNED BY "categories"."id"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "id" SET DEFAULT nextval('categories_id_seq')`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"`
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "name" character varying(80) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "id" DROP DEFAULT`
    );
    await queryRunner.query(`DROP SEQUENCE "categories_id_seq"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "description" text NOT NULL DEFAULT ''`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "name" character varying(80) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name")`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "id" DROP DEFAULT`
    );
    await queryRunner.query(`DROP SEQUENCE "products_id_seq"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "supplierName"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "salePrice"`);
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "purchasePrice"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "attachmentPath"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "imagePath"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "sale_price" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "purchase_price" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "supplier_name" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "attachment_path" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "image_path" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(`ALTER TABLE "products" ADD "category_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }
}
