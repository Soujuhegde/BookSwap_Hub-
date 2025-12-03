import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/login';
import Register from './pages/register';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import BrowseBooks from './pages/browse-books';
import MyBooks from './pages/my-books';
import ExchangeRequests from './pages/exchange-requests';
import Profile from './pages/Profile';
import Contact from './pages/contact';
import BookDetails from './pages/book-details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/browse-books" element={<BrowseBooks />} />
      <Route path="/book-details" element={<BookDetails />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path="/exchange-requests" element={<ExchangeRequests />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;

