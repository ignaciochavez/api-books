import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsPositive } from "class-validator";

export class FindAllBookAuthorDto {

    @IsDefined({ message: 'El page no puede ser nulo' })
    @IsNumber({}, { message: 'El page debe ser un número' })
    @IsPositive({ message: 'El page debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    public readonly page: number;

    @IsDefined({ message: 'El limit no puede ser nulo' })
    @IsNumber({}, { message: 'El limit debe ser un número' })
    @IsPositive({ message: 'El limit debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 10
    })
    public readonly limit: number;

    @IsOptional()
    @IsNumber({}, { message: 'El idBookAuthor debe ser un número' })
    @IsPositive({ message: 'El idBookAuthor debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: true,
        required: false,
        type: 'integer',
        example: 1
    })
    public readonly idBookAuthor?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El idBook debe ser un número' })
    @IsPositive({ message: 'El idBook debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: true,
        required: false,
        type: 'integer',
        example: 1
    })
    public readonly idBook?: number;
        
    @IsOptional()
    @IsNumber({}, { message: 'El idAutor debe ser un número' })
    @IsPositive({ message: 'El idAutor debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: true,
        required: false,
        type: 'integer',
        example: 1
    })
    public readonly idAutor?: number;

    constructor(page: number, limit: number, idBookAuthor?: number, idBook?: number, idAutor?: number){
        this.page = page;
        this.limit = limit;
        this.idBookAuthor = idBookAuthor;
        this.idBook = idBook;
        this.idAutor = idAutor;    
    }
}