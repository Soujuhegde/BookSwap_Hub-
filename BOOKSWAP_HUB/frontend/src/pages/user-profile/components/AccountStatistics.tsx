import Icon from '../../../components/AppIcon';

interface Stats {
    booksListed: number;
    exchanges: number;
    averageRating: number;
    partners: number;
    booksGiven: number;
    booksReceived: number;
}

interface AccountStatisticsProps {
    stats: Stats;
}

const AccountStatistics: React.FC<AccountStatisticsProps> = ({ stats }) => {
    const statisticsData = [
        {
            icon: 'BookOpen',
            label: 'Books Listed',
            value: stats.booksListed,
            color: 'text-primary',
            bgColor: 'bg-primary/5'
        },
        {
            icon: 'RefreshCw',
            label: 'Successful Exchanges',
            value: stats.exchanges,
            color: 'text-primary',
            bgColor: 'bg-primary/5'
        },
        {
            icon: 'Star',
            label: 'Average Rating',
            value: `${stats.averageRating}/5`,
            color: 'text-primary',
            bgColor: 'bg-primary/5'
        },
        {
            icon: 'Users',
            label: 'Exchange Partners',
            value: stats.partners,
            color: 'text-primary',
            bgColor: 'bg-primary/5'
        },
        {
            icon: 'TrendingUp',
            label: 'Books Given',
            value: stats.booksGiven,
            color: 'text-primary',
            bgColor: 'bg-primary/5'
        },
        {
            icon: 'TrendingDown',
            label: 'Books Received',
            value: stats.booksReceived,
            color: 'text-primary',
            bgColor: 'bg-primary/5'
        }
    ];

    return (
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Icon name="BarChart2" size={24} className="text-primary" />
                Account Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statisticsData.map((stat, index) => (
                    <div
                        key={index}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
                    >
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} group-hover:bg-primary/10 transition-colors`}>
                            <Icon name={stat.icon as any} size={24} className={stat.color} />
                        </div>
                        <div>
                            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 rounded-xl">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="Award" size={24} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground mb-1">Community Contribution</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            You're in the top 15% of active users! Keep sharing books to maintain your status and help build our reading community.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountStatistics;