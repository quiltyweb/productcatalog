import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDataFromSingularToPluralTables1623122470572
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if(process.env.NODE_ENV === "production"){
      await queryRunner.query(
        `insert into "categories"("id", "createdAt", "updatedAt", "name") select "id", "createdAt", "updatedAt", "name" from "category"`
      );
      await queryRunner.query(
        `insert into "products"("id", "createdAt", "updatedAt", "name", "description", "imagePath", "attachmentPath", "purchasePrice", "salePrice", "supplierName", "categoryId") select "id", "createdAt", "updatedAt", "name", "description", "imagePath", "attachmentPath", "purchasePrice", "salePrice", "supplierName", "categoryId" from "product"`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if(process.env.NODE_ENV === "production"){
      await queryRunner.query(`DELETE FROM categories`);
      await queryRunner.query(`DELETE FROM products`);
    }
  }
}
