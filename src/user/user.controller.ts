import { Controller } from '@nestjs/common';
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { Crud, CrudController } from '@nestjsx/crud';


@Crud({
	model: {
		type: User
	}
})
@Controller('users')
export class UserController implements CrudController<User> {
	constructor(readonly service: UserService) {
	}

}