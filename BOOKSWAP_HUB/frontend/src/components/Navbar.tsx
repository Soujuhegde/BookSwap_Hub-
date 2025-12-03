import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './AppIcon';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-background shadow-sm border-b">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Icon name="BookMarked" size={24} color="white" />
              </div>
              <span className="text-2xl font-bold text-primary font-pacifico">
                BookSwap Hub
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleHomeClick}
              className="text-gray-800 hover:text-primary font-bold transition-colors text-[16px]"
            >
              Home
            </button>
            <Link to="/about" className="text-gray-800 hover:text-primary font-bold transition-colors text-[16px]">
              About
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-primary font-bold transition-colors text-[16px]">
              Contact Us
            </Link>
            <Link to="/login" className="text-primary hover:text-primary/80 font-bold transition-colors text-[16px]">
              Login
            </Link>
            <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 font-medium transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
