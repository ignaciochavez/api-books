import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class FindAllBookDto {
    
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
    @Transform(({ value }) => {
        if (typeof value === "string") {
            return value.trim();
        } else {
            return value;
        }
    })
    @IsString({ message: 'El title debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El title no puede estar vacío.' })
    @MaxLength(255, { message: "El title no puede superar los 255 caracteres de largo" })
    @ApiProperty({
        nullable: true,
        required: false,
        type: String,
        example: 'string'
    })
    public readonly title?: string;
    
    @IsOptional()
    @IsBoolean({ message: 'La availability debe ser un valor booleano' })
    @Type(() => Boolean)
    @ApiProperty({
        nullable: true,
        required: false,
        type: Boolean,
        example: true
    })
    public readonly availability?: boolean;

    @IsOptional()
    @IsNumber({}, { message: 'El price debe ser un número' })
    @IsPositive({ message: 'El price debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: true,
        required: false,
        type: Number,
        example: 1
    })
    public readonly price?: number;
    
    @IsOptional()
    @IsNumber({}, { message: 'El idGender debe ser un número' })
    @IsPositive({ message: 'El idGender debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: true,
        required: false,
        type: 'integer',
        example: 1
    })
    public readonly idGender?: number;
    
    @IsOptional()
    @IsNumber({}, { message: 'El idEditorial debe ser un número' })
    @IsPositive({ message: 'El idEditorial debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: true,
        required: false,
        type: 'integer',
        example: 1
    })
    public readonly idEditorial?: number;
    
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === "string") {
            return value.trim();
        } else {
            return value;
        }
    })
    @IsString({ message: 'El imageUrl debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La imageUrl de la imagen no puede estar vacía' })
    @MaxLength(500, { message: "El imageUrl no puede superar los 500 caracteres de largo" })
    @ApiProperty({
        nullable: true,
        required: false,
        type: String,
        example: 'files/imageUrl/011a3efb-bdda-4343-a32d-d3100f9ef21f.jpg'
    })
    public readonly imageUrl?: string;

    constructor(page: number, limit: number, idBook: number, title?: string, availability?: boolean, price?: number, idGender?: number, idEditorial?: number, imageUrl?: string) {
        this.page = page;
        this.limit = limit;
        this.idBook = idBook;
        this.title = title;
        this.availability = availability;
        this.price = price;
        this.idGender = idGender;
        this.idEditorial = idEditorial;
        this.imageUrl = imageUrl;
    }
}