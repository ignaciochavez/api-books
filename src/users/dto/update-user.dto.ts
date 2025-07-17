import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'string'
    })
    @Transform(({ value }) => {
        if (typeof value === "string") {
            return value.trim();
        } else {
            return value;
        }
    })
    @IsDefined({ message: 'El email no puede ser nulo' })
    @IsString({ message: 'El email debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El email no puede estar vacío.' })
    @MaxLength(255, { message: "El email no puede superar los 255 caracteres de largo" })
    public readonly email: string;

    @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'string'
    })
    @Transform(({ value }) => {
        if (typeof value === "string") {
            return value.trim();
        } else {
            return value;
        }
    })
    @IsDefined({ message: 'El password no puede ser nulo' })
    @IsString({ message: 'El password debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El password no puede estar vacío.' })
    @MaxLength(255, { message: "El password no puede superar los 255 caracteres de largo" })
    public readonly password: string;

    constructor (email: string, password: string){
        this.email = email;
        this.password = password
    }
}
