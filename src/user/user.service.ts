import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { hash } from "bcrypt";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
	constructor(
		@InjectRepository(User)
		private readonly _userRepository: Repository<User>,
	) {
		super(_userRepository)
	}

	public async create(user: Partial<User>): Promise<User> {
		user.password = await hash(user.password, 8);
		return this._userRepository.create({ ...user });
	}

	public async changePassword(user: UpdatePasswordDto): Promise<User> {
		user.password = await hash(user.password, 8);
		return this._userRepository.create({ ...user });
	}

	public async save(user: User): Promise<User> {
		return this._userRepository.save(user);
	}
}
