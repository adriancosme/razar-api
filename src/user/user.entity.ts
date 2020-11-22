import * as bcrypt from 'bcrypt';
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'public' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;

    @Column({ type: 'varchar', length: 25, unique: true, nullable: false })
    username: string

    @Column({ type: 'char', length: 60, nullable: false })
    password: string

    @Column({ type: 'timestamp', name: 'created_at' })
    created_at: Date;

    @Column({ type: 'timestamp', name: 'updated_at' })
    updated_at: Date;
}