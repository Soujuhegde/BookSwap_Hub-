import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ExchangeRequestModal from '../components/ExchangeRequestModal';
import { booksApi, Book } from '../lib/api';
import { Search, BookOpen, User, Mail, ArrowRightLeft } from 'lucide-react';

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await booksApi.getAll();
      setBooks(response.data);
    } catch (err) {
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchBooks();
      return;
    }

    try {
      setLoading(true);
      const response = await booksApi.search(searchQuery);
      setBooks(response.data);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Books</h1>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by title, author, or genre..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
            <p className="text-gray-500">Try a different search or check back later</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BookOpen className="h-20 w-20 text-primary-600" />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 flex-1">
                      {book.title}
                    </h3>
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      {book.condition.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-1">by {book.author}</p>
                  {book.genre && (
                    <p className="text-sm text-gray-500 mb-3">Genre: {book.genre}</p>
                  )}

                  {book.description && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {book.description}
                    </p>
                  )}

                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Owner:</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{book.owner.fullName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${book.owner.email}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {book.owner.email}
                      </a>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setShowExchangeModal(true);
                      }}
                      className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                      <span>Request Exchange</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showExchangeModal && selectedBook && (
        <ExchangeRequestModal
          book={selectedBook}
          onClose={() => {
            setShowExchangeModal(false);
            setSelectedBook(null);
          }}
          onSuccess={() => {
            setError('');
            fetchBooks();
          }}
        />
      )}
    </div>
  );
};

export default BooksPage;
