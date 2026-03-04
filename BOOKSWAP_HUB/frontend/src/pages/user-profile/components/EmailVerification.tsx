import { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

interface EmailVerificationProps {
    isVerified: boolean;
    email: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ isVerified, email }) => {
    const [isResending, setIsResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    const handleResendVerification = () => {
        setIsResending(true);
        setTimeout(() => {
            setIsResending(false);
            setResendSuccess(true);
            setTimeout(() => setResendSuccess(false), 5000);
        }, 1500);
    };

    if (isVerified) {
        return (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-success/20 rounded-full">
                        <Icon name="CheckCircle" size={24} className="text-success" />
                    </div>
                    <div>
                        <h3 className="font-medium text-foreground">Email Verified</h3>
                        <p className="text-sm text-muted-foreground">
                            Your email address has been successfully verified
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-warning/20 rounded-full flex-shrink-0">
                        <Icon name="AlertCircle" size={24} className="text-warning" />
                    </div>
                    <div>
                        <h3 className="font-medium text-foreground mb-1">Email Not Verified</h3>
                        <p className="text-sm text-muted-foreground">
                            Please verify your email address to access all features. Check your inbox at{' '}
                            <span className="font-medium text-foreground">{email}</span>
                        </p>
                        {resendSuccess && (
                            <p className="text-sm text-success mt-2 flex items-center gap-2 animate-fade-in">
                                <Icon name="CheckCircle" size={16} />
                                Verification email sent successfully!
                            </p>
                        )}
                    </div>
                </div>
                <Button
                    variant="default"
                    size="sm"
                    onClick={handleResendVerification}
                    loading={isResending}
                    iconName="Mail"
                    iconPosition="left"
                    className="flex-shrink-0"
                >
                    Resend Email
                </Button>
            </div>
        </div>
    );
};

export default EmailVerification;