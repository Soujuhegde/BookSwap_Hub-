import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '../../prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesGateway } from './messages.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private messagesGateway: MessagesGateway,
  ) { }

  async create(
    createMessageDto: CreateMessageDto,
    userId: string,
  ): Promise<Message> {
    const exchange = await this.prisma.exchange.findUnique({
      where: { id: createMessageDto.exchangeId },
    });

    if (!exchange) {
      throw new NotFoundException('Exchange not found');
    }

    const newMessage = await this.prisma.message.create({
      data: {
        ...createMessageDto,
        senderId: userId,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    this.messagesGateway.broadcastNewMessage(createMessageDto.exchangeId, newMessage);

    return newMessage;
  }

  async findByExchange(exchangeId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { exchangeId },
      include: { sender: true, receiver: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findConversations(userId: string): Promise<any[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: { exchange: true, sender: true, receiver: true },
      orderBy: { createdAt: 'desc' },
    });

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
    }, {} as Record<string, any>);

    return Object.values(conversations);
  }

  async markAsRead(messageId: string, userId: string): Promise<Message> {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (message && message.receiverId === userId) {
      return this.prisma.message.update({
        where: { id: messageId },
        data: { isRead: true },
      });
    }

    return null;
  }

  async markExchangeMessagesAsRead(
    exchangeId: string,
    userId: string,
  ): Promise<void> {
    await this.prisma.message.updateMany({
      where: { exchangeId, receiverId: userId, isRead: false },
      data: { isRead: true },
    });
  }
}
