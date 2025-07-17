import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAuthorDto {

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
        
    constructor(name: string) {
        this.name = name;
    }
}
