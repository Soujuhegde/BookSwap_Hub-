import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateExchangeDto {
  @IsIn(['pending', 'accepted', 'rejected', 'completed', 'cancelled'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
