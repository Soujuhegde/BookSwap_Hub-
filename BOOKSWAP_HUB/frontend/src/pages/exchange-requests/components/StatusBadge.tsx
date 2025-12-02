import { RequestStatus } from '../types';

interface StatusBadgeProps {
    status: RequestStatus;
    className?: string;
}

const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
    const statusConfig = {
        pending: {
            label: 'Pending',
            bgColor: 'bg-warning/10',
            textColor: 'text-warning',
            borderColor: 'border-warning/20'
        },
        accepted: {
            label: 'Accepted',
            bgColor: 'bg-success/10',
            textColor: 'text-success',
            borderColor: 'border-success/20'
        },
        rejected: {
            label: 'Rejected',
            bgColor: 'bg-destructive/10',
            textColor: 'text-destructive',
            borderColor: 'border-destructive/20'
        },
        completed: {
            label: 'Completed',
            bgColor: 'bg-primary/10',
            textColor: 'text-primary',
            borderColor: 'border-primary/20'
        },
        cancelled: {
            label: 'Cancelled',
            bgColor: 'bg-muted',
            textColor: 'text-muted-foreground',
            borderColor: 'border-border'
        }
    };

    const config = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
        >
            {config.label}
        </span>
    );
};

export default StatusBadge;