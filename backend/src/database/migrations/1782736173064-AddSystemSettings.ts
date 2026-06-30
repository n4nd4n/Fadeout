import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSystemSettings1782736173064 implements MigrationInterface {
    name = 'AddSystemSettings1782736173064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "system_settings" (
                "id" SERIAL NOT NULL, 
                "company_name" character varying(150) NOT NULL, 
                "max_login_attempts" integer NOT NULL, 
                "session_timeout_minutes" integer NOT NULL, 
                "copyright_text" character varying(200) NOT NULL, 
                "android_app_version" character varying(32) NOT NULL, 
                "android_force_update" boolean NOT NULL DEFAULT false, 
                "ios_app_version" character varying(32) NOT NULL, 
                "ios_force_update" boolean NOT NULL DEFAULT false, 
                "logo_path" character varying(500), 
                "favicon_path" character varying(500), 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "PK_system_settings" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "system_settings"`);
    }
}
