import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/login';
import Register from './pages/register';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import BrowseBooks from './pages/browse-books';
import MyBooks from './pages/my-books';
import ExchangeRequests from './pages/exchange-requests';
import UserProfile from './pages/user-profile';
import Contact from './pages/contact';
import BookDetails from './pages/book-details';
import Messages from './pages/messages';
import Wishlist from './pages/wishlist';

import ChatWidget from './components/ChatBot/ChatWidget';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/browse-books" element={<BrowseBooks />} />
          <Route path="/book-details" element={<BookDetails />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/my-books" element={
            <ProtectedRoute>
              <MyBooks />
            </ProtectedRoute>
          } />
          <Route path="/exchange-requests" element={
            <ProtectedRoute>
              <ExchangeRequests />
            </ProtectedRoute>
          } />
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
        </Routes>
        <ChatWidget />
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;

