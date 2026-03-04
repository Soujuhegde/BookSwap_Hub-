import { Module } from '@nestjs/common';
import { BookswapService } from './bookswap.service';
import { BookswapController } from './bookswap.controller';

@Module({
  controllers: [BookswapController],
  providers: [BookswapService],
  exports: [BookswapService],
})
export class BookswapModule { }
