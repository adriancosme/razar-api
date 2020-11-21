import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const config = {
    host: 'localhost',
    port: 5432,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
}

const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: config.host,
    port: Number(config.port),
    username: config.user,
    password: config.password,
    database: config.database,
    entities: [
        join(__dirname, '../models/*{.ts,.js}'),
    ],
    synchronize: false,
    dropSchema: false,
    migrationsRun: true,
    logging: true,
    migrations: [
        join(__dirname, 'migrations/*{.ts,.js}')
    ],
    cli: {
        migrationsDir: 'src/database/migrations'
    }
}

export = connectionOptions;