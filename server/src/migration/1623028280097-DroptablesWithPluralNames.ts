import { MigrationInterface, QueryRunner } from "typeorm";

export class DroptablesWithPluralNames1623028280097
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS products`);
    await queryRunner.query(`DROP TABLE IF EXISTS categories`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE products`);
    await queryRunner.query(`CREATE TABLE categories`);
  }
}
