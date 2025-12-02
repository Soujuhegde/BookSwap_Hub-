import { ExchangeRequest, TabType } from '../types';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

interface RequestDetailModalProps {
  request: ExchangeRequest;
  type: TabType;
  onClose: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
}

const RequestDetailModal = ({
  request,
  type,
  onClose,
  onAccept,
  onReject,
  onCancel,
  onComplete
}: RequestDetailModalProps) => {
  const isReceived = type === 'received';
  const partner = isReceived ? request.requester : request.owner;
  const userBook = isReceived ? request.requestedBook : request.offeredBook;
  const partnerBook = isReceived ? request.offeredBook : request.requestedBook;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Exchange Request Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors duration-150 ease-out"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={partner.avatar}
                alt={partner.avatarAlt}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Star" size={14} className="text-warning fill-warning" />
                  <span>{partner.rating.toFixed(1)} rating</span>
                  <span>•</span>
                  <span>{partner.totalExchanges} successful exchanges</span>
                </div>
              </div>
            </div>
            <StatusBadge status={request.status} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Icon name="BookOpen" size={18} />
                {isReceived ? 'Your Book' : 'Offered Book'}
              </h4>
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <Image
                  src={userBook.imageUrl}
                  alt={userBook.imageAlt}
                  className="w-full h-48 object-cover rounded"
                />
                <div>
                  <h5 className="font-medium text-foreground">{userBook.title}</h5>
                  <p className="text-sm text-muted-foreground">{userBook.author}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Genre:</span>
                  <span className="font-medium text-foreground">{userBook.genre}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Condition:</span>
                  <span className="font-medium text-foreground">{userBook.condition}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Icon name="Repeat" size={18} />
                {isReceived ? 'Offered Book' : 'Requested Book'}
              </h4>
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <Image
                  src={partnerBook.imageUrl}
                  alt={partnerBook.imageAlt}
                  className="w-full h-48 object-cover rounded"
                />
                <div>
                  <h5 className="font-medium text-foreground">{partnerBook.title}</h5>
                  <p className="text-sm text-muted-foreground">{partnerBook.author}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Genre:</span>
                  <span className="font-medium text-foreground">{partnerBook.genre}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Condition:</span>
                  <span className="font-medium text-foreground">{partnerBook.condition}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Icon name="MessageSquare" size={18} />
                Request Message
              </h4>
              <p className="text-sm text-foreground">{request.message}</p>
            </div>

            {request.responseMessage && (
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Icon name="Reply" size={18} />
                  Response Message
                </h4>
                <p className="text-sm text-foreground">{request.responseMessage}</p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>Requested: {formatDate(request.requestDate)}</span>
            </div>
            {request.proposedExchangeDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Proposed Date: {formatDate(request.proposedExchangeDate)}</span>
              </div>
            )}
            {request.completedDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="CheckCircle" size={16} />
                <span>Completed: {formatDate(request.completedDate)}</span>
              </div>
            )}
            {request.rating && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Star" size={16} className="text-warning fill-warning" />
                <span>Rating: {request.rating}/5</span>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 flex flex-wrap gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onAccept && (
            <Button variant="success" iconName="Check" iconPosition="left" onClick={onAccept}>
              Accept Request
            </Button>
          )}
          {onReject && (
            <Button variant="destructive" iconName="X" iconPosition="left" onClick={onReject}>
              Reject Request
            </Button>
          )}
          {onCancel && (
            <Button variant="outline" iconName="XCircle" iconPosition="left" onClick={onCancel}>
              Cancel Request
            </Button>
          )}
          {onComplete && (
            <Button variant="default" iconName="CheckCircle" iconPosition="left" onClick={onComplete}>
              Mark as Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailModal;