import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book } from '../../prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookswapService {
  constructor(private prisma: PrismaService) { }

  async create(createBookDto: CreateBookDto, userId: string): Promise<Book> {
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        ownerId: userId,
      },
    });
  }

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: { status: 'available' },
      include: { owner: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { owner: true },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async findByUser(userId: string): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
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

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const book = await this.findOne(id);

    if (book.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own books');
    }

    await this.prisma.book.delete({ where: { id } });
  }

  async search(query: string): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: {
        status: 'available',
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { genre: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: { owner: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
