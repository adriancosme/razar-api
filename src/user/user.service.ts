import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {hash} from "bcrypt";
import {UpdatePasswordDto} from "./dto/updatePassword.dto";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
	constructor(
		@InjectRepository(User)
		private readonly _userRepository: Repository<User>,
	) {
		super(_userRepository)
	}

	async getAll(): Promise<User[]> {
		const users: User[] = await this._userRepository.find();
		return users;
	}

	async get(id: number): Promise<User> {
		if (!id) {
			throw new BadRequestException('id must be sent');
		}
		const user: User = await this._userRepository.findOne(id);
		if (!user) {
			throw new NotFoundException()
		}

		return user
	}

	public async create(user: Partial<User>): Promise<User> {
		user.password = await hash(user.password, 8);
		return this._userRepository.create({...user});
	}

	public async changePassword(user: UpdatePasswordDto): Promise<User> {
		user.password = await hash(user.password, 8);
		return this._userRepository.create({...user});
	}

	public async save(user: User): Promise<User> {
		return this._userRepository.save(user);
	}
}
