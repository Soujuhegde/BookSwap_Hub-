import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    return this.messagesService.create(createMessageDto, req.user.userId);
  }

  @Get('conversations')
  findConversations(@Request() req) {
    return this.messagesService.findConversations(req.user.userId);
  }

  @Get('exchange/:exchangeId')
  findByExchange(@Param('exchangeId') exchangeId: string) {
    return this.messagesService.findByExchange(exchangeId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Request() req) {
    return this.messagesService.markAsRead(id, req.user.userId);
  }

  @Patch('exchange/:exchangeId/read-all')
  async markExchangeMessagesAsRead(
    @Param('exchangeId') exchangeId: string,
    @Request() req,
  ) {
    await this.messagesService.markExchangeMessagesAsRead(
      exchangeId,
      req.user.userId,
    );
    return { success: true };
  }
}
