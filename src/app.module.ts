import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    DatabaseModule,
    /* AuthModule */],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
