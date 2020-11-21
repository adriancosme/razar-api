import { Injectable } from "@nestjs/common";
import { UserDTO } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserMapper {

    dtoToEntity(userDTO: UserDTO): User {
        return new User(userDTO.id, userDTO.username, 'test');
    }

    entityToDto(User: User): UserDTO {
        return new UserDTO(User.id, User.username);
    }

}
