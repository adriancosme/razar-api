import { Module } from '@nestjs/common';
import { AuthAccessTokenService } from './auth-access-token.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthAccessTokenEntity } from "./entities/auth-access-token.entity";
import { AuthAccessTokenController } from "./auth-access-token.controller";

@Module({
	imports: [TypeOrmModule.forFeature([AuthAccessTokenEntity])],
	exports: [AuthAccessTokenService],
	providers: [AuthAccessTokenService],
	controllers: [AuthAccessTokenController]
})
export class AuthAccessTokenModule {
}
