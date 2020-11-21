import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'public' })
export class User {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    username: string

    @Column({ type: 'varchar', length: 70, nullable: false })
    password: string

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compareSync(password, this.password);
    }

    constructor(id: number, name: string, pass: string) {
        this.id = id;
        this.username = name;
        this.password = pass;
    }
}