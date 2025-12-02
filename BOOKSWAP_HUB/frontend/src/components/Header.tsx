import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './AppIcon';
import NotificationBadge from './ui/NotificationBadge';

interface HeaderProps {
  isAuthenticated?: boolean;
  notificationCount?: number;
  onLogout?: () => void;
}

const Header = ({ isAuthenticated = false, notificationCount = 0, onLogout }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Browse Books', path: '/browse-books', icon: 'BookOpen', public: true },
    { label: 'My Books', path: '/my-books', icon: 'Library', requiresAuth: true },
    { label: 'Exchanges', path: '/exchange-requests', icon: 'Repeat', requiresAuth: true, hasNotification: true },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  // Check if we're on an authentication page (login, register, or signup)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/signup';

  const filteredNavItems = navigationItems.filter(item => {
    // Hide Browse Books on auth pages
    if (isAuthPage && item.path === '/browse-books') {
      return false;
    }
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

        <nav className="hidden md:flex items-center gap-6">
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
              {item.hasNotification && notificationCount > 0 && (
                <NotificationBadge count={notificationCount} />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
            >
              <Icon name="LogOut" size={18} />
              <span>Logout</span>
            </button>
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
        </div>

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
                {item.hasNotification && notificationCount > 0 && (
                  <NotificationBadge count={notificationCount} />
                )}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-border">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-150 ease-out"
                >
                  <Icon name="LogOut" size={20} />
                  <span>Logout</span>
                </button>
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