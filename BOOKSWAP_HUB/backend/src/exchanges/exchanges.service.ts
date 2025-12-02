import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exchange, ExchangeStatus } from './exchange.entity';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { Book, BookStatus } from '../bookswap/book.entity';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectRepository(Exchange)
    private exchangesRepository: Repository<Exchange>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(
    createExchangeDto: CreateExchangeDto,
    userId: string,
  ): Promise<Exchange> {
    const requestedBook = await this.booksRepository.findOne({
      where: { id: createExchangeDto.requestedBookId },
      relations: ['owner'],
    });

    if (!requestedBook) {
      throw new NotFoundException('Requested book not found');
    }

    if (requestedBook.ownerId === userId) {
      throw new BadRequestException('You cannot request your own book');
    }

    if (requestedBook.status !== BookStatus.AVAILABLE) {
      throw new BadRequestException('Book is not available for exchange');
    }

    // Check if offered book exists and belongs to requester
    if (createExchangeDto.offeredBookId) {
      const offeredBook = await this.booksRepository.findOne({
        where: { id: createExchangeDto.offeredBookId },
      });

      if (!offeredBook) {
        throw new NotFoundException('Offered book not found');
      }

      if (offeredBook.ownerId !== userId) {
        throw new BadRequestException('You can only offer your own books');
      }
    }

    const exchange = this.exchangesRepository.create({
      ...createExchangeDto,
      requesterId: userId,
      ownerId: requestedBook.ownerId,
      status: ExchangeStatus.PENDING,
    });

    return this.exchangesRepository.save(exchange);
  }

  async findAll(userId: string): Promise<Exchange[]> {
    return this.exchangesRepository.find({
      where: [{ requesterId: userId }, { ownerId: userId }],
      relations: ['requester', 'owner', 'requestedBook', 'offeredBook'],
      order: { createdAt: 'DESC' },
    });
  }

  async findSent(userId: string): Promise<Exchange[]> {
    return this.exchangesRepository.find({
      where: { requesterId: userId },
      relations: ['requester', 'owner', 'requestedBook', 'offeredBook'],
      order: { createdAt: 'DESC' },
    });
  }

  async findReceived(userId: string): Promise<Exchange[]> {
    return this.exchangesRepository.find({
      where: { ownerId: userId },
      relations: ['requester', 'owner', 'requestedBook', 'offeredBook'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Exchange> {
    const exchange = await this.exchangesRepository.findOne({
      where: { id },
      relations: ['requester', 'owner', 'requestedBook', 'offeredBook'],
    });

    if (!exchange) {
      throw new NotFoundException('Exchange request not found');
    }

    if (exchange.requesterId !== userId && exchange.ownerId !== userId) {
      throw new ForbiddenException('You do not have access to this exchange');
    }

    return exchange;
  }

  async update(
    id: string,
    updateExchangeDto: UpdateExchangeDto,
    userId: string,
  ): Promise<Exchange> {
    const exchange = await this.findOne(id, userId);

    if (exchange.ownerId !== userId) {
      throw new ForbiddenException(
        'Only the book owner can update exchange status',
      );
    }

    if (exchange.status !== ExchangeStatus.PENDING) {
      throw new BadRequestException(
        'Can only update pending exchange requests',
      );
    }

    // If accepting, update book status
    if (updateExchangeDto.status === ExchangeStatus.ACCEPTED) {
      await this.booksRepository.update(
        { id: exchange.requestedBookId },
        { status: BookStatus.PENDING },
      );
    }

    Object.assign(exchange, updateExchangeDto);
    return this.exchangesRepository.save(exchange);
  }

  async complete(id: string, userId: string): Promise<Exchange> {
    const exchange = await this.findOne(id, userId);

    if (exchange.status !== ExchangeStatus.ACCEPTED) {
      throw new BadRequestException('Only accepted exchanges can be completed');
    }

    exchange.status = ExchangeStatus.COMPLETED;

    // Update book statuses
    await this.booksRepository.update(
      { id: exchange.requestedBookId },
      { status: BookStatus.EXCHANGED },
    );

    if (exchange.offeredBookId) {
      await this.booksRepository.update(
        { id: exchange.offeredBookId },
        { status: BookStatus.EXCHANGED },
      );
    }

    return this.exchangesRepository.save(exchange);
  }

  async cancel(id: string, userId: string): Promise<Exchange> {
    const exchange = await this.findOne(id, userId);

    if (exchange.requesterId !== userId) {
      throw new ForbiddenException('Only the requester can cancel the exchange');
    }

    if (
      exchange.status === ExchangeStatus.COMPLETED ||
      exchange.status === ExchangeStatus.CANCELLED
    ) {
      throw new BadRequestException('Cannot cancel this exchange');
    }

    // If it was accepted, make book available again
    const wasAccepted = exchange.status === ExchangeStatus.ACCEPTED;

    exchange.status = ExchangeStatus.CANCELLED;

    if (wasAccepted) {
      await this.booksRepository.update(
        { id: exchange.requestedBookId },
        { status: BookStatus.AVAILABLE },
      );
    }

    return this.exchangesRepository.save(exchange);
  }
}
