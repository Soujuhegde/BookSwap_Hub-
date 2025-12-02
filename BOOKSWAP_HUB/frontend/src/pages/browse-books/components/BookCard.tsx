import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Book } from '../types';

interface BookCardProps {
    book: Book;
    onRequestExchange: (bookId: string) => void;
    onQuickView: (book: Book) => void;
}

const BookCard = ({ book, onRequestExchange, onQuickView }: BookCardProps) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    const getConditionColor = (condition: string) => {
        const colors = {
            'New': 'bg-success/10 text-success',
            'Like New': 'bg-primary/10 text-primary',
            'Good': 'bg-warning/10 text-warning',
            'Fair': 'bg-accent/10 text-accent',
            'Poor': 'bg-destructive/10 text-destructive'
        };
        return colors[condition as keyof typeof colors] || 'bg-muted text-muted-foreground';
    };

    const getStatusColor = (status: string) => {
        const colors = {
            'Available': 'bg-success text-success-foreground',
            'Reserved': 'bg-warning text-warning-foreground',
            'Exchanged': 'bg-muted text-muted-foreground'
        };
        return colors[status as keyof typeof colors] || 'bg-muted text-muted-foreground';
    };

    const handleCardClick = () => {
        navigate('/book-details', { state: { bookId: book.id } });
    };

    return (
        <div className="group relative bg-card rounded-lg border border-border overflow-hidden transition-all duration-150 ease-out hover:shadow-lg hover:border-primary/50">
            <div className="relative h-64 overflow-hidden bg-muted">
                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="BookOpen" size={48} className="text-muted-foreground/30" />
                    </div>
                )}
                <Image
                    src={book.imageUrl}
                    alt={book.imageAlt}
                    className={`w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onClick={handleCardClick}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(book.status)}`}>
                        {book.status}
                    </span>
                </div>
                <button
                    onClick={() => onQuickView(book)}
                    className="absolute top-2 left-2 p-2 bg-background/90 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out"
                    aria-label="Quick view"
                >
                    <Icon name="Eye" size={18} className="text-foreground" />
                </button>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                        className="text-lg font-heading font-semibold text-foreground line-clamp-1 cursor-pointer hover:text-primary transition-colors duration-150 ease-out"
                        onClick={handleCardClick}
                    >
                        {book.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap ${getConditionColor(book.condition)}`}>
                        {book.condition}
                    </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                    by {book.author}
                </p>

                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Icon name="Tag" size={14} />
                    <span>{book.genre}</span>
                </div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <Icon name="User" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{book.owner.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-warning fill-warning" />
                        <span className="text-sm font-medium text-foreground">{book.owner.rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span className="line-clamp-1">{book.owner.location}</span>
                </div>

                <Button
                    variant="default"
                    fullWidth
                    iconName="Repeat"
                    iconPosition="left"
                    onClick={() => onRequestExchange(book.id)}
                    disabled={book.status !== 'Available'}
                >
                    {book.status === 'Available' ? 'Request Exchange' : 'Not Available'}
                </Button>
            </div>
        </div>
    );
};

export default BookCard;