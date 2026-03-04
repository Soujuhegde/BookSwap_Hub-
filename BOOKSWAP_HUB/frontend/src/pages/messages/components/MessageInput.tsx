import { useState, FormEvent } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background flex gap-2 items-end">
            <div className="flex-1">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="rounded-full"
                />
            </div>
            <Button
                type="submit"
                size="icon"
                className="rounded-full h-10 w-10 shrink-0"
                disabled={!message.trim()}
                iconName="Send"
            />
        </form>
    );
};

export default MessageInput;
