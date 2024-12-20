import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734612610064 implements MigrationInterface {
    name = 'Migration1734612610064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "candidates"
            ALTER COLUMN "status"
            SET DEFAULT 'To Do'
        `);
        await queryRunner.query(`
            ALTER TABLE "candidates"
            ALTER COLUMN "is_saved"
            SET DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "candidates"
            ALTER COLUMN "is_saved" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "candidates"
            ALTER COLUMN "status" DROP DEFAULT
        `);
    }

}
