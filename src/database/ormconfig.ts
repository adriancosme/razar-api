import {ConnectionOptions} from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const environment = process.env.NODE_ENV || 'development';
const processEnv: any = dotenv.parse(fs.readFileSync(`${environment}.env`));

const config: ConnectionOptions = {
    type: 'postgres',
    migrationsTableName: 'migrations_typeorm',
    host: processEnv.DB_HOST,
    port: processEnv.DB_PORT,
    username: processEnv.DB_USERNAME,
    password: processEnv.DB_PASSWORD,
    database: processEnv.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    // We are using migrations, synchronize should be set to false.
    synchronize: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: false,
    logging: 'all',
    logger: 'simple-console',

    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        // Location of migration should be inside src folder
        // to be compiled into dist/ folder.
        migrationsDir: 'src/migrations',
        entitiesDir: 'src/entity',
        subscribersDir: 'src/subscriber',
    },
};

export = config;