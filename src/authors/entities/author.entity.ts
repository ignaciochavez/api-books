import { ApiProperty } from '@nestjs/swagger';
import { BookAuthor } from 'src/books-authors/entities/book-author.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'authors' })
export class Author {
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    @PrimaryGeneratedColumn({ name: 'id_author' })
    public idAuthor: number;
    
    @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'string'
    })
    @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
    public name: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone', nullable: true })
    private deletedAt?: Date;
    
    
    @OneToMany(() => BookAuthor, bookAuthor => bookAuthor.author)
    bookAuthors: BookAuthor[];
}