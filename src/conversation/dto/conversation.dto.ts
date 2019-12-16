import { UserDto } from '../../user/user.dto';
import { Conversation } from '../../models/conversation.entity';
import { User } from '../../models/user.entity';

export class ConversationDto implements Readonly<ConversationDto> {

  id: string;

  createdAt: Date;

  users: UserDto[];

  public static from(dto: Partial<ConversationDto>): ConversationDto {
    const conversation = new ConversationDto();

    conversation.id = dto.id;
    conversation.createdAt = dto.createdAt;
    conversation.users = dto.users;

    return conversation;
  }

  public static fromEntity(conversation: Conversation) {
    return this.from({
      id: conversation.id,
      createdAt: conversation.createdAt,
      users: conversation.users.map((user: User) => UserDto.fromEntity(user)),
    });
  }
}
