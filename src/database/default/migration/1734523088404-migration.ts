import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734523088404 implements MigrationInterface {
  name = 'Migration1734523088404';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP WITH TIME ZONE,
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "email" character varying NOT NULL,
            "username" character varying NOT NULL,
            "password" character varying NOT NULL,
            CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "candidates" (
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP WITH TIME ZONE,
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" text NOT NULL,
            "description" text NOT NULL,
            "status" text NOT NULL,
            "user_id" uuid,
            CONSTRAINT "PK_140681296bf033ab1eb95288abb" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "candidates"
        ADD CONSTRAINT "FK_94a5fe85e7f5bd0221fa7d6f19c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "candidates" DROP CONSTRAINT "FK_94a5fe85e7f5bd0221fa7d6f19c"
    `);
    await queryRunner.query(`
        DROP TABLE "candidates"
    `);
    await queryRunner.query(`
        DROP TABLE "users"
    `);
  }
}
