import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsPositive } from "class-validator";

export class UpdateBookAuthorDto {

    @IsDefined({ message: 'El idBookAuthor no puede ser nulo' })
    @IsNumber({}, { message: 'El idBookAuthor debe ser un número' })
    @IsPositive({ message: 'El idBookAuthor debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    public readonly idBookAuthor: number;

    @IsDefined({ message: 'El idBook no puede ser nulo' })
    @IsNumber({}, { message: 'El idBook debe ser un número' })
    @IsPositive({ message: 'El idBook debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    public readonly idBook: number;
        
    @IsDefined({ message: 'El idAutor no puede ser nulo' })
    @IsNumber({}, { message: 'El idAutor debe ser un número' })
    @IsPositive({ message: 'El idAutor debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    public readonly idAutor: number;

    constructor(idBookAuthor: number, idBook: number, idAutor: number) {
        this.idBookAuthor = idBookAuthor;
        this.idBook = idBook;
        this.idAutor = idAutor;
    }
}
