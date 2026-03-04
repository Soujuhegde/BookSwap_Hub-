import { Checkbox } from 'src/components/ui/Checkbox';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  type: 'terms' | 'privacy';
}

const TermsCheckbox = ({ checked, onChange, error, type }: TermsCheckboxProps) => {
  const content = {
    terms: {
      label: 'I agree to the Terms of Service',
      link: '/terms',
      linkText: 'Terms of Service',
    },
    privacy: {
      label: 'I agree to the Privacy Policy',
      link: '/privacy',
      linkText: 'Privacy Policy',
    },
  };

  const { label, link, linkText } = content[type];

  return (
    <div className="space-y-1">
      <div className="flex items-start gap-2">
        <Checkbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5"
        />
        <label className="text-sm text-foreground cursor-pointer select-none">
          {label.split(linkText)[0]}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/90 underline transition-colors duration-150 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText}
          </a>
          {label.split(linkText)[1]}
        </label>
      </div>
      {error && (
        <p className="text-xs text-error ml-6">{error}</p>
      )}
    </div>
  );
};

export default TermsCheckbox;