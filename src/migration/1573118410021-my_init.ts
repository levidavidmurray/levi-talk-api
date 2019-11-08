import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1573118410021 implements MigrationInterface {
    name = 'myInit1573118410021'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deletedAt" TIMESTAMP WITH TIME ZONE, "confirmedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmationPin" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(16) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmationPin"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
