import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
    type: 'received' | 'sent';
}

const EmptyState = ({ type }: EmptyStateProps) => {
    const navigate = useNavigate();

    const content = {
        received: {
            icon: 'Inbox',
            title: 'No Received Requests',
            description: 'You haven\'t received any exchange requests yet. Make sure your books are listed and available for exchange.',
            buttonText: 'View My Books',
            buttonAction: () => navigate('/my-books')
        },
        sent: {
            icon: 'Send',
            title: 'No Sent Requests',
            description: 'You haven\'t sent any exchange requests yet. Browse available books and start exchanging!',
            buttonText: 'Browse Books',
            buttonAction: () => navigate('/browse-books')
        }
    };

    const config = content[type];

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Icon name={config.icon} size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{config.title}</h3>
            <p className="text-muted-foreground max-w-md mb-6">{config.description}</p>
            <Button variant="default" iconName="ArrowRight" iconPosition="right" onClick={config.buttonAction}>
                {config.buttonText}
            </Button>
        </div>
    );
};

export default EmptyState;