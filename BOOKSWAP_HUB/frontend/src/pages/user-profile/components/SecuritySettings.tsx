import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecuritySettings = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isChanging, setIsChanging] = useState(false);
    const [changeSuccess, setChangeSuccess] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        const levels = [
            { strength: 0, label: 'Very Weak', color: 'bg-error' },
            { strength: 1, label: 'Weak', color: 'bg-warning' },
            { strength: 2, label: 'Fair', color: 'bg-warning' },
            { strength: 3, label: 'Good', color: 'bg-accent' },
            { strength: 4, label: 'Strong', color: 'bg-success' },
            { strength: 5, label: 'Very Strong', color: 'bg-success' }
        ];

        return levels[strength];
    };

    const passwordStrength = getPasswordStrength(formData.newPassword);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        } else if (formData.newPassword === formData.currentPassword) {
            newErrors.newPassword = 'New password must be different from current password';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setChangeSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsChanging(true);
        setTimeout(() => {
            setIsChanging(false);
            setChangeSuccess(true);
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setChangeSuccess(false), 3000);
        }, 1000);
    };

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Security Settings</h2>
                {changeSuccess && (
                    <div className="flex items-center gap-2 text-success text-sm animate-fade-in">
                        <Icon name="CheckCircle" size={16} />
                        <span>Password changed successfully</span>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Input
                        label="Current Password"
                        type={showPasswords.current ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        error={errors.currentPassword}
                        required
                        placeholder="Enter current password"
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Icon name={showPasswords.current ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                </div>

                <div className="relative">
                    <Input
                        label="New Password"
                        type={showPasswords.new ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        error={errors.newPassword}
                        required
                        placeholder="Enter new password"
                        description="Must be at least 8 characters with uppercase, lowercase, and numbers"
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Icon name={showPasswords.new ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                    {formData.newPassword && (
                        <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Password Strength:</span>
                                <span className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                                    {passwordStrength.label}
                                </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <Input
                        label="Confirm New Password"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        required
                        placeholder="Confirm new password"
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Icon name={showPasswords.confirm ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                </div>

                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        variant="default"
                        loading={isChanging}
                        iconName="Lock"
                        iconPosition="left"
                    >
                        Change Password
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SecuritySettings;