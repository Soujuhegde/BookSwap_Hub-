import { Link } from 'react-router-dom';

interface AuthenticationToggleProps {
  mode: 'login' | 'register';
  className?: string;
}

const AuthenticationToggle = ({ mode, className = '' }: AuthenticationToggleProps) => {
  const isLogin = mode === 'login';

  return (
    <div className={`text-center text-sm ${className}`}>
      <span className="text-muted-foreground">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
      </span>
      <Link
        to={isLogin ? '/register' : '/login'}
        className="font-medium text-primary hover:text-primary/90 transition-colors duration-150 ease-out"
      >
        {isLogin ? 'Sign up' : 'Log in'}
      </Link>
    </div>
  );
};

export default AuthenticationToggle;