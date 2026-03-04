export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
    status: 'online' | 'offline';
    lastSeen?: Date;
}

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
    isRead: boolean;
}

export interface Conversation {
    id: string;
    participant: User;
    messages: Message[];
    lastMessage?: Message;
    unreadCount: number;
}
