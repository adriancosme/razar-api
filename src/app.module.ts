import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TYPEORM_CONFIG } from "./config/constants";
import databaseConfig from './config/database.config';
import * as Joi from '@hapi/joi';
import { AccessControlModule } from "nest-access-control";
import { roles } from "./app.roles";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG)
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig],
			envFilePath: `${ process.env.NODE_ENV || 'development' }.env`, // development.env
			validationSchema: Joi.object({
				NODE_ENV: Joi.string()
					.valid('development', 'production')
					.default('development')
			}),
		}),
		AccessControlModule.forRoles(roles),
		UserModule,
		AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
