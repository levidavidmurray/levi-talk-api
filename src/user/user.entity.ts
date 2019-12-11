import {Column, Entity, Unique} from 'typeorm';
import {BaseEntity} from './base.entity';
import {randomInt} from '../../lib/util/randomInt';

@Entity({ name: 'users' })
@Unique(['displayName', 'talkId'])
export class User extends BaseEntity {
    @Column({ type: 'timestamptz', nullable: true })
    confirmedAt: Date;

    @Column({ type: 'int', nullable: true})
    confirmationPin: number;

    @Column({ type: 'varchar', length: 16, unique: true })
    phone: string;

    @Column({ type: 'int' })
    talkId: number = randomInt(4);

    @Column({ type: 'varchar', length: 64, default: 'User' })
    displayName: string;

    public validatePin(pin: number): boolean {
        const isValid = this.confirmationPin === pin;

        if (isValid) {
            this.confirmedAt = new Date();
            this.confirmationPin = null;
        }

        return isValid;
    }
}
