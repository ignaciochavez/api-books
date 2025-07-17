import { ApiProperty } from "@nestjs/swagger";
import { Author } from "src/authors/entities/author.entity";
import { Book } from "src/books/entities/book.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'books_authors' })
export class BookAuthor {    
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    @PrimaryColumn({ name: 'id_book_author'})
    public idBookAuthor: number;

    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    @Column({ name: 'id_book'})
    public idBook: number;
    
    @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
    })
    @Column({ name: 'id_autor'})
    public idAutor: number;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone', nullable: true })
    private deletedAt?: Date;

    @ManyToOne(() => Book, book => book.bookAuthors)
    @JoinColumn({ name: 'id_book' })
    public book: Book;
    
    @ManyToOne(() => Author, autor => autor.bookAuthors)
    @JoinColumn({ name: 'id_autor' })
    public author: Author;
}

