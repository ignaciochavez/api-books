import { Test, TestingModule } from '@nestjs/testing';
import { BooksAuthorsService } from './books-authors.service';

describe('BooksAuthorsService', () => {
  let service: BooksAuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksAuthorsService],
    }).compile();

    service = module.get<BooksAuthorsService>(BooksAuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
