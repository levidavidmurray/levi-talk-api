import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Conversation } from './conversation.entity';

@Entity({ name: 'conversation_user_links' })
export class ConversationUserLink extends BaseEntity {

  @OneToOne(type => User)
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToOne(type => Conversation)
  @JoinColumn({name: 'conversation_id'})
  conversation: Conversation;
}
