import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class UpdateAuthorDto {

    @IsDefined({ message: 'El idAuthor no puede ser nulo' })
    @IsNumber({}, { message: 'El idAuthor debe ser un número' })
    @IsPositive({ message: 'El idAuthor debe ser un número positivo' })
    @Type(() => Number)
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    public readonly idAuthor: number;

    @Transform(({ value }) => {
        if (typeof value === "string") {
            return value.trim();
        } else {
            return value;
        }
    })
    @IsDefined({ message: 'El name no puede ser nulo' })
    @IsString({ message: 'El name debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El name no puede estar vacío.' })
    @MaxLength(255, { message: "El name no puede superar los 255 caracteres de largo" })
    @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'string'
    })
    public readonly name: string;
        
    constructor(idAuthor: number, name: string) {
        this.idAuthor = idAuthor;
        this.name = name;
    }
}
