import { useRef, useEffect } from 'react';
import { Conversation } from '../types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface ChatWindowProps {
    conversation: Conversation;
    currentUserId: string;
    onSendMessage: (content: string) => void;
    onBack?: () => void;
}

const ChatWindow = ({ conversation, currentUserId, onSendMessage, onBack }: ChatWindowProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation.messages]);

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
                {onBack && (
                    <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden -ml-2">
                        <Icon name="ArrowLeft" size={20} />
                    </Button>
                )}

                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        {conversation.participant.avatarUrl ? (
                            <img
                                src={conversation.participant.avatarUrl}
                                alt={conversation.participant.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Icon name="User" size={20} className="text-primary" />
                        )}
                    </div>
                    {conversation.participant.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-background" />
                    )}
                </div>

                <div>
                    <h3 className="font-semibold">{conversation.participant.name}</h3>
                    <p className="text-xs text-muted-foreground">
                        {conversation.participant.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                </div>

                <div className="ml-auto">
                    <Button variant="ghost" size="icon">
                        <Icon name="MoreVertical" size={20} />
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
                {conversation.messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Icon name="MessageSquare" size={48} className="mb-4 opacity-20" />
                        <p>Start the conversation!</p>
                    </div>
                ) : (
                    conversation.messages.map((msg) => (
                        <MessageBubble
                            key={msg.id}
                            message={msg}
                            isOwn={msg.senderId === currentUserId}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatWindow;
