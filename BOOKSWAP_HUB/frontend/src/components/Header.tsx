import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';
import NotificationBadge from './ui/NotificationBadge';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  notificationCount?: number;
}

const Header = ({ notificationCount = 0 }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { isAuthenticated, logout, user } = useAuth();

  const navigationItems = [
    { label: 'Home', path: '/', icon: 'Home', public: true },
    { label: 'My Dashboard', path: '/dashboard', icon: 'LayoutDashboard', requiresAuth: true },
    { label: 'Browse Books', path: '/browse-books', icon: 'BookOpen', public: true },
    { label: 'My Books', path: '/my-books', icon: 'Library', requiresAuth: true },
    { label: 'Exchanges', path: '/exchange-requests', icon: 'Repeat', requiresAuth: true, hasNotification: true },
    { label: 'Messages', path: '/messages', icon: 'MessageSquare', requiresAuth: true, hasNotification: true },
    { label: 'Wishlist', path: '/wishlist', icon: 'Heart', requiresAuth: true },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  // Check if we're on an authentication page (login, register, or signup)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/signup';

  const filteredNavItems = navigationItems.filter(item => {
    // Hide Browse Books on auth pages
    if (isAuthPage && item.path === '/browse-books') {
      return false;
    }
    // @ts-ignore - item.public is not strictly typed but exists in the array
    return item.public || (item.requiresAuth && isAuthenticated);
  });

  return (
    <header className="sticky top-0 z-[100] w-full bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        <Link
          to={isAuthenticated ? '/browse-books' : '/'}
          className="flex items-center gap-3 transition-opacity duration-150 ease-out hover:opacity-80"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Icon name="BookMarked" size={24} color="white" />
          </div>
          <span className="text-xl font-pacifico font-semibold text-foreground">
            BookSwap Hub
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-all duration-150 ease-out ${isActivePath(item.path)
                ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {/* @ts-ignore - hasNotification is optional */}
              {item.hasNotification && notificationCount > 0 && (
                <NotificationBadge count={notificationCount} />
              )}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="relative group">
              <Link to="/profile"
                className="flex items-center gap-2 focus:outline-none"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-primary/20 hover:opacity-80 transition-opacity" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                    <Icon name="User" size={20} />
                  </div>
                )}
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 hidden group-hover:block animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-2 border-b border-gray-50 mb-2">
                  <p className="text-sm font-bold text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                >
                  <Icon name="User" size={16} />
                  View Profile
                </Link>
                <Link
                  to="/my-books"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                >
                  <Icon name="BookOpen" size={16} />
                  My Books
                </Link>
                <div className="h-px bg-gray-50 my-2"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <Icon name="LogOut" size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-bold transition-colors text-[16px]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
          aria-label="Toggle menu"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col p-4 space-y-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all duration-150 ease-out ${isActivePath(item.path)
                  ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
                {/* @ts-ignore */}
                {item.hasNotification && notificationCount > 0 && (
                  <NotificationBadge count={notificationCount} />
                )}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-border">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 mb-2">
                    <p className="text-sm font-bold text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-150 ease-out"
                  >
                    <Icon name="User" size={20} />
                    <span>View Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-md transition-all duration-150 ease-out"
                  >
                    <Icon name="LogOut" size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-150 ease-out"
                  >
                    <Icon name="LogIn" size={20} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 mt-2 text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-all duration-150 ease-out"
                  >
                    <Icon name="UserPlus" size={20} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;