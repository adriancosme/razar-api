import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService) {
	}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.userService.findOne({ username });
		if (user && (await compareSync(password, user.password))) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: User) {
		const { id } = user;
		const payload = { sub: id };
		return {
			user,
			accessToken: this.jwtService.sign(payload),
		};
	}
}
