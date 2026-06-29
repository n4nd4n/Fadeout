import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class ReplaceUsersWithAdmins1781096726459 implements MigrationInterface {
    name = 'ReplaceUsersWithAdmins1781096726459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop existing foreign key constraints
        await queryRunner.query(`ALTER TABLE "password_reset_otps" DROP CONSTRAINT "FK_af2bd00dd6eef12fe6c3a150f0a"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);

        // Clear existing data from child tables to avoid foreign key issues
        await queryRunner.query(`DELETE FROM "password_reset_otps"`);
        await queryRunner.query(`DELETE FROM "refresh_tokens"`);

        // Drop the users table
        await queryRunner.query(`DROP TABLE "users"`);

        // Create the admins table with role and status columns
        await queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'Admin', "status" character varying NOT NULL DEFAULT 'Active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_admins_email" UNIQUE ("email"), CONSTRAINT "PK_admins" PRIMARY KEY ("id"))`);

        // Update refresh_tokens table to use adminId instead of userId
        await queryRunner.query(`ALTER TABLE "refresh_tokens" RENAME COLUMN "userId" TO "adminId"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_refresh_tokens_admin" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        // Update password_reset_otps table to use adminId instead of userId
        await queryRunner.query(`ALTER TABLE "password_reset_otps" RENAME COLUMN "userId" TO "adminId"`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" ADD CONSTRAINT "FK_password_reset_otps_admin" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        // Insert default admin seed data
        const hashedPassword = await bcrypt.hash('Admin@123', 10);
        await queryRunner.query(`
            INSERT INTO "admins" ("email", "password", "fullName", "role", "status")
            VALUES ('admin@fadeout.com', '${hashedPassword}', 'HB Admin', 'Super Admin', 'Active')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "password_reset_otps" DROP CONSTRAINT "FK_password_reset_otps_admin"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_refresh_tokens_admin"`);

        // Revert column names
        await queryRunner.query(`ALTER TABLE "password_reset_otps" RENAME COLUMN "adminId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" RENAME COLUMN "adminId" TO "userId"`);

        // Drop the admins table
        await queryRunner.query(`DROP TABLE "admins"`);

        // Recreate the users table
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);

        // Recreate foreign key constraints
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" ADD CONSTRAINT "FK_af2bd00dd6eef12fe6c3a150f0a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
