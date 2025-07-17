import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "../entities/gender.entity";

export class GendersDto {

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
        type: [Gender]
    })
    public readonly data?: Gender[];

    constructor(count: number, data?: Gender[]) {
        this.count = count;
        this.data = data;
    }
}