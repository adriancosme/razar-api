import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { UserMapper } from './user.mapper';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(
        private usersRepository: UsersRepository,
        private mapper: UserMapper
    ) { }

    async getAllUsers(): Promise<UserDTO[]> {
        const users: User[] = await this.usersRepository.getAllUsers()
        return users.map(user => this.mapper.entityToDto(user));
    }

    async getUserById(id: number): Promise<UserDTO> {
        const user: User = await this.usersRepository.getUserById(id);
        return this.mapper.entityToDto(user);
    }

    async newUser(userDTO: UserDTO): Promise<UserDTO> {
        const newUser: User = await this.usersRepository.newUser(userDTO);
        return this.mapper.entityToDto(newUser);
    }

    async updateUser(id: number, userDTO: UserDTO): Promise<UserDTO> {
        const updateUser = await this.usersRepository.updateUser(id, userDTO);
        return this.mapper.entityToDto(updateUser);
    }

    async deleteUser(id: number): Promise<void> {
        await this.usersRepository.deleteUser(id);
    }

    async getUserByName(username: string): Promise<User> {
        return await this.usersRepository.getUserByName(username);
    }
}
