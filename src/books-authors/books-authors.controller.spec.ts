import { Test, TestingModule } from '@nestjs/testing';
import { BooksAuthorsController } from './books-authors.controller';
import { BooksAuthorsService } from './books-authors.service';

describe('BooksAuthorsController', () => {
  let controller: BooksAuthorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksAuthorsController],
      providers: [BooksAuthorsService],
    }).compile();

    controller = module.get<BooksAuthorsController>(BooksAuthorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
