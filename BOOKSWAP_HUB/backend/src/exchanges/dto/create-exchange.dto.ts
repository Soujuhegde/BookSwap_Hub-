import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateExchangeDto {
  @IsUUID()
  @IsNotEmpty()
  requestedBookId: string;

  @IsUUID()
  @IsOptional()
  offeredBookId?: string;

  @IsString()
  @IsOptional()
  message?: string;
}
