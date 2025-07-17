import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'genders' })
export class Gender {
  @ApiProperty({
        nullable: false,
        required: true,
        type: 'integer',
        example: 1
  })
  @PrimaryGeneratedColumn({ name: 'id_gender' })
  public idGender: number;

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

  @OneToMany(() => Book, book => book.gender)
  public books: Book[];
}