import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class UpdateGenderDto {

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
    @IsDefined({ message: 'El name no puede ser nulo' })
    @IsString({ message: 'El name debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El name no puede estar vacío.' })
    @MaxLength(255, { message: "El name no puede superar los 255 caracteres de largo" })
    public readonly name: string;

    constructor(idGender: number, name: string) {
        this.idGender = idGender;
        this.name = name;
    }
}
