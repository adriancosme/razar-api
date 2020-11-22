import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from 'src/shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mapperService: MapperService
    ) { }

    async get(id: number): Promise<UserDto> {
        if (!id) {
            throw new BadRequestException('id must be sent');
        }
        const user: User = await this._userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException()
        }

        return this._mapperService.map<User, UserDto>(user, new UserDto());
    }

    async create(user: User): Promise<UserDto> {
        const savedUser = await this._userRepository.save(user);
        return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
    }
}
