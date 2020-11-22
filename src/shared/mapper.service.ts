import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.entity';
import { TypeMapper } from 'ts-mapper';
@Injectable()
export class MapperService extends TypeMapper {
    constructor() {
        super();
        this.config();
    }
    private config() {
        this.createMap<User, UserDto>()
            .map(entity => entity.id, dto => dto.id)
            .map(entity => entity.username, dto => dto.username)
    }
}
