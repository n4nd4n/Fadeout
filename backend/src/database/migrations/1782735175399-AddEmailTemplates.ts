import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailTemplates1782735175399 implements MigrationInterface {
    name = 'AddEmailTemplates1782735175399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_participants_event"`);
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_participants_user"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_events_created_by"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_events_host"`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" DROP CONSTRAINT "FK_password_reset_otps_admin"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_refresh_tokens_admin"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_events_deleted_at"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_users_deleted_at"`);
        await queryRunner.query(`CREATE TABLE "email_templates" ("id" SERIAL NOT NULL, "template_id" character varying(150) NOT NULL, "template_name" character varying(250) NOT NULL, "subject" character varying(250), "body" text, "status" character varying(20) NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying(150), CONSTRAINT "UQ_7df8a0c6b71357f6a622aad4899" UNIQUE ("template_id"), CONSTRAINT "PK_06c564c515d8cdb40b6f3bfbbb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "static_pages" DROP CONSTRAINT "static_pages_pkey"`);
        await queryRunner.query(`ALTER TABLE "static_pages" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "static_pages" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "static_pages" ADD CONSTRAINT "PK_51d5188719a3fb65679933415ad" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."admins_role_enum" AS ENUM('Super Admin', 'Admin', 'Editor')`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "role" "public"."admins_role_enum" NOT NULL DEFAULT 'Admin'`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."admins_status_enum" AS ENUM('Active', 'Inactive')`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "status" "public"."admins_status_enum" NOT NULL DEFAULT 'Active'`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_b5349807aae71193d0cc0f52e35" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_ce3f433e47fdd8f072964293c8d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_4de454469562c4a5ecefcfc2019" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_7b3720a0e6d8710ec5ee8a65606" FOREIGN KEY ("host_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" ADD CONSTRAINT "FK_006342facfade989bcf860277c6" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_766ab81fa68d15204df19f83370" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_766ab81fa68d15204df19f83370"`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" DROP CONSTRAINT "FK_006342facfade989bcf860277c6"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_7b3720a0e6d8710ec5ee8a65606"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_4de454469562c4a5ecefcfc2019"`);
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_ce3f433e47fdd8f072964293c8d"`);
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_b5349807aae71193d0cc0f52e35"`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."admins_status_enum"`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "status" character varying NOT NULL DEFAULT 'Active'`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."admins_role_enum"`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "role" character varying NOT NULL DEFAULT 'Admin'`);
        await queryRunner.query(`ALTER TABLE "static_pages" DROP CONSTRAINT "PK_51d5188719a3fb65679933415ad"`);
        await queryRunner.query(`ALTER TABLE "static_pages" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "static_pages" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "static_pages" ADD CONSTRAINT "static_pages_pkey" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "email_templates"`);
        await queryRunner.query(`CREATE INDEX "IDX_users_deleted_at" ON "users" ("deleted_at") WHERE (deleted_at IS NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_events_deleted_at" ON "events" ("deleted_at") WHERE (deleted_at IS NULL)`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_refresh_tokens_admin" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password_reset_otps" ADD CONSTRAINT "FK_password_reset_otps_admin" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_events_host" FOREIGN KEY ("host_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_events_created_by" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_participants_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_participants_event" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
