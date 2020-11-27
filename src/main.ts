import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SERVER_PORT } from "./config/constants";
import { initSwagger } from "./app.swagger";
import generateTypeormConfigFile from "./scripts/generate-typeorm-config-file";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const logger = new Logger('Bootstrap');
	const config = app.get(ConfigService);
	const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000

	initSwagger(app);
	generateTypeormConfigFile(config);

	app.setGlobalPrefix('api');
	await app.listen(port);
	logger.log(`Server is running at ${ await app.getUrl() }`);
}

bootstrap();
