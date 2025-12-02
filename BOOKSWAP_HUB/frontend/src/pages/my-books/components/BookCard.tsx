import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
  onStatusChange: (bookId: string, status: Book['status']) => void;
  isSelected: boolean;
  onSelect: (bookId: string) => void;
}

const BookCard = ({ book, onEdit, onDelete, onStatusChange, isSelected, onSelect }: BookCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: Book['status']) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success';
      case 'in-negotiation':
        return 'bg-warning/10 text-warning';
      case 'exchanged':
        return 'bg-muted text-muted-foreground';
      case 'unavailable':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConditionColor = (condition: Book['condition']) => {
    switch (condition) {
      case 'Like New':
        return 'text-success';
      case 'Good':
        return 'text-primary';
      case 'Fair':
        return 'text-warning';
      case 'Poor':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-150 ease-out hover:shadow-lg group">
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(book.id)}
          className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring cursor-pointer"
          aria-label={`Select ${book.title}`}
        />
      </div>

      <div className="relative h-64 overflow-hidden bg-muted">
        <Image
          src={book.imageUrl}
          alt={book.imageAlt}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(book.status)}`}>
            {book.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-1 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>

        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">{book.genre}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={16} className={getConditionColor(book.condition)} />
            <span className={getConditionColor(book.condition)}>{book.condition}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {book.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={14} />
            <span>{book.viewCount} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Repeat" size={14} />
            <span>{book.exchangeCount} exchanges</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Edit"
            iconPosition="left"
            onClick={() => onEdit(book)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MoreVertical"
            onClick={() => setShowActions(!showActions)}
            aria-label="More actions"
          />
        </div>

        {showActions && (
          <div className="absolute right-4 bottom-20 bg-popover border border-border rounded-lg shadow-lg p-2 z-20 min-w-[160px]">
            <button
              onClick={() => {
                onStatusChange(book.id, book.status === 'available' ? 'unavailable' : 'available');
                setShowActions(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-150 ease-out"
            >
              <Icon name={book.status === 'available' ? 'EyeOff' : 'Eye'} size={16} />
              <span>{book.status === 'available' ? 'Mark Unavailable' : 'Mark Available'}</span>
            </button>
            <button
              onClick={() => {
                onDelete(book.id);
                setShowActions(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-colors duration-150 ease-out"
            >
              <Icon name="Trash2" size={16} />
              <span>Delete Book</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;