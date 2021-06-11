import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProductAndCategorySequenceId1623405238380
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const [maxCurrentProductId] = await queryRunner.query(
      `SELECT max(id) FROM product`
    );
    await queryRunner.query(
      `ALTER SEQUENCE product_id_seq RESTART ${maxCurrentProductId.max + 1}`
    );

    const [maxCurrentCategoryId] = await queryRunner.query(
      `SELECT max(id) FROM category`
    );
    await queryRunner.query(
      `ALTER SEQUENCE category_id_seq RESTART ${maxCurrentCategoryId.max + 1}`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER SEQUENCE product_id_seq RESTART 1`);
    await queryRunner.query(`ALTER SEQUENCE category_id_seq RESTART 1`);
  }
}
