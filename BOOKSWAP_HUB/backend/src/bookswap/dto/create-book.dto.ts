import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BookCondition, BookStatus } from '../book.entity';

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

  @IsEnum(BookCondition)
  @IsOptional()
  condition?: BookCondition;

  @IsEnum(BookStatus)
  @IsOptional()
  status?: BookStatus;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
