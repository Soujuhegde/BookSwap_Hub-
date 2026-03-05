import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins for local dev
  },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('MessagesGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(
    @MessageBody() data: { exchangeId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.exchangeId);
    this.logger.log(`Client ${client.id} joined conversation ${data.exchangeId}`);
    return { event: 'joined', data: data.exchangeId };
  }

  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(
    @MessageBody() data: { exchangeId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.exchangeId);
    this.logger.log(`Client ${client.id} left conversation ${data.exchangeId}`);
    return { event: 'left', data: data.exchangeId };
  }

  // Method to be called by MessagesService when a new message is created
  broadcastNewMessage(exchangeId: string, message: any) {
    this.server.to(exchangeId).emit('newMessage', message);
  }
}
