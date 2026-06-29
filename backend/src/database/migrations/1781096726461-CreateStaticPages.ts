import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStaticPages1781096726461 implements MigrationInterface {
  name = 'CreateStaticPages1781096726461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "static_pages" (
        "id" BIGSERIAL PRIMARY KEY,
        "page_name" varchar(150) NOT NULL,
        "slug" varchar(150) UNIQUE NOT NULL,
        "content" text NOT NULL,
        "status" varchar(20) NOT NULL DEFAULT 'active',
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "updated_by" varchar(150) NULL
      )
    `);

    // Seed the four pages
    await queryRunner.query(`
      INSERT INTO "static_pages" ("page_name", "slug", "content", "status", "updated_by")
      VALUES 
        ('About Fadeout', 'about-fadeout', '<h1>About Fadeout</h1><p>Welcome to Fadeout.</p>', 'active', 'System'),
        ('Terms and Conditions', 'terms-and-conditions', '<h1>Terms & Conditions</h1><p>Our terms and conditions.</p>', 'active', 'System'),
        ('Delete Account', 'delete-account', '<h1>Delete Account</h1><p>Instructions to delete account.</p>', 'active', 'System'),
        ('Privacy Policy', 'privacy-policy', '<h1>Privacy Policy</h1><p>Our privacy policy.</p>', 'active', 'System')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "static_pages"`);
  }
}
