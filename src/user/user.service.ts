import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
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
}
