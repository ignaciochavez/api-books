import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class FindAllAuthorDto {

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
    @IsNumber({}, { message: 'El idAuthor debe ser un número' })
    @IsPositive({ message: 'El idAuthor debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    public readonly idAuthor?: number;

    @Transform(({ value }) => {
        if (typeof value === "string") {
            return value.trim();
        } else {
            return value;
        }
    })
    @IsOptional()
    @IsString({ message: 'El name debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El name no puede estar vacío.' })
    @MaxLength(255, { message: "El name no puede superar los 255 caracteres de largo" })
    @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'string'
    })
    public readonly name?: string;

    constructor(page: number, limit: number, idAuthor?: number, name?: string){
        this.page = page;
        this.limit = limit;
        this.idAuthor = idAuthor;
        this.name = name;
    }
}