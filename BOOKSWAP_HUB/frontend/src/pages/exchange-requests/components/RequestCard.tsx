import { useState } from 'react';
import { ExchangeRequest, TabType } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';
import RequestDetailModal from './RequestDetailModal';

interface RequestCardProps {
    request: ExchangeRequest;
    type: TabType;
    onAccept?: (requestId: string) => void;
    onReject?: (requestId: string) => void;
    onCancel?: (requestId: string) => void;
    onComplete?: (requestId: string) => void;
}

const RequestCard = ({ request, type, onAccept, onReject, onCancel, onComplete }: RequestCardProps) => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const isReceived = type === 'received';
    const partner = isReceived ? request.requester : request.owner;
    const userBook = isReceived ? request.requestedBook : request.offeredBook;
    const partnerBook = isReceived ? request.offeredBook : request.requestedBook;

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };

    const canAccept = isReceived && request.status === 'pending';
    const canReject = isReceived && request.status === 'pending';
    const canCancel = !isReceived && (request.status === 'pending' || request.status === 'accepted');
    const canComplete = request.status === 'accepted';

    return (
        <>
            <div className={`bg-card border border-border rounded-lg p-4 md:p-6 transition-all duration-150 ease-out hover:shadow-md ${!request.isRead ? 'border-l-4 border-l-primary' : ''}`}>
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Image
                                        src={partner.avatar}
                                        alt={partner.avatarAlt}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    {!request.isRead && (
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{partner.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Icon name="Star" size={14} className="text-warning fill-warning" />
                                        <span>{partner.rating.toFixed(1)}</span>
                                        <span>•</span>
                                        <span>{partner.totalExchanges} exchanges</span>
                                    </div>
                                </div>
                            </div>
                            <StatusBadge status={request.status} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Icon name="BookOpen" size={16} />
                                    <span>{isReceived ? 'Your Book' : 'Offered Book'}</span>
                                </div>
                                <div className="flex gap-3 p-3 bg-muted rounded-lg">
                                    <Image
                                        src={userBook.imageUrl}
                                        alt={userBook.imageAlt}
                                        className="w-16 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-foreground truncate">{userBook.title}</h4>
                                        <p className="text-sm text-muted-foreground truncate">{userBook.author}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{userBook.condition}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Icon name="Repeat" size={16} />
                                    <span>{isReceived ? 'Offered Book' : 'Requested Book'}</span>
                                </div>
                                <div className="flex gap-3 p-3 bg-muted rounded-lg">
                                    <Image
                                        src={partnerBook.imageUrl}
                                        alt={partnerBook.imageAlt}
                                        className="w-16 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-foreground truncate">{partnerBook.title}</h4>
                                        <p className="text-sm text-muted-foreground truncate">{partnerBook.author}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{partnerBook.condition}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-medium">Message:</span> {request.message}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Icon name="Calendar" size={14} />
                                    <span>Requested: {formatDate(request.requestDate)}</span>
                                </div>
                                {request.proposedExchangeDate && (
                                    <div className="flex items-center gap-1">
                                        <Icon name="Clock" size={14} />
                                        <span>Proposed: {formatDate(request.proposedExchangeDate)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex lg:flex-col gap-2 lg:w-32">
                        <Button
                            variant="outline"
                            size="sm"
                            fullWidth
                            iconName="Eye"
                            iconPosition="left"
                            onClick={() => setShowDetailModal(true)}
                        >
                            Details
                        </Button>

                        {canAccept && onAccept && (
                            <Button
                                variant="success"
                                size="sm"
                                fullWidth
                                iconName="Check"
                                iconPosition="left"
                                onClick={() => onAccept(request.id)}
                            >
                                Accept
                            </Button>
                        )}

                        {canReject && onReject && (
                            <Button
                                variant="destructive"
                                size="sm"
                                fullWidth
                                iconName="X"
                                iconPosition="left"
                                onClick={() => onReject(request.id)}
                            >
                                Reject
                            </Button>
                        )}

                        {canCancel && onCancel && (
                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                                iconName="XCircle"
                                iconPosition="left"
                                onClick={() => onCancel(request.id)}
                            >
                                Cancel
                            </Button>
                        )}

                        {canComplete && onComplete && (
                            <Button
                                variant="default"
                                size="sm"
                                fullWidth
                                iconName="CheckCircle"
                                iconPosition="left"
                                onClick={() => onComplete(request.id)}
                            >
                                Complete
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {showDetailModal && (
                <RequestDetailModal
                    request={request}
                    type={type}
                    onClose={() => setShowDetailModal(false)}
                    onAccept={canAccept && onAccept ? () => {
                        onAccept(request.id);
                        setShowDetailModal(false);
                    } : undefined}
                    onReject={canReject && onReject ? () => {
                        onReject(request.id);
                        setShowDetailModal(false);
                    } : undefined}
                    onCancel={canCancel && onCancel ? () => {
                        onCancel(request.id);
                        setShowDetailModal(false);
                    } : undefined}
                    onComplete={canComplete && onComplete ? () => {
                        onComplete(request.id);
                        setShowDetailModal(false);
                    } : undefined}
                />
            )}
        </>
    );
};

export default RequestCard;