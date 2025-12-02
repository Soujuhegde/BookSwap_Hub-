import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookswapModule } from './bookswap/bookswap.module';
import { ExchangesModule } from './exchanges/exchanges.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bookswap.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
      logging: true, // Enable logging to see what's happening
    }),
    AuthModule,
    UsersModule,
    BookswapModule,
    ExchangesModule,
    NotificationsModule,
    MessagesModule,
  ],
})
export class AppModule {}
