import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    @ApiProperty()
    readonly id?: number;

    @ApiProperty()
    username: string;

    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }
}