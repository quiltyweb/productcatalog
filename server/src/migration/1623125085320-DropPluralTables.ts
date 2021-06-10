import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class DropPluralTables1623125085320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (
      process.env.NODE_ENV === "test" ||
      process.env.NODE_ENV === "production"
    ) {
      await queryRunner.query(`DROP TABLE IF EXISTS "products"`);
      await queryRunner.query(`DROP TABLE IF EXISTS "categories"`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (
      process.env.NODE_ENV === "test" ||
      process.env.NODE_ENV === "production"
    ) {
      await queryRunner.createTable(
        new Table({
          name: "categories",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
            },
            {
              name: "createdAt",
              type: "timestamptz",
              isNullable: false,
              default: "now()",
            },
            {
              name: "updatedAt",
              type: "timestamptz",
              isNullable: false,
              default: "now()",
            },
            {
              name: "name",
              type: "varchar",
              isNullable: false,
              isUnique: true,
              length: "80",
            },
          ],
        }),
        true
      );
      await queryRunner.createTable(
        new Table({
          name: "products",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
            },
            {
              name: "createdAt",
              type: "timestamptz",
              isNullable: false,
              default: "now()",
            },
            {
              name: "updatedAt",
              type: "timestamptz",
              isNullable: false,
              default: "now()",
            },
            {
              name: "categoryId",
              type: "int",
              isNullable: true,
            },
            {
              name: "name",
              type: "varchar",
              isNullable: false,
              isUnique: true,
              length: "80",
            },
            {
              name: "description",
              type: "text",
              isNullable: false,
              // Due to how typeorm concats SQL strings, we have to get creative
              // for a default of ''
              default: "''",
            },
            {
              name: "imagePath",
              type: "varchar",
              isNullable: false,
              // Due to how typeorm concats SQL strings, we have to get creative
              // for a default of ''
              default: "''",
            },
            {
              name: "attachmentPath",
              type: "varchar",
              isNullable: false,
              // Due to how typeorm concats SQL strings, we have to get creative
              // for a default of ''
              default: "''",
            },
            {
              name: "supplierName",
              type: "varchar",
              isNullable: false,
              // Due to how typeorm concats SQL strings, we have to get creative
              // for a default of ''
              default: "''",
            },
            {
              name: "purchasePrice",
              type: "int",
              isNullable: false,
              default: "0",
            },
            {
              name: "salePrice",
              type: "int",
              isNullable: false,
              default: "0",
            },
          ],
        }),
        true
      );

      await queryRunner.createForeignKey(
        "product",
        new TableForeignKey({
          columnNames: ["categoryId"],
          referencedColumnNames: ["id"],
          referencedTableName: "categories",
          onDelete: "SET NULL",
        })
      );
    }
  }
}
