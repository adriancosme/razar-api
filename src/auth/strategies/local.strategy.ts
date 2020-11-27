import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly _authService: AuthService) {
		super();
	}

	async validate(username: string, password: string) {
		const user = await this._authService.validateUser(username, password);
		if (!user) throw new UnauthorizedException('User or password do not match');
		return user;
	}
}