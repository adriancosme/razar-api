import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersRepository {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private mapper: UserMapper) { }

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    getUserById(id: number): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    newUser(userDTO: UserDTO): Promise<User> {
        const newUser = this.mapper.dtoToEntity(userDTO);
        return this.usersRepository.save(newUser);
    }

    async updateUser(id: number, userDTO: UserDTO): Promise<User> {
        const updateUser = this.mapper.dtoToEntity(userDTO);
        await this.usersRepository.update(id, updateUser);
        return this.usersRepository.findOne(id);

    }

    deleteUser(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }

    getUserByName(username: string): Promise<User> {
        return this.usersRepository.findOne({ username });
    }
}
