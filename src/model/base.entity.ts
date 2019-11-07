import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'timestamptz', nullable: true, name: 'deleted_at' })
    deletedAt: Date;
}
