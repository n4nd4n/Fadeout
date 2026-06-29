import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersAndEvents1781096726460 implements MigrationInterface {
  name = 'AddUsersAndEvents1781096726460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" BIGSERIAL PRIMARY KEY,
        "first_name" varchar(100) NOT NULL,
        "last_name" varchar(100) NOT NULL,
        "email" varchar(255) UNIQUE NOT NULL,
        "password" varchar(255) NOT NULL,
        "is_verified" boolean NOT NULL DEFAULT false,
        "is_active" boolean NOT NULL DEFAULT true,
        "verification_token" varchar(255) NULL,
        "verification_token_expires_at" timestamp NULL,
        "profile_image" varchar(500) NULL,
        "events_created" integer NOT NULL DEFAULT 0,
        "events_joined" integer NOT NULL DEFAULT 0,
        "deleted_reason" text NULL,
        "deleted_at" timestamp NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now()
      )
    `);

    // Create events table
    await queryRunner.query(`
      CREATE TABLE "events" (
        "id" BIGSERIAL PRIMARY KEY,
        "event_id" varchar(255) UNIQUE NOT NULL,
        "event_name" varchar(255) NOT NULL,
        "description" text NOT NULL,
        "host_name" varchar(255) NOT NULL,
        "start_date" timestamp NOT NULL,
        "expiry_date" timestamp NOT NULL,
        "status" varchar(50) NOT NULL,
        "total_invited" integer NOT NULL DEFAULT 0,
        "accepted_count" integer NOT NULL DEFAULT 0,
        "declined_count" integer NOT NULL DEFAULT 0,
        "pending_count" integer NOT NULL DEFAULT 0,
        "checked_in_count" integer NOT NULL DEFAULT 0,
        "location" varchar(255) NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp NULL,
        "created_by_user_id" bigint NOT NULL,
        "host_user_id" bigint NOT NULL,
        CONSTRAINT "FK_events_created_by" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_events_host" FOREIGN KEY ("host_user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    // Create event_participants table
    await queryRunner.query(`
      CREATE TABLE "event_participants" (
        "id" BIGSERIAL PRIMARY KEY,
        "event_id" bigint NOT NULL,
        "user_id" bigint NOT NULL,
        "user_name" varchar(255) NOT NULL,
        "email" varchar(255) NOT NULL,
        "rsvp_status" varchar(50) NOT NULL,
        "checked_in" boolean NOT NULL DEFAULT false,
        "rsvp_date" timestamp NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "FK_participants_event" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_participants_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    // Add indexes for performance
    await queryRunner.query(`CREATE INDEX "IDX_users_deleted_at" ON "users" ("deleted_at") WHERE "deleted_at" IS NULL`);
    await queryRunner.query(`CREATE INDEX "IDX_events_deleted_at" ON "events" ("deleted_at") WHERE "deleted_at" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_events_deleted_at"`);
    await queryRunner.query(`DROP INDEX "IDX_users_deleted_at"`);
    await queryRunner.query(`DROP TABLE "event_participants"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
