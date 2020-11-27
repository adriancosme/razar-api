import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from "./guards";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { Auth, User } from "../common/decorators";
import { User as UserEntity } from "../user/entities/user.entity";

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Body() loginDto: LoginDto, @User() user: UserEntity) {
		const data = await this.authService.login(user);
		return {
			message: 'Login exitoso',
			data,
		};
	}

	@Auth()
	@Get()
	refreshToken(@User() user: UserEntity) {
		const data = this.authService.login(user);
		return {
			message: 'Refresh exitoso',
			data,
		};
	}


}
