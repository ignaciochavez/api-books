import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class FindAllGenderDto {

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
    @IsNumber({}, { message: 'El limit de género debe ser un número' })
    @IsPositive({ message: 'El limit de género debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 10
    })
    public readonly limit: number;

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
    @Transform(({ value }) => {
        if (typeof value === "string") {
            return value.trim();
        } else {
            return value;
        }
    })
    @IsString({ message: 'El name debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El name no puede estar vacío.' })
    @MaxLength(255, { message: "El name no puede superar los 255 caracteres de largo" })
    @ApiProperty({
        nullable: true,
        required: false,
        type: String,
        example: 'string'
    })
    public readonly name?: string;

    constructor(page: number, limit: number, idGender?: number, name?: string) {
        this.page = page;
        this.limit = limit;
        this.idGender = idGender;
        this.name = name;
    }
}