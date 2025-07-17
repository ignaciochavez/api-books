import { ApiProperty } from '@nestjs/swagger';
import { BookAuthor } from 'src/books-authors/entities/book-author.entity';
import { Editorial } from 'src/editorials/entities/editorial.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @ApiProperty({
      nullable: false,
      required: true,
      type: 'integer',
      example: 1
  })
  @PrimaryGeneratedColumn({ name: 'id_book' })
  public idBook: number;

  @ApiProperty({
      nullable: false,
      required: true,
      type: String,
      example: 'string'
  })
  @Column({ name: 'title', type: 'varchar', length: 255, nullable: false })
  public title: string;

  @ApiProperty({
      nullable: false,
      required: true,
      type: Boolean,
      example: true
  })
  @Column({ name: 'availability', type: 'boolean', default: true, nullable: false })
  public availability: boolean;

  @ApiProperty({
      nullable: false,
      required: true,
      type: Number,
      example: 1
  })
  @Column({ name: 'price', type: 'integer', nullable: false })
  public price: number;

  @ApiProperty({
      nullable: false,
      required: true,
      type: 'integer',
      example: 1
  })
  @Column({ name: 'id_gender', nullable: false })
  public idGender: number;

  @ManyToOne(() => Gender, gender => gender.books, { nullable: false })
  @JoinColumn({ name: 'id_gender' })
  public gender: Gender;

  @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
  })
  @Column({ name: 'id_editorial', nullable: false })
  public idEditorial: number;

  @ManyToOne(() => Editorial, editorial => editorial.books, { nullable: false })
  @JoinColumn({ name: 'id_editorial' })
  public editorial: Editorial;

  @ApiProperty({
        nullable: false,
        required: true,
        type: String,
        example: 'files/imageUrl/011a3efb-bdda-4343-a32d-d3100f9ef21f.jpg'
  })
  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: false })
  public imageUrl: string;
  
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone', nullable: true })
  private deletedAt?: Date;

  @OneToMany(() => BookAuthor, bookAuthor => bookAuthor.book)
  public bookAuthors: BookAuthor[];
}