import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, User, LoginData, RegisterData } from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      authApi.getProfile()
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data: LoginData) => {
    try {
      console.log('AuthContext - login called with data:', { email: data.email });
      const response = await authApi.login(data);
      console.log('AuthContext - API response received:', response);

      const { access_token, user } = response.data;
      console.log('AuthContext - Extracted from response:', { access_token: access_token ? 'exists' : 'missing', user });

      if (!access_token || !user) {
        throw new Error('Invalid response from server - missing token or user data');
      }

      // Store token and user data first (PrivateRoute will check this)
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('AuthContext - Data stored in localStorage');
      console.log('AuthContext - Token in localStorage:', localStorage.getItem('token'));
      console.log('AuthContext - User in localStorage:', localStorage.getItem('user'));

      // Update state
      setUser(user);

      console.log('AuthContext - State updated, user set to:', user);
      console.log('AuthContext - login complete successfully');
    } catch (error) {
      console.error('AuthContext - login error:', error);
      // Clear any stored data on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      console.log('AuthContext - register called');
      const response = await authApi.register(data);
      const { access_token, user } = response.data;

      console.log('AuthContext - register response:', { access_token, user });

      // Store token and user data first (PrivateRoute will check this)
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('AuthContext - stored token and user in localStorage');

      // Update state
      setUser(user);

      console.log('AuthContext - register complete');
    } catch (error) {
      console.error('AuthContext - register error:', error);
      // Clear any stored data on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
