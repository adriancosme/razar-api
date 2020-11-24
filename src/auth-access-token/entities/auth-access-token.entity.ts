import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('oauth-access-token', {schema: 'public'})
export class AuthAccessTokenEntity extends BaseEntity {
	@PrimaryColumn('int')
	idToken: number;

	@Column('int', {
		nullable: true,
		name: 'user_id',
	})
	userId: number | null;

	@Column('int', {
		nullable: false,
		name: 'client_id',
	})
	clientId: number;

	@Column('varchar', {
		nullable: true,
		name: 'name',
	})
	name: string | null;

	@Column('text', {
		nullable: true,
		name: 'scopes',
	})
	scopes: string | null;

	@Column('smallint', {
		nullable: false,
		width: 1,
		name: 'revoked',
	})
	revoked: boolean;

	@Column({
		type: 'text',
		nullable: false,
	})
	jwt: string;

	@Column({
		type: 'boolean',
		nullable: false,
	})
	isActive: boolean;

	@Column('smallint', {
		nullable: false,
		width: 1,
		name: 'refresh',
	})
	refresh: boolean;

	@Column('timestamp', {
		nullable: true,
		name: 'expires_at',
	})
	expiresAt: Date | null;
}