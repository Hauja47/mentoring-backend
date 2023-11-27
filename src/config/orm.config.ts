import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs(
  'ormConfig',
  () =>
    ({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT as string, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*.js'],
    }) as DataSourceOptions,
);
