import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum BookCondition {
  NEW = 'new',
  LIKE_NEW = 'like_new',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
}

export enum BookStatus {
  AVAILABLE = 'available',
  EXCHANGED = 'exchanged',
  PENDING = 'pending',
}

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true })
  publishYear: number;

  @Column({
    type: 'varchar',
    default: BookCondition.GOOD,
  })
  condition: BookCondition;

  @Column({
    type: 'varchar',
    default: BookStatus.AVAILABLE,
  })
  status: BookStatus;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
