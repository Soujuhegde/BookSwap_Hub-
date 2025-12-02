export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Poor';
  imageUrl: string;
  imageAlt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
  totalExchanges: number;
}

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface ExchangeRequest {
  id: string;
  requestedBook: Book;
  offeredBook: Book;
  requester: User;
  owner: User;
  status: RequestStatus;
  requestDate: Date;
  message: string;
  proposedExchangeDate?: Date;
  responseMessage?: string;
  completedDate?: Date;
  rating?: number;
  isRead: boolean;
}

export type TabType = 'received' | 'sent';

export interface FilterOptions {
  status: RequestStatus | 'all';
  sortBy: 'date' | 'priority';
}