import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'geolocation-pg',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'places',
  entities: [join(__dirname, 'entities/*{.ts,.js}')],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  // migrationsRun: true,
  logging: ['warn', 'error'],
  // logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;