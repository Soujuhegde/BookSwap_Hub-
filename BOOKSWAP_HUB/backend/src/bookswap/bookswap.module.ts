import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookswapService } from './bookswap.service';
import { BookswapController } from './bookswap.controller';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookswapController],
  providers: [BookswapService],
  exports: [BookswapService],
})
export class BookswapModule {}
