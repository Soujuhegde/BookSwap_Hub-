import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  isbn?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  publisher?: string;

  @IsNumber()
  @IsOptional()
  publishYear?: number;

  @IsIn(['new', 'like_new', 'good', 'fair', 'poor'])
  @IsOptional()
  condition?: string;

  @IsIn(['available', 'pending', 'exchanged'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
