import { useState } from 'react';
import { ExchangeRequestForm } from '../types';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface ExchangeRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ExchangeRequestForm) => void;
    bookTitle: string;
}

const ExchangeRequestModal = ({ isOpen, onClose, onSubmit, bookTitle }: ExchangeRequestModalProps) => {
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<{ message?: string }>({});

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { message?: string } = {};

        if (!message.trim()) {
            newErrors.message = 'Please enter a message';
        } else if (message.trim().length < 20) {
            newErrors.message = 'Message must be at least 20 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit({ message: message.trim(), proposedBooks: [] });
        setMessage('');
        setErrors({});
    };

    const handleClose = () => {
        setMessage('');
        setErrors({});
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="relative w-full max-w-lg bg-background rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 flex items-center justify-between p-6 bg-background border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                            <Icon name="Repeat" size={20} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-heading font-bold text-foreground">
                                Request Exchange
                            </h2>
                            <p className="text-sm text-muted-foreground">for {bookTitle}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-150 ease-out"
                        aria-label="Close modal"
                    >
                        <Icon name="X" size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-start gap-3">
                            <Icon name="Info" size={18} className="text-primary mt-0.5" />
                            <div className="text-sm text-foreground">
                                <p className="font-medium mb-1">Exchange Request Guidelines</p>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Introduce yourself and explain why you're interested</li>
                                    <li>Mention books you can offer in exchange</li>
                                    <li>Be respectful and clear in your communication</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Input
                        label="Your Message"
                        type="text"
                        placeholder="Hi! I'm interested in exchanging this book. I have..."
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            if (errors.message) {
                                setErrors({ ...errors, message: undefined });
                            }
                        }}
                        error={errors.message}
                        required
                        description="Minimum 20 characters"
                        className="min-h-[120px]"
                    />

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            fullWidth
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="default"
                            iconName="Send"
                            iconPosition="right"
                            fullWidth
                        >
                            Send Request
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExchangeRequestModal;