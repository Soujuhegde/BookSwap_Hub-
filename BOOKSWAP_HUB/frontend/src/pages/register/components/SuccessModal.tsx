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
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-background rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-150 ease-out"
          aria-label="Close modal"
        >
          <Icon name="X" size={18} />
        </button>

        {/* NOTE: leading-none reduces unexpected vertical whitespace from line-height */}
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 text-center leading-none">
          {/* Icon container: reduced size, removed bottom margin (mb-2),
              kept mx-auto to center horizontally.
              If you want the icon to overlap the top edge slightly, enable -mt-3. */}
          <div></div>

          <h2 className="text-xl font-pacifico font-semibold text-foreground mt-3 mb-5">
            Welcome to BookSwap Hub!
          </h2>

          <p className="text-sm text-muted-foreground mb-3">
            Your account has been created successfully. We've sent a verification email to{' '}
            <span className="font-medium text-foreground">{email}</span>
          </p>

          <div className="space-y-4 mb-6 p-5 bg-muted rounded-lg text-left">
            <div className="flex items-start gap-2.5">
              <Icon name="Mail" size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">
                  Check your email
                </p>
                <p className="text-xs text-muted-foreground">
                  Click the verification link to activate your account
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Icon name="LogIn" size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">
                  Login to continue
                </p>
                <p className="text-xs text-muted-foreground">
                  Sign in with your new account to start exploring
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
            Continue to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
