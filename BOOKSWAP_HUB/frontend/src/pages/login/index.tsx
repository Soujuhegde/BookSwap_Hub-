import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import AuthenticationToggle from '../../components/ui/AuthenticationToggle';
import LoginForm from './components/LoginForm';
import LoginHero from './components/LoginHero';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = (response: any) => {
    const { user } = response;
    // Map backend user to context user
    const contextUser = {
      id: user.id,
      name: user.fullName || user.name, // Handle backend vs frontend naming
      email: user.email,
      avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.name)}&background=random`,
      phone: user.phone,
      address: user.address
    };
    login(contextUser);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to continue your book exchange journey
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-sm border border-border p-8">
              <LoginForm onSuccess={handleLoginSuccess} />
            </div>

            <AuthenticationToggle mode="login" />

            <div className="lg:hidden mt-8 pt-8 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-primary">50K+</p>
                  <p className="text-xs text-muted-foreground mt-1">Books</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">15K+</p>
                  <p className="text-xs text-muted-foreground mt-1">Users</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">25K+</p>
                  <p className="text-xs text-muted-foreground mt-1">Exchanges</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LoginHero />
      </main>
    </div>
  );
};

export default Login;