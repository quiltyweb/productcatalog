import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProducts1586586878064 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'created_at',
          type: 'timestamptz',
          isNullable: false,
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamptz',
          isNullable: false,
          default: 'now()'
        },
        {
          name: 'category_id',
          type: 'int',
          isNullable: true
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
          length: '80'
        },
        {
          name: 'description',
          type: 'text',
          isNullable: false,
          // Due to how typeorm concats SQL strings, we have to get creative
          // for a default of ''
          default: "''"
        },
        {
          name: 'image_path',
          type: 'varchar',
          isNullable: false,
          // Due to how typeorm concats SQL strings, we have to get creative
          // for a default of ''
          default: "''"
        },
        {
          name: 'attachment_path',
          type: 'varchar',
          isNullable: false,
          // Due to how typeorm concats SQL strings, we have to get creative
          // for a default of ''
          default: "''"
        },
        {
          name: 'supplier_name',
          type: 'varchar',
          isNullable: false,
          // Due to how typeorm concats SQL strings, we have to get creative
          // for a default of ''
          default: "''"
        },
        {
          name: 'purchase_price',
          type: 'int',
          isNullable: false
        },
        {
          name: 'sale_price',
          type: 'int',
          isNullable: false
        }
      ]
    }), true)

    await queryRunner.createForeignKey("products", new TableForeignKey({
      columnNames: ["category_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "categories",
      onDelete: "SET NULL"
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories', true, true)
  }

}
