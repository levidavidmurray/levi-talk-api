import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import { ConversationController } from './conversation/conversation.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      UserModule,
      AuthModule,
  ],
  controllers: [AppController, ConversationController],
  providers: [AppService],
})
export class AppModule {}
