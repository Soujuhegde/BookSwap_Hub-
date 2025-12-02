import { useState, FormEvent } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import TermsCheckbox from './CombinedTermsCheckbox';
import SuccessModal from './SuccessModal';
import type { RegisterFormData, ValidationErrors } from '../types';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState<RegisterFormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        agreeToPrivacy: false,
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else {
            const passwordRequirements = [
                formData.password.length >= 8,
                /[A-Z]/.test(formData.password),
                /[a-z]/.test(formData.password),
                /\d/.test(formData.password),
                /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
            ];

            if (!passwordRequirements.every(Boolean)) {
                newErrors.password = 'Password does not meet all requirements';
            }
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the Terms of Service';
        }

        if (!formData.agreeToPrivacy) {
            newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const existingEmails = ['john@example.com', 'sarah@example.com'];
            if (existingEmails.includes(formData.email.toLowerCase())) {
                setErrors({ email: 'This email is already registered. Please use a different email or login.' });
                setIsLoading(false);
                return;
            }

            setShowSuccessModal(true);
        } catch (error) {
            setErrors({ email: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof RegisterFormData, value: string | string[] | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    error={errors.fullName}
                    required
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    required
                />

                <div className="space-y-2">
                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            error={errors.password}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                        </button>
                    </div>
                    <PasswordStrengthIndicator password={formData.password} />
                </div>

                <div className="relative">
                    <Input
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        error={errors.confirmPassword}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                        <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                </div>

                <div className="space-y-3 pt-2">
                    <TermsCheckbox
                        type="terms"
                        checked={formData.agreeToTerms}
                        onChange={(checked) => handleInputChange('agreeToTerms', checked)}
                        error={errors.agreeToTerms}
                    />

                    <TermsCheckbox
                        type="privacy"
                        checked={formData.agreeToPrivacy}
                        onChange={(checked) => handleInputChange('agreeToPrivacy', checked)}
                        error={errors.agreeToPrivacy}
                    />
                </div>

                <Button
                    type="submit"
                    variant="default"
                    fullWidth
                    loading={isLoading}
                    iconName="UserPlus"
                    iconPosition="right"
                    className="mt-6"
                >
                    Create Account
                </Button>
            </form>

            <SuccessModal
                isOpen={showSuccessModal}
                email={formData.email}
                onClose={() => setShowSuccessModal(false)}
            />
        </>
    );
};

export default RegisterForm;
