import { useState } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import { mockConversations } from './mockData';
import { Conversation, Message } from './types';
import Header from '../../components/Header';

const Messages = () => {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const currentUserId = 'current-user';

    const selectedConversation = conversations.find(c => c.id === selectedId);

    const handleSelectConversation = (id: string) => {
        setSelectedId(id);
        // Mark as read logic would go here
        setConversations(prev => prev.map(c =>
            c.id === id ? { ...c, unreadCount: 0 } : c
        ));
    };

    const handleSendMessage = (content: string) => {
        if (!selectedId) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: currentUserId,
            content,
            timestamp: new Date(),
            isRead: false
        };

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
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            <Header notificationCount={3} />

            <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full border-x border-border">
                {/* Sidebar - hidden on mobile when chat is open */}
                <ChatSidebar
                    conversations={conversations}
                    selectedId={selectedId}
                    onSelect={handleSelectConversation}
                    className={`w-full md:w-80 lg:w-96 shrink-0 ${selectedId ? 'hidden md:flex' : 'flex'}`}
                />

                {/* Chat Window - hidden on mobile when no chat selected */}
                <div className={`flex-1 flex flex-col ${!selectedId ? 'hidden md:flex' : 'flex'}`}>
                    {selectedConversation ? (
                        <ChatWindow
                            conversation={selectedConversation}
                            currentUserId={currentUserId}
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
