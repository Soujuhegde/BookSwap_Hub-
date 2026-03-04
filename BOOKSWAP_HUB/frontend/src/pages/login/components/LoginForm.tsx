import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../lib/api';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import type { LoginFormData, LoginFormErrors, AuthResponse } from '../types';

interface LoginFormProps {
  onSuccess?: (response: AuthResponse) => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);



  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password,
      });

      const { access_token, user } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      if (onSuccess) {
        // Adapt response to match what onSuccess might expect if strictly typed, 
        // or update types. Assuming onSuccess handles the result.
        // @ts-ignore
        onSuccess({ success: true, accessToken: access_token, user });
      }

      navigate('/browse-books');
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Invalid email or password. Please try again.';
      setErrors({
        general: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality will be implemented soon.');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {errors.general && (
        <div className="p-4 bg-error/10 border border-error rounded-md">
          <p className="text-sm text-error whitespace-pre-line">{errors.general}</p>
        </div>
      )}

      <Input
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange('email')}
        error={errors.email}
        required
        disabled={isLoading}
        className="w-full"
      />

      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange('password')}
        error={errors.password}
        required
        disabled={isLoading}
        className="w-full"
      />

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData.rememberMe}
          onChange={handleInputChange('rememberMe')}
          disabled={isLoading}
        />

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm font-medium text-primary hover:text-primary/90 transition-colors duration-150 ease-out"
          disabled={isLoading}
        >
          Forgot Password?
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;