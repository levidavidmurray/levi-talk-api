import { Entity, JoinTable, JoinTableOptions, ManyToMany } from 'typeorm';
import {BaseEntity} from './base.entity';
import { User } from './user.entity';

export const userJoinOpts: JoinTableOptions = {
  name: 'conversation_user_links',
  joinColumn: {
    name: 'conversation_id',
    referencedColumnName: 'id',
  },
  inverseJoinColumn: {
    name: 'user_id',
    referencedColumnName: 'id',
  },
};

@Entity({ name: 'conversations' })
export class Conversation extends BaseEntity {

  // TODO: fix ConversationUserLink ORM relational join objects
  @ManyToMany(
    type => User,
    user => user.conversations,
  )
  users: User[];

}
