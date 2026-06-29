import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPushNotifications1782736173063 implements MigrationInterface {
    name = 'AddPushNotifications1782736173063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "push_notifications" ("id" SERIAL NOT NULL, "template_id" character varying(150) NOT NULL, "template_name" character varying(250) NOT NULL, "body" text, "status" character varying(20) NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying(150), CONSTRAINT "UQ_push_template_id" UNIQUE ("template_id"), CONSTRAINT "PK_push_notifications" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "push_notifications"`);
    }

}
