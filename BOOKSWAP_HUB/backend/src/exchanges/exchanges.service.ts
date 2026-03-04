import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Exchange } from '../../prisma/client';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';

@Injectable()
export class ExchangesService {
  constructor(private prisma: PrismaService) { }

  async create(
    createExchangeDto: CreateExchangeDto,
    userId: string,
  ): Promise<Exchange> {
    const requestedBook = await this.prisma.book.findUnique({
      where: { id: createExchangeDto.requestedBookId },
      include: { owner: true },
    });

    if (!requestedBook) {
      throw new NotFoundException('Requested book not found');
    }

    if (requestedBook.ownerId === userId) {
      throw new BadRequestException('You cannot request your own book');
    }

    if (requestedBook.status !== 'available') {
      throw new BadRequestException('Book is not available for exchange');
    }

    // Check if offered book exists and belongs to requester
    if (createExchangeDto.offeredBookId) {
      const offeredBook = await this.prisma.book.findUnique({
        where: { id: createExchangeDto.offeredBookId },
      });

      if (!offeredBook) {
        throw new NotFoundException('Offered book not found');
      }

      if (offeredBook.ownerId !== userId) {
        throw new BadRequestException('You can only offer your own books');
      }
    }

    return this.prisma.exchange.create({
      data: {
        ...createExchangeDto,
        requesterId: userId,
        ownerId: requestedBook.ownerId,
        status: 'pending',
      },
    });
  }

  async findAll(userId: string): Promise<Exchange[]> {
    return this.prisma.exchange.findMany({
      where: {
        OR: [{ requesterId: userId }, { ownerId: userId }],
      },
      include: {
        requester: true,
        owner: true,
        requestedBook: true,
        offeredBook: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findSent(userId: string): Promise<Exchange[]> {
    return this.prisma.exchange.findMany({
      where: { requesterId: userId },
      include: {
        requester: true,
        owner: true,
        requestedBook: true,
        offeredBook: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findReceived(userId: string): Promise<Exchange[]> {
    return this.prisma.exchange.findMany({
      where: { ownerId: userId },
      include: {
        requester: true,
        owner: true,
        requestedBook: true,
        offeredBook: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string): Promise<Exchange> {
    const exchange = await this.prisma.exchange.findUnique({
      where: { id },
      include: {
        requester: true,
        owner: true,
        requestedBook: true,
        offeredBook: true,
      },
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

    if (exchange.status !== 'pending') {
      throw new BadRequestException(
        'Can only update pending exchange requests',
      );
    }

    // If accepting, update book status
    if (updateExchangeDto.status === 'accepted') {
      await this.prisma.book.update({
        where: { id: exchange.requestedBookId },
        data: { status: 'pending' },
      });
    }

    return this.prisma.exchange.update({
      where: { id },
      data: updateExchangeDto,
    });
  }

  async complete(id: string, userId: string): Promise<Exchange> {
    const exchange = await this.findOne(id, userId);

    if (exchange.status !== 'accepted') {
      throw new BadRequestException('Only accepted exchanges can be completed');
    }

    // Update book statuses
    await this.prisma.book.update({
      where: { id: exchange.requestedBookId },
      data: { status: 'exchanged' },
    });

    if (exchange.offeredBookId) {
      await this.prisma.book.update({
        where: { id: exchange.offeredBookId },
        data: { status: 'exchanged' },
      });
    }

    return this.prisma.exchange.update({
      where: { id },
      data: { status: 'completed' },
    });
  }

  async cancel(id: string, userId: string): Promise<Exchange> {
    const exchange = await this.findOne(id, userId);

    if (exchange.requesterId !== userId) {
      throw new ForbiddenException('Only the requester can cancel the exchange');
    }

    if (
      exchange.status === 'completed' ||
      exchange.status === 'cancelled'
    ) {
      throw new BadRequestException('Cannot cancel this exchange');
    }

    // If it was accepted, make book available again
    const wasAccepted = exchange.status === 'accepted';

    if (wasAccepted) {
      await this.prisma.book.update({
        where: { id: exchange.requestedBookId },
        data: { status: 'available' },
      });
    }

    return this.prisma.exchange.update({
      where: { id },
      data: { status: 'cancelled' },
    });
  }
}
