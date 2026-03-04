import { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

interface PrivacySettingsData {
    visibility: {
        showProfile: boolean;
        showHistory: boolean;
        showLocation: boolean;
    };
    contact: {
        allowMessages: boolean;
        showEmail: boolean;
        showPhone: boolean;
    };
    notifications: {
        email: boolean;
        exchangeRequests: boolean;
        messages: boolean;
        marketing: boolean;
    };
}

interface PrivacySettingsProps {
    initialSettings: PrivacySettingsData;
    onSave: (settings: PrivacySettingsData) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ initialSettings, onSave }) => {
    const [settings, setSettings] = useState<PrivacySettingsData>(initialSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleToggle = (category: keyof PrivacySettingsData, key: string) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: !prev[category][key as keyof typeof prev[typeof category]]
            }
        }));
        setSaveSuccess(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            onSave(settings);
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Privacy Settings</h2>
                {saveSuccess && (
                    <div className="flex items-center gap-2 text-success text-sm animate-fade-in">
                        <Icon name="CheckCircle" size={16} />
                        <span>Settings saved successfully</span>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h3 className="text-base font-medium text-foreground mb-4">Profile Visibility</h3>
                    <div className="space-y-3 pl-2">
                        <Checkbox
                            label="Show my profile to other users"
                            description="Allow other users to view your profile and book listings"
                            checked={settings.visibility.showProfile}
                            onChange={() => handleToggle('visibility', 'showProfile')}
                        />
                        <Checkbox
                            label="Show my exchange history"
                            description="Display your completed exchanges and ratings on your profile"
                            checked={settings.visibility.showHistory}
                            onChange={() => handleToggle('visibility', 'showHistory')}
                        />
                        <Checkbox
                            label="Show my location"
                            description="Display your city and state to help with local exchanges"
                            checked={settings.visibility.showLocation}
                            onChange={() => handleToggle('visibility', 'showLocation')}
                        />
                    </div>
                </div>

                <div className="border-t border-border pt-6">
                    <h3 className="text-base font-medium text-foreground mb-4">Contact Preferences</h3>
                    <div className="space-y-3 pl-2">
                        <Checkbox
                            label="Allow direct messages"
                            description="Let other users send you messages about book exchanges"
                            checked={settings.contact.allowMessages}
                            onChange={() => handleToggle('contact', 'allowMessages')}
                        />
                        <Checkbox
                            label="Show email address"
                            description="Display your email on your profile for direct contact"
                            checked={settings.contact.showEmail}
                            onChange={() => handleToggle('contact', 'showEmail')}
                        />
                        <Checkbox
                            label="Show phone number"
                            description="Display your phone number for exchange coordination"
                            checked={settings.contact.showPhone}
                            onChange={() => handleToggle('contact', 'showPhone')}
                        />
                    </div>
                </div>

                <div className="border-t border-border pt-6">
                    <h3 className="text-base font-medium text-foreground mb-4">Notification Preferences</h3>
                    <div className="space-y-3 pl-2">
                        <Checkbox
                            label="Email notifications"
                            description="Receive email updates about exchange requests and messages"
                            checked={settings.notifications.email}
                            onChange={() => handleToggle('notifications', 'email')}
                        />
                        <Checkbox
                            label="Exchange request notifications"
                            description="Get notified when someone requests to exchange books with you"
                            checked={settings.notifications.exchangeRequests}
                            onChange={() => handleToggle('notifications', 'exchangeRequests')}
                        />
                        <Checkbox
                            label="Message notifications"
                            description="Receive alerts when you get new messages"
                            checked={settings.notifications.messages}
                            onChange={() => handleToggle('notifications', 'messages')}
                        />
                        <Checkbox
                            label="Marketing communications"
                            description="Receive updates about new features and community events"
                            checked={settings.notifications.marketing}
                            onChange={() => handleToggle('notifications', 'marketing')}
                        />
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
                        Save Preferences
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PrivacySettings;