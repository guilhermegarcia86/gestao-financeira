import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1668032508273 implements MigrationInterface {
    name = 'migration1668032508273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" ADD "assunto" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "email" ADD "isSent" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" DROP COLUMN "isSent"`);
        await queryRunner.query(`ALTER TABLE "email" DROP COLUMN "assunto"`);
    }

}
