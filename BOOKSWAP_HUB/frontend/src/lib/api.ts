import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url} with token`);
  } else {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url} without token`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect to login if we're not already on the login or signup page
      const currentPath = window.location.pathname;
      if (!['/login', '/signup', '/'].includes(currentPath)) {
        console.log('Received 401 error, clearing auth and redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  genre?: string;
  publisher?: string;
  publishYear?: number;
  condition: string;
  status: string;
  imageUrl?: string;
  owner: User;
  createdAt: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  address?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export const authApi = {
  register: (data: RegisterData) =>
    api.post<AuthResponse>('/auth/register', data),

  login: (data: LoginData) =>
    api.post<AuthResponse>('/auth/login', data),

  getProfile: () =>
    api.get<User>('/auth/profile'),
};

export interface Exchange {
  id: string;
  requester: User;
  owner: User;
  requestedBook: Book;
  offeredBook?: Book;
  status: string;
  message?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  exchangeId: string;
  sender: User;
  receiver: User;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export const booksApi = {
  getAll: () =>
    api.get<Book[]>('/books'),

  getOne: (id: string) =>
    api.get<Book>(`/books/${id}`),

  getMyBooks: () =>
    api.get<Book[]>('/books/my-books'),

  search: (query: string) =>
    api.get<Book[]>(`/books/search?q=${query}`),

  create: (data: Partial<Book>) =>
    api.post<Book>('/books', data),

  update: (id: string, data: Partial<Book>) =>
    api.patch<Book>(`/books/${id}`, data),

  delete: (id: string) =>
    api.delete(`/books/${id}`),
};

export const exchangesApi = {
  getAll: () =>
    api.get<Exchange[]>('/exchanges'),

  getSent: () =>
    api.get<Exchange[]>('/exchanges/sent'),

  getReceived: () =>
    api.get<Exchange[]>('/exchanges/received'),

  getOne: (id: string) =>
    api.get<Exchange>(`/exchanges/${id}`),

  create: (data: { requestedBookId: string; offeredBookId?: string; message?: string }) =>
    api.post<Exchange>('/exchanges', data),

  update: (id: string, data: { status: string; rejectionReason?: string }) =>
    api.patch<Exchange>(`/exchanges/${id}`, data),

  complete: (id: string) =>
    api.patch<Exchange>(`/exchanges/${id}/complete`, {}),

  cancel: (id: string) =>
    api.patch<Exchange>(`/exchanges/${id}/cancel`, {}),
};

export const notificationsApi = {
  getAll: () =>
    api.get<Notification[]>('/notifications'),

  getUnread: () =>
    api.get<Notification[]>('/notifications/unread'),

  getUnreadCount: () =>
    api.get<{ count: number }>('/notifications/unread/count'),

  markAsRead: (id: string) =>
    api.patch<Notification>(`/notifications/${id}/read`, {}),

  markAllAsRead: () =>
    api.patch('/notifications/read-all', {}),
};

export const messagesApi = {
  getConversations: () =>
    api.get<any[]>('/messages/conversations'),

  getByExchange: (exchangeId: string) =>
    api.get<Message[]>(`/messages/exchange/${exchangeId}`),

  send: (data: { exchangeId: string; receiverId: string; content: string }) =>
    api.post<Message>('/messages', data),

  markAsRead: (id: string) =>
    api.patch<Message>(`/messages/${id}/read`, {}),

  markExchangeAsRead: (exchangeId: string) =>
    api.patch(`/messages/exchange/${exchangeId}/read-all`, {}),
};
