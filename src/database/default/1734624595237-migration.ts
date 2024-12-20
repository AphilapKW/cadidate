import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734624595237 implements MigrationInterface {
    name = 'Migration1734624595237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "user_password_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_8fb9e49fcc66cc881715ecdcd56" UNIQUE ("user_password_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_8fb9e49fcc66cc881715ecdcd56" FOREIGN KEY ("user_password_id") REFERENCES "users_password"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_8fb9e49fcc66cc881715ecdcd56"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_8fb9e49fcc66cc881715ecdcd56"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "user_password_id"
        `);
    }

}
