import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1576470457436 implements MigrationInterface {
    name = 'myInit1576470457436'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "conversation_user_links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid, "conversation_id" uuid, CONSTRAINT "REL_d25e9cbcf25a17d91e6d90d086" UNIQUE ("user_id"), CONSTRAINT "REL_e196c310b764f3331ac45a3e08" UNIQUE ("conversation_id"), CONSTRAINT "PK_fbdc58dccfad0b4954d0853bc6c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP WITH TIME ZONE, "confirmed_at" TIMESTAMP WITH TIME ZONE, "confirmation_pin" integer, "phone" character varying(16) NOT NULL, "talk_id" integer NOT NULL, "display_name" character varying(64) NOT NULL DEFAULT 'User', CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_45d43ce2d93a8001aed79eb7724" UNIQUE ("display_name", "talk_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation_user_links" ADD CONSTRAINT "FK_d25e9cbcf25a17d91e6d90d0869" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation_user_links" ADD CONSTRAINT "FK_e196c310b764f3331ac45a3e087" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "conversation_user_links" DROP CONSTRAINT "FK_e196c310b764f3331ac45a3e087"`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation_user_links" DROP CONSTRAINT "FK_d25e9cbcf25a17d91e6d90d0869"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_775abbf0fb7a65044bbe62668c8"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "displayName"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "talkId"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmationPin"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "display_name"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "talk_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmation_pin"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmed_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "display_name" character varying(64) NOT NULL DEFAULT 'User'`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "talk_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmation_pin" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmed_at" TIMESTAMP WITH TIME ZONE`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`DROP TABLE "conversations"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "conversation_user_links"`, undefined);
    }

}
