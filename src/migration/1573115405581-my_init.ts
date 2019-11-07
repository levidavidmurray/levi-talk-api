import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1573115405581 implements MigrationInterface {
    name = 'myInit1573115405581'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deletedAt" TIMESTAMP WITH TIME ZONE, "confirmedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmedAt" TIMESTAMP WITH TIME ZONE`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmed_at" TIMESTAMP WITH TIME ZONE`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmation_pin" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(16) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmation_pin"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmed_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmedAt" TIMESTAMP WITH TIME ZONE`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
