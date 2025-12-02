import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ExchangeStatus } from '../exchange.entity';

export class UpdateExchangeDto {
  @IsEnum(ExchangeStatus)
  @IsOptional()
  status?: ExchangeStatus;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
