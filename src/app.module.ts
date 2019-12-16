import * as process from 'process';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { getMetadataArgsStorage } from 'typeorm';
import { ConversationModule } from './conversation/conversation.module';

const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD;

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username,
        password,
        database: 'levi_chat',
        entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
        synchronize: false,
      }),
      UserModule,
      AuthModule,
      ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
