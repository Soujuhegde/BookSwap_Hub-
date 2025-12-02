import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Exchange } from '../exchanges/exchange.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Exchange)
    private exchangesRepository: Repository<Exchange>,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    userId: string,
  ): Promise<Message> {
    const exchange = await this.exchangesRepository.findOne({
      where: { id: createMessageDto.exchangeId },
    });

    if (!exchange) {
      throw new NotFoundException('Exchange not found');
    }

    const message = this.messagesRepository.create({
      ...createMessageDto,
      senderId: userId,
    });

    return this.messagesRepository.save(message);
  }

  async findByExchange(exchangeId: string): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { exchangeId },
      relations: ['sender', 'receiver'],
      order: { createdAt: 'ASC' },
    });
  }

  async findConversations(userId: string): Promise<any[]> {
    const messages = await this.messagesRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.exchange', 'exchange')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where('message.senderId = :userId OR message.receiverId = :userId', {
        userId,
      })
      .orderBy('message.createdAt', 'DESC')
      .getMany();

    // Group by exchange
    const conversations = messages.reduce((acc, message) => {
      if (!acc[message.exchangeId]) {
        acc[message.exchangeId] = {
          exchange: message.exchange,
          lastMessage: message,
          unreadCount: 0,
        };
      }
      if (!message.isRead && message.receiverId === userId) {
        acc[message.exchangeId].unreadCount++;
      }
      return acc;
    }, {});

    return Object.values(conversations);
  }

  async markAsRead(messageId: string, userId: string): Promise<Message> {
    const message = await this.messagesRepository.findOne({
      where: { id: messageId, receiverId: userId },
    });

    if (message) {
      message.isRead = true;
      return this.messagesRepository.save(message);
    }

    return null;
  }

  async markExchangeMessagesAsRead(
    exchangeId: string,
    userId: string,
  ): Promise<void> {
    await this.messagesRepository.update(
      { exchangeId, receiverId: userId, isRead: false },
      { isRead: true },
    );
  }
}
