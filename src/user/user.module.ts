import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SharedModule} from 'src/shared/shared.module';
import {UserService} from './user.service';
import {UserController} from "./user.controller";
import {User} from "./entities/user.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User]), SharedModule],
	providers: [UserService],
	controllers: [UserController]
})
export class UserModule {
}