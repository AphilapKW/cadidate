import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734530623522 implements MigrationInterface {
  name = 'Migration1734530623522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "change_logs" (
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP WITH TIME ZONE,
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "action" text NOT NULL,
            "title" text NOT NULL,
            "description" text NOT NULL,
            "status" text NOT NULL,
            "user_id" uuid,
            "candidates_id" uuid,
            CONSTRAINT "PK_62c55429d0fd1eca9cb304f4dea" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "comments" (
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP WITH TIME ZONE,
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "detail" text NOT NULL,
            "user_id" uuid,
            "candidates_id" uuid,
            CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "change_logs"
        ADD CONSTRAINT "FK_5c30fbe7e90909bbda237a0b7b5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "change_logs"
        ADD CONSTRAINT "FK_2a576f0495c8e9df8e220d7fe2d" FOREIGN KEY ("candidates_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "comments"
        ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "comments"
        ADD CONSTRAINT "FK_4b776b1e32302034603c23ce029" FOREIGN KEY ("candidates_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "comments" DROP CONSTRAINT "FK_4b776b1e32302034603c23ce029"
    `);
    await queryRunner.query(`
        ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"
    `);
    await queryRunner.query(`
        ALTER TABLE "change_logs" DROP CONSTRAINT "FK_2a576f0495c8e9df8e220d7fe2d"
    `);
    await queryRunner.query(`
        ALTER TABLE "change_logs" DROP CONSTRAINT "FK_5c30fbe7e90909bbda237a0b7b5"
    `);
    await queryRunner.query(`
        DROP TABLE "comments"
    `);
    await queryRunner.query(`
        DROP TABLE "change_logs"
    `);
  }
}
