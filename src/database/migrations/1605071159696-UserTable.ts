import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class UserTable1605071159696 implements MigrationInterface {
    name = 'UserTable1605071159696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                { name: 'id', type: 'int', isPrimary: true },
                { name: 'username', type: 'varchar' },
                { name: 'password', type: 'char', length: '60' }
            ]
        }))

        await queryRunner.createIndex("user", new TableIndex({
            name: "IDX_USER_USERNAME",
            columnNames: ["username"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
