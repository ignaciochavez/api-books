import { ApiProperty } from "@nestjs/swagger";
import { BookAuthor } from "../entities/book-author.entity";

export class BooksAuthorsDto {

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
        type: [BookAuthor]
    })
    public readonly data?: BookAuthor[];

    constructor(count: number, data?: BookAuthor[]) {
        this.count = count;
        this.data = data;
    }
}