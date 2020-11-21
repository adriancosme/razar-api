import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<boolean> {
        const user = await this.usersService.getUserByName(username);
        return await user.validatePassword(pass);
    }

    async generateAccessToken(username: string) {
        const user = await this.usersService.getUserByName(username);
        const payload: JWTPayload = { id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
