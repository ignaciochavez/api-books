import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../entities/book.entity";

export class BooksDto {

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
        type: [Book]
    })
    public readonly data?: Book[];

    constructor(count: number, data?: Book[]) {
        this.count = count;
        this.data = data;
    }
}