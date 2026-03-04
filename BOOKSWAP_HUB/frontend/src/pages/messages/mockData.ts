import { Conversation } from './types';

export const mockConversations: Conversation[] = [
    {
        id: '1',
        participant: {
            id: '2',
            name: 'Alice Johnson',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            status: 'online'
        },
        messages: [
            {
                id: 'm1',
                senderId: '2',
                content: 'Hi! Is your copy of "The Great Gatsby" still available?',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
                isRead: true
            },
            {
                id: 'm2',
                senderId: 'current-user',
                content: 'Yes, it is! Are you interested in swapping?',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9),
                isRead: true
            },
            {
                id: 'm3',
                senderId: '2',
                content: 'Definitely. I have "1984" and "Brave New World". Would you like either?',
                timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
                isRead: false
            }
        ],
        lastMessage: {
            id: 'm3',
            senderId: '2',
            content: 'Definitely. I have "1984" and "Brave New World". Would you like either?',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
            isRead: false
        },
        unreadCount: 1
    },
    {
        id: '2',
        participant: {
            id: '3',
            name: 'Bob Smith',
            avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
            status: 'offline',
            lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24)
        },
        messages: [
            {
                id: 'm4',
                senderId: 'current-user',
                content: 'Thanks for the swap! The book arrived in great condition.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
                isRead: true
            },
            {
                id: 'm5',
                senderId: '3',
                content: 'Glad to hear it! Enjoy reading.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5),
                isRead: true
            }
        ],
        lastMessage: {
            id: 'm5',
            senderId: '3',
            content: 'Glad to hear it! Enjoy reading.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5),
            isRead: true
        },
        unreadCount: 0
    },
    {
        id: '3',
        participant: {
            id: '4',
            name: 'Carol Williams',
            status: 'online'
        },
        messages: [],
        unreadCount: 0
    }
];
