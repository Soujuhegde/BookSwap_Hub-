import { Message } from '../types';
import { cn } from '../../../utils/cn';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {
    return (
        <div className={cn("flex w-full mb-4", isOwn ? "justify-end" : "justify-start")}>
            <div
                className={cn(
                    "max-w-[70%] px-4 py-3 rounded-2xl text-sm",
                    isOwn
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                )}
            >
                <p>{message.content}</p>
                <div className={cn(
                    "text-[10px] mt-1 opacity-70",
                    isOwn ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
