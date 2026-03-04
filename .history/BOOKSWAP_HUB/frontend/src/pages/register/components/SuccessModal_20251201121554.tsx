import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface SuccessModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, email, onClose }: SuccessModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    onClose();
    navigate('/browse-books');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-background rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-150 ease-out"
          aria-label="Close modal"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="p-6 sm:p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full">
            <Icon name="CheckCircle2" size={32} color="var(--color-success)" />
          </div>

          <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Welcome to BookSwap Hub!
          </h2>

          <p className="text-muted-foreground mb-6">
            Your account has been created successfully. We've sent a verification email to{' '}
            <span className="font-medium text-foreground">{email}</span>
          </p>

          <div className="space-y-3 mb-6 p-4 bg-muted rounded-lg text-left">
            <div className="flex items-start gap-3">
              <Icon name="Mail" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Check your email
                </p>
                <p className="text-xs text-muted-foreground">
                  Click the verification link to activate your account
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="BookOpen" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Start exploring
                </p>
                <p className="text-xs text-muted-foreground">
                  Browse thousands of books and connect with readers
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            fullWidth
            onClick={handleContinue}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue to Browse Books
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;