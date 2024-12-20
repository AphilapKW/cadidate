import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734623583336 implements MigrationInterface {
    name = 'Migration1734623583336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users_password" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "password" character varying NOT NULL,
                CONSTRAINT "PK_4175c832d328c98ebafbc82aa95" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "users_password"
        `);
    }

}
