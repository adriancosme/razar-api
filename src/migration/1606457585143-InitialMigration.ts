import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1606457585143 implements MigrationInterface {
    name = 'InitialMigration1606457585143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."user" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "password" character(60) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE ("username"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."user"`);
    }

}
