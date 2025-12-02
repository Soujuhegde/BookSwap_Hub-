import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Book } from '../types';

interface QuickViewModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestExchange: (bookId: string) => void;
}

const QuickViewModal = ({ book, isOpen, onClose, onRequestExchange }: QuickViewModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !book) return null;

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

  const handleViewDetails = () => {
    onClose();
    navigate('/book-details', { state: { bookId: book.id } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-lg border border-border shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/90 backdrop-blur-sm rounded-md hover:bg-muted transition-colors duration-150 ease-out"
          aria-label="Close modal"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="relative h-96 md:h-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={book.imageUrl}
                alt={book.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-md ${getStatusColor(book.status)}`}>
                  {book.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {book.title}
                </h2>
                <span className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap ${getConditionColor(book.condition)}`}>
                  {book.condition}
                </span>
              </div>

              <p className="text-lg text-muted-foreground mb-4">
                by {book.author}
              </p>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <Icon name="Tag" size={18} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{book.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={18} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {book.listedDate.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-heading font-semibold text-foreground mb-2">
                  Description
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="mb-6 p-4 bg-muted rounded-lg">
                <h3 className="text-sm font-heading font-semibold text-foreground mb-3">
                  Owner Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{book.owner.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="text-warning fill-warning" />
                      <span className="text-sm font-medium text-foreground">
                        {book.owner.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{book.owner.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Eye"
                  iconPosition="left"
                  onClick={handleViewDetails}
                >
                  View Details
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Repeat"
                  iconPosition="left"
                  onClick={() => {
                    onRequestExchange(book.id);
                    onClose();
                  }}
                  disabled={book.status !== 'Available'}
                >
                  Request Exchange
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;