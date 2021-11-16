import {MigrationInterface, QueryRunner} from 'typeorm';

export class places1636918569656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION cube');
    await queryRunner.query('CREATE EXTENSION earthdistance');

    await queryRunner.query(`
      CREATE table places (
        id SERIAL PRIMARY KEY,
        resource_id int NOT NULL,
        name VARCHAR(50) NOT NULL,
        lat DOUBLE PRECISION NOT NULL,
        lng DOUBLE PRECISION NOT NULL
      )
    `);

    await queryRunner.query('CREATE INDEX places_name_low_index ON places USING btree(lower((name)::text))');
    await queryRunner.query('CREATE INDEX places_index ON places USING gist (ll_to_earth(lat, lng))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP EXTENSION cube CASCADE');
    await queryRunner.query('DROP TABLE places');
  }
}
