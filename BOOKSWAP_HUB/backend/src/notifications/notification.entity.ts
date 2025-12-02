import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum NotificationType {
  EXCHANGE_REQUEST = 'exchange_request',
  EXCHANGE_ACCEPTED = 'exchange_accepted',
  EXCHANGE_REJECTED = 'exchange_rejected',
  EXCHANGE_COMPLETED = 'exchange_completed',
  EXCHANGE_CANCELLED = 'exchange_cancelled',
  NEW_MESSAGE = 'new_message',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({
    type: 'varchar',
  })
  type: NotificationType;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true })
  link: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
