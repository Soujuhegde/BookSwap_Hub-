import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import StatsCard from './components/StatsCard';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import { Book, BookFormData, BookStats, FilterOptions } from './types';

const MyBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [stats, setStats] = useState<BookStats>({
    totalListings: 0,
    successfulExchanges: 0,
    activeNegotiations: 0,
    totalViews: 0
  });
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    genre: '',
    condition: '',
    sortBy: 'dateAdded'
  });

  useEffect(() => {
    const mockBooks: Book[] = [
    {
      id: '1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      genre: 'Business',
      condition: 'Like New',
      status: 'available',
      description: 'Timeless lessons on wealth, greed, and happiness doing well with money isn\'t necessarily about what you know. It\'s about how you behave. And behavior is hard to teach, even to really smart people.',
      imageUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666",
      imageAlt: 'Book cover of The Psychology of Money showing minimalist design with gold and black colors',
      dateAdded: new Date('2024-01-15'),
      exchangeCount: 3,
      viewCount: 145
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self Help',
      condition: 'Good',
      status: 'in-negotiation',
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. No matter your goals, Atomic Habits offers a proven framework for improving every day.',
      imageUrl: "https://images.unsplash.com/photo-1716171848317-1ca95b7f99ef",
      imageAlt: 'Atomic Habits book cover featuring bold typography on blue background',
      dateAdded: new Date('2024-01-20'),
      exchangeCount: 5,
      viewCount: 234
    },
    {
      id: '3',
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      genre: 'Thriller',
      condition: 'Good',
      status: 'available',
      description: 'The Silent Patient is a shocking psychological thriller of a woman\'s act of violence against her husband and of the therapist obsessed with uncovering her motive.',
      imageUrl: "https://images.unsplash.com/photo-1709671704815-29c6dccb0adc",
      imageAlt: 'The Silent Patient book cover with dark mysterious imagery',
      dateAdded: new Date('2024-02-01'),
      exchangeCount: 2,
      viewCount: 189
    },
    {
      id: '4',
      title: 'Ikigai',
      author: 'Héctor García',
      genre: 'Self Help',
      condition: 'Like New',
      status: 'exchanged',
      description: 'The Japanese Secret to a Long and Happy Life. Discover the Japanese concept of Ikigai, which translates to "a reason to live" or "a reason to jump out of bed in the morning."',
      imageUrl: "https://images.unsplash.com/photo-1699284754141-e0ff350f0a5d",
      imageAlt: 'Ikigai book cover with Japanese-inspired minimalist design',
      dateAdded: new Date('2024-02-10'),
      exchangeCount: 1,
      viewCount: 98
    },
    {
      id: '5',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Fiction',
      condition: 'Fair',
      status: 'available',
      description: 'A magical fable about following your dreams. Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.',
      imageUrl: "https://images.unsplash.com/photo-1627023813330-c7d58fe34835",
      imageAlt: 'The Alchemist book cover featuring desert landscape with mystical elements',
      dateAdded: new Date('2024-02-15'),
      exchangeCount: 4,
      viewCount: 267
    },
    {
      id: '6',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'History',
      condition: 'Good',
      status: 'available',
      description: 'A Brief History of Humankind. From a renowned historian comes a groundbreaking narrative of humanity\'s creation and evolution that explores the ways in which biology and history have defined us.',
      imageUrl: "https://images.unsplash.com/photo-1615098711413-bbe8196e0f05",
      imageAlt: 'Sapiens book cover with evolutionary imagery and bold title',
      dateAdded: new Date('2024-02-20'),
      exchangeCount: 2,
      viewCount: 178
    }];


    setBooks(mockBooks);

    const calculatedStats: BookStats = {
      totalListings: mockBooks.length,
      successfulExchanges: mockBooks.filter((b) => b.status === 'exchanged').length,
      activeNegotiations: mockBooks.filter((b) => b.status === 'in-negotiation').length,
      totalViews: mockBooks.reduce((sum, book) => sum + book.viewCount, 0)
    };
    setStats(calculatedStats);
  }, []);

  useEffect(() => {
    let filtered = [...books];

    if (filters.status !== 'all') {
      filtered = filtered.filter((book) => book.status === filters.status);
    }

    if (filters.genre) {
      filtered = filtered.filter((book) => book.genre === filters.genre);
    }

    if (filters.condition) {
      filtered = filtered.filter((book) => book.condition === filters.condition);
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
          return b.viewCount - a.viewCount;
        case 'dateAdded':
        default:
          return b.dateAdded.getTime() - a.dateAdded.getTime();
      }
    });

    setFilteredBooks(filtered);
  }, [books, filters]);

  const handleAddBook = (data: BookFormData) => {
    const newBook: Book = {
      id: Date.now().toString(),
      ...data,
      status: 'available',
      dateAdded: new Date(),
      exchangeCount: 0,
      viewCount: 0
    };

    setBooks([newBook, ...books]);
    setShowBookForm(false);
    setEditingBook(null);
  };

  const handleEditBook = (data: BookFormData) => {
    if (!editingBook) return;

    setBooks(books.map((book) =>
    book.id === editingBook.id ?
    { ...book, ...data } :
    book
    ));
    setShowBookForm(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter((book) => book.id !== bookId));
      setSelectedBooks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(bookId);
        return newSet;
      });
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedBooks.size} selected books?`)) {
      setBooks(books.filter((book) => !selectedBooks.has(book.id)));
      setSelectedBooks(new Set());
    }
  };

  const handleStatusChange = (bookId: string, status: Book['status']) => {
    setBooks(books.map((book) =>
    book.id === bookId ? { ...book, status } : book
    ));
  };

  const handleSelectBook = (bookId: string) => {
    setSelectedBooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedBooks.size === filteredBooks.length) {
      setSelectedBooks(new Set());
    } else {
      setSelectedBooks(new Set(filteredBooks.map((book) => book.id)));
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} notificationCount={3} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              My Books
            </h1>
            <p className="text-muted-foreground">
              Manage your book collection and track exchanges
            </p>
          </div>
          <Button
            iconName="Plus"
            iconPosition="left"
            onClick={() => {
              setEditingBook(null);
              setShowBookForm(true);
            }}>

            Add New Book
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon="BookOpen"
            label="Total Listings"
            value={stats.totalListings}
            color="bg-primary" />

          <StatsCard
            icon="CheckCircle"
            label="Successful Exchanges"
            value={stats.successfulExchanges}
            color="bg-success" />

          <StatsCard
            icon="Clock"
            label="Active Negotiations"
            value={stats.activeNegotiations}
            color="bg-warning" />

          <StatsCard
            icon="Eye"
            label="Total Views"
            value={stats.totalViews}
            color="bg-accent" />

        </div>

        {books.length > 0 &&
        <>
            <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onBulkDelete={handleBulkDelete}
            selectedCount={selectedBooks.size} />


            <div className="flex items-center justify-between mt-6 mb-4">
              <div className="flex items-center gap-3">
                <input
                type="checkbox"
                checked={selectedBooks.size === filteredBooks.length && filteredBooks.length > 0}
                onChange={handleSelectAll}
                className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring cursor-pointer"
                aria-label="Select all books" />

                <span className="text-sm text-muted-foreground">
                  {selectedBooks.size > 0 ?
                `${selectedBooks.size} selected` :
                `${filteredBooks.length} books`}
                </span>
              </div>
            </div>
          </>
        }

        {filteredBooks.length === 0 && books.length === 0 ?
        <EmptyState onAddBook={() => setShowBookForm(true)} /> :
        filteredBooks.length === 0 ?
        <div className="text-center py-16">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              No books found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to see more results
            </p>
            <Button
            variant="outline"
            onClick={() => setFilters({
              status: 'all',
              genre: '',
              condition: '',
              sortBy: 'dateAdded'
            })}>

              Clear Filters
            </Button>
          </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredBooks.map((book) =>
          <BookCard
            key={book.id}
            book={book}
            onEdit={(book) => {
              setEditingBook(book);
              setShowBookForm(true);
            }}
            onDelete={handleDeleteBook}
            onStatusChange={handleStatusChange}
            isSelected={selectedBooks.has(book.id)}
            onSelect={handleSelectBook} />

          )}
          </div>
        }
      </main>

      {showBookForm &&
      <BookForm
        book={editingBook}
        onSubmit={editingBook ? handleEditBook : handleAddBook}
        onCancel={() => {
          setShowBookForm(false);
          setEditingBook(null);
        }} />

      }
    </div>);

};

export default MyBooks;