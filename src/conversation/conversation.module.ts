import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { Conversation } from '../models/conversation.entity';
import { ConversationService } from './conversation.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UserModule],
  providers: [ConversationService],
  exports: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
