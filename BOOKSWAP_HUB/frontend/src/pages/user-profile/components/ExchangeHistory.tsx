import { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExchangeHistory = ({ exchanges }: any) => {
    const [filter, setFilter] = useState('all');

    const filteredExchanges = exchanges?.filter((exchange: any) => {
        if (filter === 'all') return true;
        return exchange?.type === filter;
    });

    const getRatingStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Icon
                key={i}
                name={i < rating ? 'Star' : 'Star'}
                size={16}
                color={i < rating ? '#182e2c' : '#E5E7EB'}
                className={i < rating ? 'fill-primary' : ''}
            />
        ));
    };

    const getStatusBadge = (status: string) => {
        const badges: any = {
            completed: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Completed' },
            cancelled: { color: 'bg-muted text-muted-foreground border-border', label: 'Cancelled' },
            pending: { color: 'bg-primary/5 text-primary border-primary/10', label: 'Pending' }
        };
        const badge = badges?.[status] || badges?.completed;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge?.color}`}>
                {badge?.label}
            </span>
        );
    };

    return (
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Icon name="History" size={24} className="text-primary" />
                    Exchange History
                </h2>
                <div className="flex p-1 bg-muted rounded-lg">
                    {['all', 'given', 'received']?.map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${filter === type
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            {filteredExchanges?.length === 0 ? (
                <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed border-border">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="BookOpen" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1">No exchanges yet</h3>
                    <p className="text-muted-foreground">Your exchange history will appear here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredExchanges?.map((exchange: any) => (
                        <div
                            key={exchange?.id}
                            className="group border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200 bg-card"
                        >
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex gap-5 flex-1">
                                    <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted shadow-sm group-hover:shadow-md transition-shadow">
                                        <img
                                            src={exchange?.bookImage}
                                            alt={exchange?.bookImageAlt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <h3 className="font-semibold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                                                {exchange?.bookTitle}
                                            </h3>
                                            {getStatusBadge(exchange?.status)}
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                                            <Icon name="User" size={14} />
                                            {exchange?.bookAuthor}
                                        </p>
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${exchange?.type === 'given' ? 'bg-primary/5 text-primary' : 'bg-muted text-foreground'
                                                }`}>
                                                <Icon
                                                    name={exchange?.type === 'given' ? 'ArrowUpRight' : 'ArrowDownLeft'}
                                                    size={16}
                                                />
                                                <span className="font-medium">
                                                    {exchange?.type === 'given' ? 'Given to' : 'Received from'}
                                                </span>
                                                <span className="font-bold">{exchange?.partnerName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between lg:items-end gap-3 lg:min-w-[200px] py-1">
                                    <div className="flex items-center gap-1 bg-muted/50 px-3 py-1.5 rounded-lg">
                                        {getRatingStars(exchange?.rating)}
                                        <span className="text-sm font-medium text-foreground ml-2">
                                            {exchange?.rating}.0
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Icon name="Calendar" size={14} />
                                        <span>{exchange?.date}</span>
                                    </div>
                                    {exchange?.feedback && (
                                        <p className="text-sm text-muted-foreground italic lg:text-right bg-muted/30 px-3 py-2 rounded-lg w-full lg:w-auto">
                                            "{exchange?.feedback}"
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExchangeHistory;