import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDefaultValueAdminRoleToUser1623992875259 implements MigrationInterface {
    name = 'UpdateDefaultValueAdminRoleToUser1623992875259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'editor')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "user_role_enum" NOT NULL DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }

}
