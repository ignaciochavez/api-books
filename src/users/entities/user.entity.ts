import { ApiProperty } from "@nestjs/swagger";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    @PrimaryGeneratedColumn({ name: 'idUser' })
    public idUser: number;
    
    @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'string'
    })
    @Column({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true })
    public email: string;

    @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'string'
    })
    @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
    public password: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone', nullable: true })
    private deletedAt?: Date;

}
