import { Book } from '../types';
import Icon from '../../../components/AppIcon';

interface BookInfoProps {
    book: Book;
}

const BookInfo = ({ book }: BookInfoProps) => {
    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'Like New':
                return 'text-success bg-success/10';
            case 'Good':
                return 'text-primary bg-primary/10';
            case 'Fair':
                return 'text-warning bg-warning/10';
            case 'Poor':
                return 'text-error bg-error/10';
            default:
                return 'text-muted-foreground bg-muted';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                    {book.title}
                </h1>
                <p className="text-xl text-muted-foreground">by {book.author}</p>
            </div>

            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
                    <Icon name="BookOpen" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{book.genre}</span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getConditionColor(book.condition)}`}>
                    <Icon name="Star" size={16} />
                    <span className="text-sm font-medium">{book.condition}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{book.publishedYear}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
                    <Icon name="FileText" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{book.pages} pages</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                    <p className="text-sm text-muted-foreground mb-1">ISBN</p>
                    <p className="text-sm font-medium text-foreground">{book.isbn}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground mb-1">Language</p>
                    <p className="text-sm font-medium text-foreground">{book.language}</p>
                </div>
            </div>
        </div>
    );
};

export default BookInfo;