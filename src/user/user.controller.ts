import { Body, Controller, Post, Res } from '@nestjs/common';
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { Crud, CrudController } from '@nestjsx/crud';
import { Response } from "express";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";


@Crud({
	model: {
		type: User
	}
})
@Controller('users')
export class UserController implements CrudController<User> {
	constructor(readonly service: UserService) {
	}

	@Post('store')
	public async createNewUser(@Body() userBody: Partial<User>, @Res() res: Response) {
		try {
			const { username } = userBody;
			const user: User | undefined = await this.service.findOne({ username })
			if (user) {
				res.status(401)
				res.send({ msg: 'User exist' })
			} else {
				const result = await this.service.save(await this.service.create(userBody))
				res.send(result)
			}
		} catch (e) {
			res.status(401)
			res.send(e);
		}
	}

	@Post('update-password')
	public async updatePassword(@Body() userBody: UpdatePasswordDto, @Res() res: Response) {
		try {
			const { id } = userBody;
			const user: User | undefined = await this.service.findOne({ id })
			if (user) {
				const result = await this.service.save(await this.service.changePassword(userBody));
				res.send(result)
			} else {
				res.status(401)
				res.send({ msg: 'user do not exist' })
			}
		} catch (e) {
			res.status(401)
			res.send(e)
		}
	}
}