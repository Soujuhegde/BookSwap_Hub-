import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Icon from '../../components/AppIcon';
import BookCard from './components/BookCard';
import FilterToolbar from './components/FilterToolbar';
import CategoryChips from './components/CategoryChips';
import QuickViewModal from './components/QuickViewModal';
import BookGridSkeleton from './components/BookGridSkeleton';
import { Book, FilterState, CategoryChip } from './types';

const BrowseBooks = () => {
    const navigate = useNavigate();
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


    const mockBooks: Book[] = [
        {
            id: '1',
            title: 'The Psychology of Money',
            author: 'Morgan Housel',
            genre: 'non-fiction',
            condition: 'Like New',
            status: 'Available',
            imageUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666",
            imageAlt: 'Book cover of The Psychology of Money showing minimalist design with gold and black colors',
            description: 'Timeless lessons on wealth, greed, and happiness. This book explores the strange ways people think about money and teaches you how to make better sense of one of life\'s most important topics.',
            owner: {
                id: 'u1',
                name: 'Sarah Johnson',
                rating: 4.8,
                location: 'New York, NY'
            },
            listedDate: new Date('2024-01-15'),
            popularity: 95
        },
        {
            id: '2',
            title: 'Atomic Habits',
            author: 'James Clear',
            genre: 'self-help',
            condition: 'Good',
            status: 'Available',
            imageUrl: "https://images.unsplash.com/photo-1716171848317-1ca95b7f99ef",
            imageAlt: 'Book cover of Atomic Habits featuring clean typography and minimalist design',
            description: 'An easy and proven way to build good habits and break bad ones. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
            owner: {
                id: 'u2',
                name: 'Michael Chen',
                rating: 4.9,
                location: 'San Francisco, CA'
            },
            listedDate: new Date('2024-01-20'),
            popularity: 98
        },
        {
            id: '3',
            title: 'The Silent Patient',
            author: 'Alex Michaelides',
            genre: 'thriller',
            condition: 'New',
            status: 'Available',
            imageUrl: "https://images.unsplash.com/photo-1709671704815-29c6dccb0adc",
            imageAlt: 'Book cover of The Silent Patient with dark mysterious design and bold title',
            description: 'A shocking psychological thriller about a woman\'s act of violence against her husband and the therapist obsessed with uncovering her motive. Alicia Berenson\'s life is seemingly perfect until one evening when she shoots her husband five times in the face.',
            owner: {
                id: 'u3',
                name: 'Emily Rodriguez',
                rating: 4.7,
                location: 'Chicago, IL'
            },
            listedDate: new Date('2024-01-18'),
            popularity: 92
        },
        {
            id: '4',
            title: 'Ikigai',
            author: 'Héctor García',
            genre: 'self-help',
            condition: 'Like New',
            status: 'Reserved',
            imageUrl: "https://images.unsplash.com/photo-1699284754141-e0ff350f0a5d",
            imageAlt: 'Book cover of Ikigai with Japanese-inspired design and calming colors',
            description: 'The Japanese secret to a long and happy life. According to the Japanese, everyone has an ikigai—a reason for living. And according to the residents of the Japanese village with the world\'s longest-living people, finding it is the key to a happier and longer life.',
            owner: {
                id: 'u4',
                name: 'David Kim',
                rating: 4.6,
                location: 'Seattle, WA'
            },
            listedDate: new Date('2024-01-12'),
            popularity: 88
        },
        {
            id: '5',
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            genre: 'fiction',
            condition: 'Good',
            status: 'Available',
            imageUrl: "https://images.unsplash.com/photo-1630860030552-12e68ffbb896",
            imageAlt: 'Book cover of The Alchemist featuring mystical desert imagery and golden tones',
            description: 'A magical fable about following your dreams. Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.',
            owner: {
                id: 'u5',
                name: 'Lisa Anderson',
                rating: 4.9,
                location: 'Austin, TX'
            },
            listedDate: new Date('2024-01-22'),
            popularity: 96
        },
        {
            id: '6',
            title: 'Sapiens',
            author: 'Yuval Noah Harari',
            genre: 'non-fiction',
            condition: 'Fair',
            status: 'Available',
            imageUrl: "https://images.unsplash.com/photo-1615098711413-bbe8196e0f05",
            imageAlt: 'Book cover of Sapiens with evolutionary imagery and bold typography',
            description: 'A brief history of humankind. From a renowned historian comes a groundbreaking narrative of humanity\'s creation and evolution that explores the ways in which biology and history have defined us.',
            owner: {
                id: 'u6',
                name: 'Robert Taylor',
                rating: 4.5,
                location: 'Boston, MA'
            },
            listedDate: new Date('2024-01-10'),
            popularity: 90
        },
        {
            id: '7',
            title: 'Where the Crawdads Sing',
            author: 'Delia Owens',
            genre: 'fiction',
            condition: 'New',
            status: 'Available',
            imageUrl: "https://images.unsplash.com/photo-1614654709420-94761a8fcc6e",
            imageAlt: 'Book cover of Where the Crawdads Sing featuring marsh landscape and nature elements',
            description: 'A haunting tale of nature, isolation, and resilience. For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast.',
            owner: {
                id: 'u7',
                name: 'Jennifer Martinez',
                rating: 4.8,
                location: 'Miami, FL'
            },
            listedDate: new Date('2024-01-25'),
            popularity: 94
        },
        {
            id: '8',
            title: 'Educated',
            author: 'Tara Westover',
            genre: 'non-fiction',
            condition: 'Good',
            status: 'Available',
            imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_118a918de-1764570695146.png",
            imageAlt: 'Book cover of Educated with mountain landscape and memoir design elements',
            description: 'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. An unforgettable memoir about a young woman who, kept out of school, leaves her survivalist family.',
            owner: {
                id: 'u8',
                name: 'Thomas Wilson',
                rating: 4.7,
                location: 'Denver, CO'
            },
            listedDate: new Date('2024-01-14'),
            popularity: 91
        },
        {
            id: '9',
            title: 'The Midnight Library',
            author: 'Matt Haig',
            genre: 'fiction',
            condition: 'Like New',
            status: 'Available',
            imageUrl: "https://images.unsplash.com/photo-1618508864892-92ea7cf82d2e",
            imageAlt: 'Book cover of The Midnight Library with mystical library setting and starry night theme',
            description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
            owner: {
                id: 'u9',
                name: 'Amanda Brown',
                rating: 4.6,
                location: 'Portland, OR'
            },
            listedDate: new Date('2024-01-19'),
            popularity: 89
        },
        {
            id: '10',
            title: 'Thinking, Fast and Slow',
            author: 'Daniel Kahneman',
            genre: 'non-fiction',
            condition: 'Good',
            status: 'Available',
            imageUrl: "https://images.unsplash.com/photo-1556695725-1275cb8083c5",
            imageAlt: 'Book cover of Thinking Fast and Slow with brain imagery and cognitive science design',
            description: 'A groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.',
            owner: {
                id: 'u10',
                name: 'Christopher Lee',
                rating: 4.8,
                location: 'Philadelphia, PA'
            },
            listedDate: new Date('2024-01-16'),
            popularity: 93
        },
        {
            id: '11',
            title: 'The Seven Husbands of Evelyn Hugo',
            author: 'Taylor Jenkins Reid',
            genre: 'romance',
            condition: 'New',
            status: 'Available',
            imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1750fe1b8-1764570693660.png",
            imageAlt: 'Book cover of The Seven Husbands of Evelyn Hugo with glamorous Hollywood aesthetic',
            description: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.',
            owner: {
                id: 'u11',
                name: 'Jessica White',
                rating: 4.9,
                location: 'Los Angeles, CA'
            },
            listedDate: new Date('2024-01-23'),
            popularity: 97
        },
        {
            id: '12',
            title: 'The Girl on the Train',
            author: 'Paula Hawkins',
            genre: 'thriller',
            condition: 'Fair',
            status: 'Available',
            imageUrl: "https://images.unsplash.com/photo-1588270971242-5ef883847513",
            imageAlt: 'Book cover of The Girl on the Train with mysterious train window view',
            description: 'A debut psychological thriller that will forever change the way you look at other people\'s lives. Rachel takes the same commuter train every morning and night. Every day she rattles down the track, flashes past a stretch of cozy suburban homes.',
            owner: {
                id: 'u12',
                name: 'Daniel Harris',
                rating: 4.5,
                location: 'Washington, DC'
            },
            listedDate: new Date('2024-01-11'),
            popularity: 87
        }];


    useEffect(() => {
        const loadBooks = () => {
            setIsLoading(true);
            setTimeout(() => {
                setBooks(mockBooks);
                setFilteredBooks(mockBooks);
                setIsLoading(false);
            }, 1000);
        };

        loadBooks();
    }, []);

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