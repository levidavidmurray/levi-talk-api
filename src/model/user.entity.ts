import {Column, Entity} from 'typeorm';
import {BaseEntity} from './base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column({ type: 'timestamptz', nullable: true })
    confirmedAt: Date;

    @Column({ type: 'int', nullable: true})
    confirmationPin: number;

    @Column({ type: 'varchar', length: 16, unique: true })
    phone: string;

    public validatePin(pin: number): boolean {
        const isValid = this.confirmationPin === pin;

        if (isValid) {
            this.confirmedAt = new Date();
            this.confirmationPin = null;
        }

        return isValid;
    }
}
