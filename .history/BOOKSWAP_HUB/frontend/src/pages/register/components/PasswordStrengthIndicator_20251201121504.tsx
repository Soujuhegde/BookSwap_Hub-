import { useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import type { PasswordRequirement } from '../types';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const requirements: PasswordRequirement[] = useMemo(() => {
    return [
      {
        id: 'length',
        label: 'At least 8 characters',
        met: password.length >= 8,
      },
      {
        id: 'uppercase',
        label: 'One uppercase letter',
        met: /[A-Z]/.test(password),
      },
      {
        id: 'lowercase',
        label: 'One lowercase letter',
        met: /[a-z]/.test(password),
      },
      {
        id: 'number',
        label: 'One number',
        met: /\d/.test(password),
      },
      {
        id: 'special',
        label: 'One special character',
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
    ];
  }, [password]);

  const strength = useMemo(() => {
    const metCount = requirements.filter((req) => req.met).length;
    if (metCount === 0) return { label: '', color: '', width: '0%' };
    if (metCount <= 2) return { label: 'Weak', color: 'bg-error', width: '33%' };
    if (metCount <= 4) return { label: 'Medium', color: 'bg-warning', width: '66%' };
    return { label: 'Strong', color: 'bg-success', width: '100%' };
  }, [requirements]);

  if (!password) return null;

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Password strength</span>
          {strength.label && (
            <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>
              {strength.label}
            </span>
          )}
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${strength.color} transition-all duration-300 ease-out`}
            style={{ width: strength.width }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {requirements.map((req) => (
          <div key={req.id} className="flex items-center gap-2 text-xs">
            <div
              className={`flex items-center justify-center w-4 h-4 rounded-full transition-colors duration-150 ease-out ${
                req.met ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              <Icon name={req.met ? 'Check' : 'X'} size={10} strokeWidth={3} />
            </div>
            <span className={req.met ? 'text-foreground' : 'text-muted-foreground'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;