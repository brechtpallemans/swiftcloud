import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialModel1731049522263 implements MigrationInterface {
  name = 'InitialModel1731049522263'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "title" text NOT NULL, "release_year" smallint NOT NULL, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "songs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "title" text NOT NULL, "release_year" smallint NOT NULL, "album_id" uuid, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_944f44ec5e875219d05bb81d96" ON "songs" ("album_id") `
    )
    await queryRunner.query(
      `CREATE TABLE "song_monthly_stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "year" smallint NOT NULL, "month" smallint NOT NULL, "total_plays" bigint NOT NULL, "song_id" uuid NOT NULL, CONSTRAINT "PK_b8922d65290daa8a45143c4c209" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_c5b8952439a4bbeb4263c4b0ef" ON "song_monthly_stats" ("song_id") `
    )
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."song_artist_type" AS ENUM('ARTIST', 'WRITER', 'FEATURED')`
    )
    await queryRunner.query(
      `CREATE TABLE "song_artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "type" "public"."song_artist_type" NOT NULL, "song_id" uuid NOT NULL, "artist_id" uuid NOT NULL, CONSTRAINT "PK_218e5e321c8d1e535a899d8c905" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_27328aace6a250c617758ec40f" ON "song_artists" ("song_id") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_27428f0968b4e44679a4db3116" ON "song_artists" ("artist_id") `
    )
    await queryRunner.query(
      `ALTER TABLE "songs" ADD CONSTRAINT "FK_944f44ec5e875219d05bb81d966" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "song_monthly_stats" ADD CONSTRAINT "FK_c5b8952439a4bbeb4263c4b0efa" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "song_artists" ADD CONSTRAINT "FK_27328aace6a250c617758ec40f7" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "song_artists" ADD CONSTRAINT "FK_27428f0968b4e44679a4db31161" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "song_artists" DROP CONSTRAINT "FK_27428f0968b4e44679a4db31161"`
    )
    await queryRunner.query(
      `ALTER TABLE "song_artists" DROP CONSTRAINT "FK_27328aace6a250c617758ec40f7"`
    )
    await queryRunner.query(
      `ALTER TABLE "song_monthly_stats" DROP CONSTRAINT "FK_c5b8952439a4bbeb4263c4b0efa"`
    )
    await queryRunner.query(
      `ALTER TABLE "songs" DROP CONSTRAINT "FK_944f44ec5e875219d05bb81d966"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_27428f0968b4e44679a4db3116"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_27328aace6a250c617758ec40f"`
    )
    await queryRunner.query(`DROP TABLE "song_artists"`)
    await queryRunner.query(`DROP TYPE "public"."song_artist_type"`)
    await queryRunner.query(`DROP TABLE "artists"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c5b8952439a4bbeb4263c4b0ef"`
    )
    await queryRunner.query(`DROP TABLE "song_monthly_stats"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_944f44ec5e875219d05bb81d96"`
    )
    await queryRunner.query(`DROP TABLE "songs"`)
    await queryRunner.query(`DROP TABLE "albums"`)
  }
}
