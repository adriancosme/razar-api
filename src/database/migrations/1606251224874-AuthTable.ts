import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AuthTable1606251224874 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table(
			{
				name: 'oauth-access-token',
				columns: [
					{ name: 'id', type: 'int', isPrimary: true },
					{ name: 'user_id', type: 'int', isNullable: true },
					{ name: 'client_id', type: 'int', isNullable: false },
					{ name: 'name', type: 'varchar', isNullable: true },
					{ name: 'scopes', type: 'text', isNullable: true },
					{ name: 'revoked', type: 'smallint', isNullable: false },
					{ name: 'jwt', type: 'text', isNullable: false },
					{ name: 'is_active', type: 'boolean', isNullable: false },
					{ name: 'refresh', type: 'smallint', isNullable: false },
					{ name: 'expires_at', type: 'timestamp', isNullable: true },
					{ name: 'created_at', type: 'timestamp', isNullable: true },
					{ name: 'update_at', type: 'timestamp', isNullable: true },
				]
			}
		))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query('DROP TABLE "oauth-access-token"')
	}

}
