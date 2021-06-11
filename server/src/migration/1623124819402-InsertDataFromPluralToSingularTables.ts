import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDataFromPluralToSingularTables1623124819402
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (
      process.env.NODE_ENV === "test" ||
      process.env.NODE_ENV === "production"
    ) {
      await queryRunner.query(
        `insert into "category"("createdAt", "updatedAt", "name") select "createdAt", "updatedAt", "name" from "categories"`
      );
      await queryRunner.query(
        `insert into "product"("createdAt", "updatedAt", "name", "description", "imagePath", "attachmentPath", "purchasePrice", "salePrice", "supplierName", "categoryId") select "createdAt", "updatedAt", "name", "description", "imagePath", "attachmentPath", "purchasePrice", "salePrice", "supplierName", "categoryId" from "products"`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (
      process.env.NODE_ENV === "test" ||
      process.env.NODE_ENV === "production"
    ) {
      await queryRunner.query(`DELETE FROM category`);
      await queryRunner.query(`DELETE FROM product`);
    }
  }
}
