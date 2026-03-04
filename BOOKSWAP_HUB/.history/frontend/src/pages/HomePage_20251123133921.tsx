import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NewHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredBooks = [
    {
      id: 1,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      condition: 'Like New',
      location: 'Mumbai',
      image: 'https://readdy.ai/api/search-image?query=The%20Psychology%20of%20Money%20book%20cover%20by%20Morgan%20Housel%20on%20clean%20white%20background%2C%20professional%20book%20photography%20with%20soft%20lighting&width=300&height=400&seq=1&orientation=portrait',
      owner: 'Priya Sharma',
      category: 'Business'
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      condition: 'Good',
      location: 'Delhi',
      image: 'https://readdy.ai/api/search-image?query=Atomic%20Habits%20book%20cover%20by%20James%20Clear%20on%20clean%20white%20background%2C%20professional%20book%20photography%20with%20soft%20lighting&width=300&height=400&seq=2&orientation=portrait',
      owner: 'Rahul Kumar',
      category: 'Self Help'
    },
    {
      id: 3,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      condition: 'Excellent',
      location: 'Bangalore',
      image: 'https://readdy.ai/api/search-image?query=The%20Silent%20Patient%20book%20cover%20by%20Alex%20Michaelides%20on%20clean%20white%20background%2C%20professional%20book%20photography%20with%20soft%20lighting&width=300&height=400&seq=3&orientation=portrait',
      owner: 'Sneha Patel',
      category: 'Thriller'
    },
    {
      id: 4,
      title: 'Ikigai',
      author: 'Hector Garcia',
      condition: 'Very Good',
      location: 'Chennai',
      image: 'https://readdy.ai/api/search-image?query=Ikigai%20book%20cover%20by%20Hector%20Garcia%20on%20clean%20white%20background%2C%20professional%20book%20photography%20with%20soft%20lighting&width=300&height=400&seq=4&orientation=portrait',
      owner: 'Arjun Nair',
      category: 'Philosophy'
    },
    {
      id: 5,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      condition: 'Good',
      location: 'Pune',
      image: 'https://readdy.ai/api/search-image?query=The%20Alchemist%20book%20cover%20by%20Paulo%20Coelho%20on%20clean%20white%20background%2C%20professional%20book%20photography%20with%20soft%20lighting&width=300&height=400&seq=5&orientation=portrait',
      owner: 'Kavya Singh',
      category: 'Fiction'
    },
    {
      id: 6,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      condition: 'Like New',
      location: 'Hyderabad',
      image: 'https://readdy.ai/api/search-image?query=Sapiens%20book%20cover%20by%20Yuval%20Noah%20Harari%20on%20clean%20white%20background%2C%20professional%20book%20photography%20with%20soft%20lighting&width=300&height=400&seq=6&orientation=portrait',
      owner: 'Vikram Reddy',
      category: 'History'
    }
  ];

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Self Help',
    'Business',
    'Thriller',
    'Romance',
    'Science',
    'History',
    'Philosophy',
    'Biography'
  ];

  const stats = [
    { number: '50,000+', label: 'Books Available' },
    { number: '15,000+', label: 'Active Users' },
    { number: '25,000+', label: 'Successful Exchanges' },
    { number: '100+', label: 'Cities Covered' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-purple-50 py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage:
              "url('https://readdy.ai/api/search-image?query=Modern%20library%20with%20books%20floating%20in%20air%2C%20people%20reading%20and%20exchanging%20books%2C%20warm%20lighting%2C%20community%20atmosphere%2C%20minimalist%20design&width=1200&height=600&seq=7&orientation=landscape')"
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Exchange Books,
              <span className="text-primary-600"> Share Stories</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of book lovers in our community. List books you've finished,
              discover new reads, and connect with fellow readers for meaningful book exchanges.
            </p>
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
                <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 whitespace-nowrap">
                  <i className="ri-search-line mr-2"></i>
                  Search Books
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/books"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 whitespace-nowrap"
              >
                <i className="ri-book-open-line mr-2"></i>
                Browse Books
              </Link>
              <Link
                to="/my-books"
                className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                List Your Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Listed Books */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Recently Listed Books</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing books from our community members. These are some of the latest
              additions to our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {book.title}
                    </h4>
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                      {book.condition}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">by {book.author}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <i className="ri-map-pin-line mr-1"></i>
                    {book.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                        <i className="ri-user-line text-primary-600"></i>
                      </div>
                      <span className="text-sm text-gray-600">{book.owner}</span>
                    </div>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm whitespace-nowrap">
                      Request Exchange
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/books"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 whitespace-nowrap"
            >
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How BookSwap Hub Works</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with book exchanges is simple. Follow these easy steps to begin your
              journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-book-line text-2xl text-primary-600"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">List Your Books</h4>
              <p className="text-gray-600">
                Add books you've finished reading with photos, condition details, and your location.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-search-line text-2xl text-primary-600"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Find Books</h4>
              <p className="text-gray-600">
                Browse our collection and search for books you want to read by title, author, or
                genre.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-exchange-line text-2xl text-primary-600"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Exchange</h4>
              <p className="text-gray-600">
                Connect with book owners, negotiate exchanges, and arrange meetups or shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h3>
            <p className="text-gray-600">Explore books across different genres and topics</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category}
                to={`/books?category=${category.toLowerCase()}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
                  <i
                    className={`ri-book-${
                      index % 3 === 0 ? 'open' : index % 3 === 1 ? '2' : '3'
                    }-line text-primary-600`}
                  ></i>
                </div>
                <h4 className="font-medium text-gray-900">{category}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Exchanging?</h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community of book lovers and start discovering your next great read today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-50 font-medium whitespace-nowrap"
            >
              Create Account
            </Link>
            <Link
              to="/books"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-primary-700 whitespace-nowrap"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 font-pacifico">
                BookSwap Hub
              </h4>
              <p className="text-gray-400 mb-4">
                Connecting book lovers worldwide through sustainable book exchanges.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="ri-facebook-fill text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="ri-twitter-fill text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="ri-instagram-fill text-xl"></i>
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/books" className="hover:text-white">
                    Browse Books
                  </Link>
                </li>
                <li>
                  <Link to="/my-books" className="hover:text-white">
                    List a Book
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="hover:text-white">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/safety" className="hover:text-white">
                    Safety Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/feedback" className="hover:text-white">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BookSwap Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewHomePage;
