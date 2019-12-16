import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Conversation } from '../models/conversation.entity';
import { User } from '../models/user.entity';
import { ConversationDto } from './dto/conversation.dto';

@Injectable()
export class ConversationService {
  @InjectRepository(Conversation) private readonly repo: Repository<Conversation>;

  public async findOrCreate(user1: User, user2: User): Promise<ConversationDto> {
    // TODO: Return conversations with unique users.
    // TODO: Conversations with more than two users
    let conversation = null;
    await this.findWithUniqueUsers(user1, user2);

    if (!conversation) {
      console.log('Creating new conversation!');
      conversation = new Conversation();
      conversation.users = [user1, user2];
      conversation = await this.repo.save(conversation);
    } else {
      console.log('Found existing conversation!');
      console.log(conversation);
    }

    return ConversationDto.fromEntity(conversation);
  }

  public async findWithUniqueUsers(user1: User, user2: User) {

    // if (conversationsWithUsers.length > 0) {
    //   const {conversationId} = conversationsWithUsers[0];
    //   return await this.repo.findOne(conversationId, {relations: ['users']});
    // }
  }
}
