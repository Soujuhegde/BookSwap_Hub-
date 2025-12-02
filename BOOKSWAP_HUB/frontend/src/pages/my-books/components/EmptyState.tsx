import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface EmptyStateProps {
  onAddBook: () => void;
}

const EmptyState = ({ onAddBook }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="BookOpen" size={48} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
        No Books Yet
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Start building your book collection by adding your first book. Share your books with the community and discover new reads through exchanges.
      </p>
      <Button
        iconName="Plus"
        iconPosition="left"
        onClick={onAddBook}
      >
        Add Your First Book
      </Button>
    </div>
  );
};

export default EmptyState;