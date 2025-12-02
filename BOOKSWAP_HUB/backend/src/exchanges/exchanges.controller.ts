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
import { ExchangesService } from './exchanges.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('exchanges')
@UseGuards(JwtAuthGuard)
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post()
  create(@Body() createExchangeDto: CreateExchangeDto, @Request() req) {
    return this.exchangesService.create(createExchangeDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.exchangesService.findAll(req.user.userId);
  }

  @Get('sent')
  findSent(@Request() req) {
    return this.exchangesService.findSent(req.user.userId);
  }

  @Get('received')
  findReceived(@Request() req) {
    return this.exchangesService.findReceived(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.exchangesService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExchangeDto: UpdateExchangeDto,
    @Request() req,
  ) {
    return this.exchangesService.update(id, updateExchangeDto, req.user.userId);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string, @Request() req) {
    return this.exchangesService.complete(id, req.user.userId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @Request() req) {
    return this.exchangesService.cancel(id, req.user.userId);
  }
}
