
import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

interface UserData {
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
}

interface PersonalInfoFormProps {
    userData: UserData;
    onSave: (data: UserData) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ userData, onSave }) => {
    const [formData, setFormData] = useState<UserData>({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        location: userData?.location || '',
        bio: userData?.bio || ''
    });
    const [errors, setErrors] = useState<Partial<UserData>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const validateForm = () => {
        const newErrors: Partial<UserData> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number format';
        }

        if (formData.bio && formData.bio.length > 500) {
            newErrors.bio = 'Bio must be less than 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof UserData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setSaveSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSaving(true);
        setTimeout(() => {
            onSave(formData);
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
                {saveSuccess && (
                    <div className="flex items-center gap-2 text-success text-sm animate-fade-in">
                        <Icon name="CheckCircle" size={16} />
                        <span>Changes saved successfully</span>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                        placeholder="Enter your full name"
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        placeholder="your.email@example.com"
                    />

                    <Input
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        placeholder="+1 (555) 123-4567"
                    />

                    <Input
                        label="Location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, State"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        maxLength={500}
                        placeholder="Tell us about yourself and your reading interests..."
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                    <div className="flex items-center justify-between mt-1">
                        {errors.bio && <p className="text-sm text-error">{errors.bio}</p>}
                        <p className="text-xs text-muted-foreground ml-auto">
                            {formData.bio.length}/500 characters
                        </p>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        variant="default"
                        loading={isSaving}
                        iconName="Save"
                        iconPosition="left"
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoForm;
