import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSystemNotifications1782735973063 implements MigrationInterface {
    name = 'AddSystemNotifications1782735973063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "system_notifications" ("id" SERIAL NOT NULL, "template_id" character varying(150) NOT NULL, "template_code" character varying(150) NOT NULL, "template_title" character varying(250) NOT NULL, "body" text, "status" character varying(20) NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying(150), CONSTRAINT "UQ_2156084d0a4ca736b4ee233ebab" UNIQUE ("template_id"), CONSTRAINT "UQ_b1a6e0d1347579ab97fdc83096c" UNIQUE ("template_code"), CONSTRAINT "PK_2251866d2c48c1ff710e9fd444d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "system_notifications"`);
    }

}
