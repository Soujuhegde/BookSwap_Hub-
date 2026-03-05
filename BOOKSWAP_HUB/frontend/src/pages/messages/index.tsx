import { useState, useEffect } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import { Conversation, Message } from './types';
import Header from '../../components/Header';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';

const Messages = () => {
    const { user: currentUser } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    const { socket } = useSocket(selectedId);

    // Fetch conversations list on mount
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await api.get('/messages/conversations');
                // Map backend structure to frontend Conversation type
                const formatted: Conversation[] = res.data.map((item: any) => {
                    // Identify the other participant from the last message
                    const otherUser = item.lastMessage?.senderId === currentUser?.id
                        ? item.lastMessage?.receiver
                        : item.lastMessage?.sender;

                    return {
                        id: item.exchange.id,
                        participant: {
                            id: otherUser?.id || '',
                            name: otherUser?.fullName || 'Unknown User',
                            status: 'offline', // simplified for now
                        },
                        messages: [], // will load on select
                        lastMessage: {
                            id: item.lastMessage.id,
                            senderId: item.lastMessage.senderId,
                            content: item.lastMessage.content,
                            timestamp: new Date(item.lastMessage.createdAt),
                            isRead: item.lastMessage.isRead
                        },
                        unreadCount: item.unreadCount,
                    };
                });
                setConversations(formatted);
            } catch (error) {
                console.error('Failed to fetch conversations', error);
            }
        };

        if (currentUser) {
            fetchConversations();
        }
    }, [currentUser]);

    // Fetch full messages when a conversation is selected
    useEffect(() => {
        if (!selectedId) return;

        const loadMessages = async () => {
            try {
                const res = await api.get(`/messages/exchange/${selectedId}`);
                const fullMessages: Message[] = res.data.map((msg: any) => ({
                    id: msg.id,
                    senderId: msg.senderId,
                    content: msg.content,
                    timestamp: new Date(msg.createdAt),
                    isRead: msg.isRead
                }));

                setConversations(prev => prev.map(c =>
                    c.id === selectedId ? { ...c, messages: fullMessages } : c
                ));

                // Mark messages as read in backend
                await api.patch(`/messages/exchange/${selectedId}/read-all`);
            } catch (error) {
                console.error('Failed to fetch messages for exchange', error);
            }
        };

        loadMessages();
    }, [selectedId]);

    // Listen to real-time incoming messages via socket
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (msg: any) => {
            const incomingMsg: Message = {
                id: msg.id,
                senderId: msg.senderId,
                content: msg.content,
                timestamp: new Date(msg.createdAt),
                isRead: msg.isRead
            };

            setConversations(prev => prev.map(c => {
                // If it belongs to an active selection, append it
                if (c.id === msg.exchangeId) {
                    return {
                        ...c,
                        messages: [...c.messages, incomingMsg],
                        lastMessage: incomingMsg,
                    };
                }
                return c;
            }));
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket]);

    const selectedConversation = conversations.find(c => c.id === selectedId);

    const handleSelectConversation = (id: string) => {
        setSelectedId(id);
        setConversations(prev => prev.map(c =>
            c.id === id ? { ...c, unreadCount: 0 } : c
        ));
    };

    const handleSendMessage = async (content: string) => {
        if (!selectedId || !currentUser) return;

        try {
            // Because our socket broadcasts the 'newMessage' back to everyone in the room 
            // including the sender, we technically don't need to append it locally first if the 
            // round-trip is fast. But we'll append it for immediate feedback.

            const newMessage: Message = {
                id: Date.now().toString(),
                senderId: currentUser.id,
                content,
                timestamp: new Date(),
                isRead: false
            };

            // Optimistic update
            setConversations(prev => prev.map(c => {
                if (c.id === selectedId) {
                    return {
                        ...c,
                        messages: [...c.messages, newMessage],
                        lastMessage: newMessage
                    };
                }
                return c;
            }));

            // Post to backend (which inside emits Socket 'newMessage')
            await api.post('/messages', {
                exchangeId: selectedId,
                receiverId: selectedConversation?.participant.id,
                content
            });

        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            <Header notificationCount={3} />

            <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full border-x border-border">
                <ChatSidebar
                    conversations={conversations}
                    selectedId={selectedId}
                    onSelect={handleSelectConversation}
                    className={`w-full md:w-80 lg:w-96 shrink-0 ${selectedId ? 'hidden md:flex' : 'flex'}`}
                />

                <div className={`flex-1 flex flex-col ${!selectedId ? 'hidden md:flex' : 'flex'}`}>
                    {selectedConversation ? (
                        <ChatWindow
                            conversation={selectedConversation}
                            currentUserId={currentUser?.id || ''}
                            onSendMessage={handleSendMessage}
                            onBack={() => setSelectedId(undefined)}
                        />
                    ) : (
                        <div className="hidden md:flex flex-col items-center justify-center h-full text-muted-foreground bg-muted/10">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-50"
                                >
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium mb-1">Your Messages</h3>
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
