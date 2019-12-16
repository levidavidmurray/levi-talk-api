import { Column, Entity, JoinTable, JoinTableOptions, ManyToMany, OneToMany, Unique } from 'typeorm';
import {BaseEntity} from './base.entity';
import {randomInt} from '../../lib/util/randomInt';
import { Conversation } from './conversation.entity';
import { ConversationUserLink } from './conversationUserLink.entity';

export const conversationJoinOpts: JoinTableOptions = {
    name: 'conversation_user_link',
    joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
    },
    inverseJoinColumn: {
        name: 'conversation_id',
        referencedColumnName: 'id',
    },
};

@Entity({ name: 'users' })
@Unique(['displayName', 'talkId'])
export class User extends BaseEntity {
    @Column({ name: 'confirmed_at', type: 'timestamptz', nullable: true })
    confirmedAt: Date;

    @Column({ name: 'confirmation_pin', type: 'int', nullable: true })
    confirmationPin: number;

    @Column({ name: 'phone', type: 'varchar', length: 16, unique: true })
    phone: string;

    @Column({ name: 'talk_id', type: 'int' })
    talkId: number = randomInt(4);

    @Column({ name: 'display_name', type: 'varchar', length: 64, default: 'User' })
    displayName: string;

    @ManyToMany(type => Conversation, convo => convo.users)
    conversations: Conversation[];

    @OneToMany(type => ConversationUserLink, cul => cul.user)
    conversationUserLinks: ConversationUserLink[];

    public validatePin(pin: number): boolean {
        const isValid = this.confirmationPin === pin;

        if (isValid) {
            this.confirmedAt = new Date();
            this.confirmationPin = null;
        }

        return isValid;
    }
}
