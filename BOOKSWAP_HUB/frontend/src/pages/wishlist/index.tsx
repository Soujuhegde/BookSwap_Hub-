import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import Header from '../../components/Header';
import BookCard from '../browse-books/components/BookCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const navigate = useNavigate();

    const handleRequestExchange = (bookId: string) => {
        navigate('/book-details', { state: { bookId } });
    };

    const handleQuickView = (book: any) => {
        navigate('/book-details', { state: { bookId: book.id } });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header notificationCount={3} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                        My Wishlist
                    </h1>
                    <p className="text-muted-foreground">
                        Books you've saved for later
                    </p>
                </div>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((book) => (
                            <div key={book.id} className="relative group">
                                <BookCard
                                    book={book}
                                    onRequestExchange={handleRequestExchange}
                                    onQuickView={handleQuickView}
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromWishlist(book.id);
                                    }}
                                    className="absolute top-2 right-2 z-10 p-2 bg-background/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-destructive/10 hover:text-destructive transition-colors"
                                    title="Remove from wishlist"
                                >
                                    <Icon name="Trash2" size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
                            <Icon name="Heart" size={48} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                            Your wishlist is empty
                        </h3>
                        <p className="text-muted-foreground text-center max-w-md mb-6">
                            Save books you're interested in to keep track of them.
                        </p>
                        <Button onClick={() => navigate('/browse-books')}>
                            Browse Books
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Wishlist;
