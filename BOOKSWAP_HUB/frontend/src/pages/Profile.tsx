import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // Mock user data
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        const parsedUser = savedUser ? JSON.parse(savedUser) : null;

        return {
            name: parsedUser?.name || 'Soujanya S P',
            email: parsedUser?.email || 'soujanya@example.com',
            phone: '+91 98765 43210',
            location: 'Bangalore, India',
            bio: 'Book lover, coffee enthusiast, and founder of BookSwap Hub. Always looking for the next great mystery novel.',
            joinDate: 'January 2024',
            avatar: '/Founder img.jpeg', // Using the founder image as default for now
            stats: {
                booksListed: 12,
                exchanges: 5,
                rating: 4.8
            }
        };
    });

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header isAuthenticated={true} notificationCount={3} onLogout={handleLogout} />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-100"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-white">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                                        }}
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(!isEditing)}
                                iconName={isEditing ? 'Check' : 'Edit'}
                                iconPosition="left"
                            >
                                {isEditing ? 'Save Profile' : 'Edit Profile'}
                            </Button>
                        </div>

                        <div>
                            {isEditing ? (
                                <div className="space-y-4 mb-4 max-w-md">
                                    <Input
                                        label="Name"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    />
                                    <Input
                                        label="Location"
                                        value={user.location}
                                        onChange={(e) => setUser({ ...user, location: e.target.value })}
                                    />
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
                                    <p className="text-gray-500 flex items-center gap-2 mb-4">
                                        <Icon name="MapPin" size={16} />
                                        {user.location}
                                        <span className="mx-2">•</span>
                                        Joined {user.joinDate}
                                    </p>
                                </>
                            )}

                            {isEditing ? (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        value={user.bio}
                                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-600 max-w-2xl leading-relaxed">
                                    {user.bio}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Icon name="BookOpen" size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{user.stats.booksListed}</div>
                            <div className="text-sm text-gray-500">Books Listed</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <Icon name="Repeat" size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{user.stats.exchanges}</div>
                            <div className="text-sm text-gray-500">Exchanges</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                            <Icon name="Star" size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{user.stats.rating}</div>
                            <div className="text-sm text-gray-500">Rating</div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <Icon name="Mail" size={20} className="text-gray-400" />
                            <div className="flex-1">
                                <div className="text-sm text-gray-500">Email Address</div>
                                {isEditing ? (
                                    <Input
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        className="mt-1"
                                    />
                                ) : (
                                    <div className="font-medium text-gray-900">{user.email}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <Icon name="Phone" size={20} className="text-gray-400" />
                            <div className="flex-1">
                                <div className="text-sm text-gray-500">Phone Number</div>
                                {isEditing ? (
                                    <Input
                                        value={user.phone}
                                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                        className="mt-1"
                                    />
                                ) : (
                                    <div className="font-medium text-gray-900">{user.phone}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
