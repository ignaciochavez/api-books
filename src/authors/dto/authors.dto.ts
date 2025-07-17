import { ApiProperty } from "@nestjs/swagger";
import { Author } from "../entities/author.entity";

export class AuthorsDto {

    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 100
    })
    public readonly count: number;

    @ApiProperty({
        nullable: true,
        required: true,
        type: [Author]
    })
    public readonly data?: Author[];

    constructor(count: number, data?: Author[]) {
        this.count = count;
        this.data = data;
    }
}