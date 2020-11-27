import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm';
import { hash } from "bcrypt";

@Entity('user', { schema: 'public' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn({ name: 'id', type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 25, unique: true, nullable: false })
	username: string

	@Column({ type: 'char', length: 60, nullable: false })
	password: string

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		if (!this.password) {
			return;
		}
		this.password = await hash(this.password, 10);
	}
}