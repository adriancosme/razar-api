import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AuthAccessTokenEntity } from "./entities/auth-access-token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthAccessTokenService extends TypeOrmCrudService<AuthAccessTokenEntity> {
	constructor(@InjectRepository(AuthAccessTokenEntity) readonly _authRepository: Repository<AuthAccessTokenEntity>) {
		super(_authRepository);
	}

	async saveToken(data: Partial<AuthAccessTokenEntity>) {
		let token: AuthAccessTokenEntity;
		token = { ...data } as AuthAccessTokenEntity;
		return await this._authRepository.save(token);
	}

	async findToken(token: string) {
		return await this._authRepository.findOne({
			where: {
				jwt: token,
			},
		});
	}
}
