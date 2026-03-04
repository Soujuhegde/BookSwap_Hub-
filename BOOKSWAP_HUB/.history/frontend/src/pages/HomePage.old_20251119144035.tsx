import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import {
  BookOpen,
  Users,
  RefreshCw,
  Shield,
  ArrowRight
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Exchange Books,
            <span className="text-primary-600"> Share Stories</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of book lovers. Swap books you've read for new
            adventures waiting to be discovered. Sustainable reading has never
            been easier.
          </p>
          <div className="flex justify-center gap-4">
            {user ? (
              <>
                <Link
                  to="/books"
                  className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Browse Books
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/my-books"
                  className="inline-flex items-center px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
                >
                  My Books
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Simple steps to start your book exchange journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              List Your Books
            </h3>
            <p className="text-gray-600">
              Add books you've finished reading to your collection. Include
              details like condition, genre, and a brief description.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Browse & Connect
            </h3>
            <p className="text-gray-600">
              Explore books from other readers in your community. Find titles
              that interest you and connect with their owners.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <RefreshCw className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Exchange Books
            </h3>
            <p className="text-gray-600">
              Arrange to swap books with other members. Meet up locally or ship
              books to each other. Start your next reading adventure!
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose BookSwap Hub?
            </h2>
            <p className="text-xl text-primary-100">
              Join thousands of readers building a sustainable reading community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">10,000+</h3>
              <p className="text-primary-100">Books Available</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">5,000+</h3>
              <p className="text-primary-100">Active Members</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">25,000+</h3>
              <p className="text-primary-100">Books Exchanged</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">100%</h3>
              <p className="text-primary-100">Safe & Secure</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Book Exchange Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join our community today and discover your next favorite book!
          </p>
          {!user && (
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">BookSwap Hub</span>
            </div>
            <p className="text-gray-400">
              &copy; 2025 BookSwap Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
