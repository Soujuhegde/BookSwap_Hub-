import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Icon from '../components/AppIcon';

const Dashboard = () => {
    const navigate = useNavigate();

    const quickActions = [
        {
            title: 'Browse Books',
            description: 'Discover new books to read',
            icon: 'BookOpen',
            path: '/browse-books',
            color: 'bg-blue-600'
        },
        {
            title: 'My Books',
            description: 'Manage your book collection',
            icon: 'Library',
            path: '/my-books',
            color: 'bg-emerald-600'
        },
        {
            title: 'Exchange Requests',
            description: 'View pending exchanges',
            icon: 'Repeat',
            path: '/exchange-requests',
            color: 'bg-amber-500'
        },
        {
            title: 'About Us',
            description: 'Learn more about our mission',
            icon: 'Info',
            path: '/about',
            color: 'bg-purple-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header isAuthenticated={true} notificationCount={3} onLogout={() => navigate('/login')} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-xl text-gray-600">
                        Ready to find your next favorite book?
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(action.path)}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-left group border border-gray-100"
                        >
                            <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                <Icon name={action.icon} size={28} color="white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                {action.title}
                            </h3>
                            <p className="text-gray-500">
                                {action.description}
                            </p>
                        </button>
                    ))}
                </div>

                {/* Stats Overview */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Activity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-blue-50 rounded-2xl">
                            <div className="text-4xl font-bold text-blue-700 mb-2">12</div>
                            <div className="text-blue-600 font-medium">Books Listed</div>
                        </div>
                        <div className="p-6 bg-green-50 rounded-2xl">
                            <div className="text-4xl font-bold text-green-700 mb-2">5</div>
                            <div className="text-green-600 font-medium">Successful Exchanges</div>
                        </div>
                        <div className="p-6 bg-amber-50 rounded-2xl">
                            <div className="text-4xl font-bold text-amber-700 mb-2">2</div>
                            <div className="text-amber-600 font-medium">Pending Requests</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
