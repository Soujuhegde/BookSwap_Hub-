import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, BookStatus } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookswapService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, userId: string): Promise<Book> {
    const book = this.booksRepository.create({
      ...createBookDto,
      ownerId: userId,
    });
    return this.booksRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      where: { status: BookStatus.AVAILABLE },
      relations: ['owner'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async findByUser(userId: string): Promise<Book[]> {
    return this.booksRepository.find({
      where: { ownerId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    userId: string,
  ): Promise<Book> {
    const book = await this.findOne(id);

    if (book.ownerId !== userId) {
      throw new ForbiddenException('You can only update your own books');
    }

    Object.assign(book, updateBookDto);
    return this.booksRepository.save(book);
  }

  async remove(id: string, userId: string): Promise<void> {
    const book = await this.findOne(id);

    if (book.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own books');
    }

    await this.booksRepository.remove(book);
  }

  async search(query: string): Promise<Book[]> {
    return this.booksRepository
      .createQueryBuilder('book')
      .where('book.status = :status', { status: BookStatus.AVAILABLE })
      .andWhere(
        '(book.title LIKE :query OR book.author LIKE :query OR book.genre LIKE :query)',
        { query: `%${query}%` },
      )
      .leftJoinAndSelect('book.owner', 'owner')
      .orderBy('book.createdAt', 'DESC')
      .getMany();
  }
}
