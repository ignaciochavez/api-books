import { ApiProperty } from "@nestjs/swagger";
import { Editorial } from "../entities/editorial.entity";

export class EditorialsDto {

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
        type: [Editorial]
    })
    public readonly data?: Editorial[];

    constructor(count: number, data?: Editorial[]) {
        this.count = count;
        this.data = data;
    }
}