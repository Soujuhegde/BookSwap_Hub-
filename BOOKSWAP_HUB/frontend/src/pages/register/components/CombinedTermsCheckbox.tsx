import { Checkbox } from '../../../components/ui/Checkbox';

interface CombinedTermsCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: string;
}

const CombinedTermsCheckbox = ({ checked, onChange, error }: CombinedTermsCheckboxProps) => {
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2">
                <Checkbox
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <label className="text-sm text-foreground cursor-pointer select-none">
                    I agree to the{' '}
                    <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/90 underline transition-colors duration-150 ease-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Terms of Service
                    </a>
                    {' '}and{' '}
                    <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/90 underline transition-colors duration-150 ease-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Privacy Policy
                    </a>
                </label>
            </div>
            {error && (
                <p className="text-xs text-error ml-6">{error}</p>
            )}
        </div>
    );
};

export default CombinedTermsCheckbox;
