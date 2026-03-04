import { Conversation } from '../types';
import { cn } from '../../../utils/cn';
import Icon from '../../../components/AppIcon';

interface ChatSidebarProps {
    conversations: Conversation[];
    selectedId?: string;
    onSelect: (id: string) => void;
    className?: string;
}

const ChatSidebar = ({ conversations, selectedId, onSelect, className }: ChatSidebarProps) => {
    return (
        <div className={cn("flex flex-col h-full border-r border-border bg-card", className)}>
            <div className="p-4 border-b border-border">
                <h2 className="text-xl font-semibold">Messages</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                        No conversations yet.
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => onSelect(conv.id)}
                                className={cn(
                                    "w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left",
                                    selectedId === conv.id && "bg-muted"
                                )}
                            >
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                        {conv.participant.avatarUrl ? (
                                            <img
                                                src={conv.participant.avatarUrl}
                                                alt={conv.participant.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Icon name="User" size={24} className="text-primary" />
                                        )}
                                    </div>
                                    {conv.participant.status === 'online' && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-medium truncate">{conv.participant.name}</span>
                                        {conv.lastMessage && (
                                            <span className="text-xs text-muted-foreground shrink-0 ml-2">
                                                {conv.lastMessage.timestamp.toLocaleDateString() === new Date().toLocaleDateString()
                                                    ? conv.lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                    : conv.lastMessage.timestamp.toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className={cn(
                                            "text-sm truncate pr-2",
                                            conv.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                                        )}>
                                            {conv.lastMessage?.content || "No messages yet"}
                                        </p>
                                        {conv.unreadCount > 0 && (
                                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground shrink-0">
                                                {conv.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
