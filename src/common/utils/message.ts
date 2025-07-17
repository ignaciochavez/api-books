import { Injectable, Scope } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable({ scope: Scope.REQUEST })
export class Message {
    @ApiProperty({
        nullable: false,
        required: true,
        example: 0
    })
    public id: number;

    @ApiProperty({
        nullable: false,
        required: true,
        example: 'string'
    })
    public title: string;

    @ApiProperty({
        nullable: false,
        required: true,
        example: ['string', 'string']
    })
    public messages: string[];

    constructor() {
        this.id = 0;
        this.title = '';
        this.messages = [];
    }

    setMessage(id: number, title: string, messages: string[]) : void {
        this.id = id;
        this.title = title;
        this.messages = messages;
    }

    setIdTitle(id: number, title: string) : void {
        this.id = id;
        this.title = title;
    }
}