import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const processEnv: any = dotenv.parse(fs.readFileSync('.env'));

const config: ConnectionOptions = {
	type: 'postgres',
	migrationsTableName: 'migrations_typeorm',
	host: processEnv.DB_HOST,
	port: processEnv.DB_PORT,
	username: processEnv.DB_USERNAME,
	password: processEnv.DB_PASSWORD,
	database: processEnv.DB_NAME,
	entities: [__dirname + '/../**/*.entity{.ts,.js}'],

	// We are using migrations, synchronize should be set to false.
	synchronize: false,

	// Run migrations automatically,
	// you can disable this if you prefer running migration manually.
	migrationsRun: false,

	// Allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev.
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
	cli: {
		migrationsDir: 'src/database/migrations'
	}
};
export = config;