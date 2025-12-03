import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Icon from '../../components/AppIcon';
import BookCard from './components/BookCard';
import FilterToolbar from './components/FilterToolbar';
import CategoryChips from './components/CategoryChips';
import QuickViewModal from './components/QuickViewModal';
import BookGridSkeleton from './components/BookGridSkeleton';
import { Book, FilterState, CategoryChip } from './types';
import { mockBooks } from '../../data/mockBooks';

const BrowseBooks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        searchQuery: '',
        genre: 'all',
        condition: 'all',
        availability: 'all',
        sortBy: 'newest',
        location: '',
        minRating: 0
    });

    const categories: CategoryChip[] = [
        { id: '1', label: 'Fiction', icon: 'BookOpen', genre: 'fiction' },
        { id: '2', label: 'Non-Fiction', icon: 'BookMarked', genre: 'non-fiction' },
        { id: '3', label: 'Self Help', icon: 'Lightbulb', genre: 'self-help' },
        { id: '4', label: 'Romance', icon: 'Heart', genre: 'romance' },
        { id: '5', label: 'Thriller', icon: 'Zap', genre: 'thriller' }];


    const applyFilters = useCallback((currentFilters: FilterState, bookList: Book[]) => {
        let result = [...bookList];

        if (currentFilters.searchQuery) {
            const query = currentFilters.searchQuery.toLowerCase();
            result = result.filter(
                (book) =>
                    book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query)
            );
        }

        if (currentFilters.genre !== 'all') {
            result = result.filter((book) => book.genre === currentFilters.genre);
        }

        if (currentFilters.condition !== 'all') {
            const conditionMap: { [key: string]: string; } = {
                'new': 'New',
                'like-new': 'Like New',
                'good': 'Good',
                'fair': 'Fair',
                'poor': 'Poor'
            };
            result = result.filter((book) => book.condition === conditionMap[currentFilters.condition]);
        }

        if (currentFilters.availability !== 'all') {
            const statusMap: { [key: string]: string; } = {
                'available': 'Available',
                'reserved': 'Reserved'
            };
            result = result.filter((book) => book.status === statusMap[currentFilters.availability]);
        }

        if (currentFilters.minRating > 0) {
            result = result.filter((book) => book.owner.rating >= currentFilters.minRating);
        }

        switch (currentFilters.sortBy) {
            case 'newest':
                result.sort((a, b) => b.listedDate.getTime() - a.listedDate.getTime());
                break;
            case 'popularity':
                result.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'condition':
                const conditionOrder = { 'New': 0, 'Like New': 1, 'Good': 2, 'Fair': 3, 'Poor': 4 };
                result.sort((a, b) => conditionOrder[a.condition] - conditionOrder[b.condition]);
                break;
            case 'alphabetical':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return result;
    }, []);

    useEffect(() => {
        const loadBooks = () => {
            setIsLoading(true);
            setTimeout(() => {
                setBooks(mockBooks);

                // Parse URL parameters
                const searchParams = new URLSearchParams(location.search);
                const searchParam = searchParams.get('search');
                const categoryParam = searchParams.get('category');

                let initialFilters = { ...filters };

                if (searchParam) {
                    initialFilters.searchQuery = searchParam;
                }

                if (categoryParam && categoryParam !== 'all') {
                    initialFilters.genre = categoryParam;
                }

                setFilters(initialFilters);
                const filtered = applyFilters(initialFilters, mockBooks);
                setFilteredBooks(filtered);

                setIsLoading(false);
            }, 1000);
        };

        loadBooks();
    }, [location.search, applyFilters]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        const filtered = applyFilters(newFilters, books);
        setFilteredBooks(filtered);
    };

    const handleCategorySelect = (genre: string) => {
        const newFilters = { ...filters, genre };
        setFilters(newFilters);
        const filtered = applyFilters(newFilters, books);
        setFilteredBooks(filtered);
    };

    const handleRequestExchange = (bookId: string) => {
        console.log('Requesting exchange for book:', bookId);
        navigate('/exchange-requests');
    };

    const handleQuickView = (book: Book) => {
        setSelectedBook(book);
        setIsQuickViewOpen(true);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background">
            <Header
                isAuthenticated={isAuthenticated}
                notificationCount={3}
                onLogout={handleLogout} />


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                        Browse Books
                    </h1>
                    <p className="text-muted-foreground">
                        Discover your next great read from our community of book lovers
                    </p>
                </div>

                <CategoryChips
                    categories={categories}
                    selectedCategory={filters.genre}
                    onCategorySelect={handleCategorySelect} />


                <FilterToolbar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    resultCount={filteredBooks.length}
                    isMobileFilterOpen={isMobileFilterOpen}
                    onToggleMobileFilter={() => setIsMobileFilterOpen(!isMobileFilterOpen)} />


                {isLoading ?
                    <BookGridSkeleton /> :
                    filteredBooks.length > 0 ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredBooks.map((book) =>
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    onRequestExchange={handleRequestExchange}
                                    onQuickView={handleQuickView} />

                            )}
                        </div> :

                        <div className="flex flex-col items-center justify-center py-16 px-4">
                            <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
                                <Icon name="BookOpen" size={48} className="text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                                No books found
                            </h3>
                            <p className="text-muted-foreground text-center max-w-md mb-6">
                                We couldn't find any books matching your criteria. Try adjusting your filters or search terms.
                            </p>
                        </div>
                }
            </main>

            <QuickViewModal
                book={selectedBook}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
                onRequestExchange={handleRequestExchange} />

        </div>);

};

export default BrowseBooks;