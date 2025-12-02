import { Book } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

interface BookCoverProps {
  book: Book;
}

const BookCover = ({ book }: BookCoverProps) => {
  return (
    <div className="w-full lg:w-2/5">
      <div className="sticky top-20">
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-card">
          <div className="aspect-[3/4] w-full">
            <Image
              src={book.imageUrl}
              alt={book.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {book.status === 'Available' && (
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-success text-success-foreground rounded-full text-sm font-medium">
              <Icon name="CheckCircle" size={16} />
              <span>Available</span>
            </div>
          )}
          {book.status === 'Unavailable' && (
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm font-medium">
              <Icon name="XCircle" size={16} />
              <span>Unavailable</span>
            </div>
          )}
          {book.status === 'Exchanged' && (
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">
              <Icon name="RefreshCw" size={16} />
              <span>Exchanged</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCover;