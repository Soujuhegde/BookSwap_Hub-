import { SimilarBook } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

interface SimilarBooksProps {
    books: SimilarBook[];
}

const SimilarBooks = ({ books }: SimilarBooksProps) => {
    const navigate = useNavigate();

    const handleBookClick = (bookId: string) => {
        navigate(`/book-details?id=${bookId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
                <Icon name="BookMarked" size={24} className="text-primary" />
                <h2 className="text-2xl font-heading font-bold text-foreground">
                    Similar Books
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books.map((book) => (
                    <div
                        key={book.id}
                        onClick={() => handleBookClick(book.id)}
                        className="group cursor-pointer bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-150 ease-out"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                            <Image
                                src={book.imageUrl}
                                alt={book.imageAlt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150 ease-out"
                            />
                            {book.status === 'Available' && (
                                <div className="absolute top-2 right-2 px-2 py-1 bg-success text-success-foreground rounded text-xs font-medium">
                                    Available
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                                {book.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                                {book.author}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Icon name="Star" size={12} />
                                <span>{book.condition}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarBooks;