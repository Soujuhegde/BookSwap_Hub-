import { useState } from 'react';
import Header from '../../components/Header';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoForm from './components/PersonalInfoForm';
import SecuritySettings from './components/SecuritySettings';
import ExchangeHistory from './components/ExchangeHistory';
import PrivacySettings from './components/PrivacySettings';
import AccountStatistics from './components/AccountStatistics';
import EmailVerification from './components/EmailVerification';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isImageUploading, setIsImageUploading] = useState(false);

    const [userData, setUserData] = useState({
        name: "John Reader",
        email: "john@bookswap.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        bio: "Passionate reader with a love for classic literature and contemporary fiction. Always looking to discover new authors and share great books with fellow readers. Member of local book club and advocate for sustainable reading practices.",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_130f98b20-1763296361147.png",
        avatarAlt: "Professional headshot of young man with short brown hair wearing casual blue shirt smiling warmly at camera",
        memberSince: "January 2024",
        emailVerified: false,
        stats: {
            booksListed: 24,
            exchanges: 18,
            averageRating: 4.8,
            partners: 12,
            booksGiven: 18,
            booksReceived: 18
        }
    });

    const [privacySettings, setPrivacySettings] = useState({
        visibility: {
            showProfile: true,
            showHistory: true,
            showLocation: true
        },
        contact: {
            allowMessages: true,
            showEmail: false,
            showPhone: false
        },
        notifications: {
            email: true,
            exchangeRequests: true,
            messages: true,
            marketing: false
        }
    });

    const exchangeHistory = [
        {
            id: 1,
            bookTitle: "The Great Gatsby",
            bookAuthor: "F. Scott Fitzgerald",
            bookImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1802358da-1764061936363.png",
            bookImageAlt: "Classic novel The Great Gatsby with iconic green cover featuring art deco design and golden lettering",
            type: "given",
            partnerName: "Sarah Mitchell",
            rating: 5,
            feedback: "Great condition! Fast exchange. Highly recommend.",
            date: "11/20/2025",
            status: "completed"
        },
        {
            id: 2,
            bookTitle: "1984",
            bookAuthor: "George Orwell",
            bookImage: "https://images.unsplash.com/photo-1622609184693-58079bb6742f",
            bookImageAlt: "Dystopian novel 1984 by George Orwell with dark cover showing surveillance eye imagery and bold typography",
            type: "received",
            partnerName: "Michael Chen",
            rating: 5,
            feedback: "Excellent book in perfect condition. Thank you!",
            date: "11/18/2025",
            status: "completed"
        },
        {
            id: 3,
            bookTitle: "To Kill a Mockingbird",
            bookAuthor: "Harper Lee",
            bookImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbf9fef8-1764061933471.png",
            bookImageAlt: "Classic American novel To Kill a Mockingbird with vintage cover showing tree silhouette and southern gothic design",
            type: "given",
            partnerName: "Emily Rodriguez",
            rating: 4,
            feedback: "Good exchange experience. Book was as described.",
            date: "11/15/2025",
            status: "completed"
        },
        {
            id: 4,
            bookTitle: "Pride and Prejudice",
            bookAuthor: "Jane Austen",
            bookImage: "https://images.unsplash.com/photo-1597207838189-ad30cd468883",
            bookImageAlt: "Romantic classic Pride and Prejudice with elegant cover featuring period dress silhouettes and ornate Victorian typography",
            type: "received",
            partnerName: "David Thompson",
            rating: 5,
            feedback: "Beautiful edition! Very happy with this exchange.",
            date: "11/10/2025",
            status: "completed"
        },
        {
            id: 5,
            bookTitle: "The Catcher in the Rye",
            bookAuthor: "J.D. Salinger",
            bookImage: "https://img.rocket.new/generatedImages/rocket_gen_img_117a36b78-1764061933917.png",
            bookImageAlt: "Coming-of-age novel The Catcher in the Rye with minimalist red cover and simple black text design",
            type: "given",
            partnerName: "Lisa Anderson",
            rating: 5,
            feedback: "Perfect condition and quick meetup. Thanks!",
            date: "11/05/2025",
            status: "completed"
        }
    ];

    const tabs = [
        { id: 'profile', label: 'Profile Information', icon: 'User' },
        { id: 'security', label: 'Security', icon: 'Lock' },
        { id: 'history', label: 'Exchange History', icon: 'History' },
        { id: 'privacy', label: 'Privacy Settings', icon: 'Shield' },
        { id: 'statistics', label: 'Statistics', icon: 'BarChart3' }
    ];

    const handleImageUpload = (file: File) => {
        setIsImageUploading(true);
        setTimeout(() => {
            const imageUrl = URL.createObjectURL(file);
            setUserData((prev) => ({
                ...prev,
                avatar: imageUrl,
                avatarAlt: "User uploaded profile photo showing person in casual attire with friendly expression"
            }));
            setIsImageUploading(false);
        }, 1500);
    };

    const handleProfileSave = (formData: any) => {
        setUserData((prev) => ({ ...prev, ...formData }));
    };

    const handlePrivacySave = (settings: any) => {
        setPrivacySettings(settings);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <PersonalInfoForm userData={userData} onSave={handleProfileSave} />;
            case 'security':
                return <SecuritySettings />;
            case 'history':
                return <ExchangeHistory exchanges={exchangeHistory} />;
            case 'privacy':
                return <PrivacySettings initialSettings={privacySettings} onSave={handlePrivacySave} />;
            case 'statistics':
                return <AccountStatistics stats={userData?.stats} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-6 pb-12 px-4 lg:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
                        <p className="text-muted-foreground">Manage your account settings and preferences</p>
                    </div>

                    <ProfileHeader
                        userData={userData}
                        onImageUpload={handleImageUpload}
                        isUploading={isImageUploading}
                    />

                    <div className="mb-6">
                        <EmailVerification isVerified={userData?.emailVerified} email={userData?.email} />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-64 flex-shrink-0">
                            <div className="bg-card border border-border rounded-xl p-3 sticky top-24 shadow-sm">
                                <nav className="space-y-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                                ? 'bg-primary text-white shadow-md transform scale-[1.02]'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                                                }`}
                                        >
                                            <span className="text-lg">
                                                {tab.icon === 'User' ? '👤' :
                                                    tab.icon === 'Lock' ? '🔒' :
                                                        tab.icon === 'History' ? '📜' :
                                                            tab.icon === 'Shield' ? '🛡️' : '📊'}
                                            </span>
                                            <span>{tab.label}</span>
                                            {activeTab === tab.id && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfile;