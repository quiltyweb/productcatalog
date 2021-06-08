import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDataFromPluralToSingularTables1623124819402
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into "category"("id", "createdAt", "updatedAt", "name") select "id", "createdAt", "updatedAt", "name" from "categories"`
    );
    await queryRunner.query(
      `insert into "product"("id", "createdAt", "updatedAt", "name", "description", "imagePath", "attachmentPath", "purchasePrice", "salePrice", "supplierName", "categoryId") select "id", "createdAt", "updatedAt", "name", "description", "imagePath", "attachmentPath", "purchasePrice", "salePrice", "supplierName", "categoryId" from "products"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM category`);
    await queryRunner.query(`DELETE FROM product`);
  }
}
