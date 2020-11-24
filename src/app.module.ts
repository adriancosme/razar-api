import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {ConfigModule} from './config/config.module';
import {DatabaseModule} from "./database/database.module";
import { AuthModule } from './auth/auth.module';
import { AuthAccessTokenController } from './auth-access-token/auth-access-token.controller';
import { AuthAccessTokenModule } from './auth-access-token/auth-access-token.module';

@Module({
    imports: [ConfigModule, DatabaseModule, UserModule, AuthModule, AuthAccessTokenModule],
    controllers: [AppController, AuthAccessTokenController],
    providers: [AppService],
})
export class AppModule {
}
