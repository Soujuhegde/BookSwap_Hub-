import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  // Check if user is authenticated via context or localStorage
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Check both user state and localStorage for authentication
  const isAuthenticated = user || (token && storedUser);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    console.log('PrivateRoute - not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
