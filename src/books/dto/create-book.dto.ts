import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateBookDto {

    @Transform(({ value }) => {
        if (typeof value === "string") {
            return value.trim();
        } else {
            return value;
        }
    })
    @IsDefined({ message: 'El title no puede ser nulo' })
    @IsString({ message: 'El title debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El title no puede estar vacío.' })
    @MaxLength(255, { message: "El title no puede superar los 255 caracteres de largo" })
    @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'string'
    })
    public readonly title: string;

    @IsDefined({ message: 'El availability no puede ser nulo' })
    @IsBoolean({ message: 'La availability debe ser un valor booleano' })
    @Type(() => Boolean)
    @ApiProperty({
        nullable: false,
        required: true,
        type: Boolean,
        example: true
    })
    public readonly availability: boolean;

    @IsDefined({ message: 'El price no puede ser nulo' })
    @IsNumber({}, { message: 'El price debe ser un número' })
    @IsPositive({ message: 'El price debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: Number,
        example: 1
    })
    public readonly price: number;

    @IsDefined({ message: 'El idGender no puede ser nulo' })
    @IsNumber({}, { message: 'El idGender debe ser un número' })
    @IsPositive({ message: 'El idGender debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    public readonly idGender: number;

    @IsDefined({ message: 'El idEditorial no puede ser nulo' })
    @IsNumber({}, { message: 'El idEditorial debe ser un número' })
    @IsPositive({ message: 'El idEditorial debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    public readonly idEditorial: number;

    @Transform(({ value }) => {
        if (typeof value === "string") {
            return value.trim();
        } else {
            return value;
        }
    })
    @IsDefined({ message: 'El imageUrl no puede ser nulo' })
    @IsString({ message: 'El imageUrl debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La imageUrl de la imagen no puede estar vacía' })
    @MaxLength(500, { message: "El imageUrl no puede superar los 500 caracteres de largo" })
    @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'files/imageUrl/011a3efb-bdda-4343-a32d-d3100f9ef21f.jpg'
    })
    public readonly imageUrl: string;

    constructor(title: string, availability: boolean, price: number, idGender: number, idEditorial: number, imageUrl: string) {
        this.title = title;
        this.availability = availability;
        this.price = price;
        this.idGender = idGender;
        this.idEditorial = idEditorial;
        this.imageUrl = imageUrl;
    }
}
