import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734537737026 implements MigrationInterface {
  name = 'Migration1734537737026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "candidates"
        ADD "is_saved" boolean NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "candidates" DROP COLUMN "is_saved"
    `);
  }
}
