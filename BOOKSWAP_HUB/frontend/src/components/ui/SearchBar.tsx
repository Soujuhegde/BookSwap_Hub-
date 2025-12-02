import { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  expandable?: boolean;
  autoFocus?: boolean;
}

const SearchBar = ({
  placeholder = 'Search books...',
  value: controlledValue,
  onChange,
  onSearch,
  className = '',
  expandable = false,
  autoFocus = false,
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(!expandable);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    if (isExpanded && autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded, autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    const newValue = '';
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleExpand = () => {
    if (expandable) {
      setIsExpanded(!isExpanded);
    }
  };

  if (expandable && !isExpanded) {
    return (
      <button
        onClick={toggleExpand}
        className={`flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-150 ease-out ${className}`}
        aria-label="Open search"
      >
        <Icon name="Search" size={20} />
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center ${expandable ? 'w-full max-w-md' : ''} ${className}`}
    >
      <div className="relative flex-1">
        <Icon
          name="Search"
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-10 pl-10 pr-10 text-sm bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-150 ease-out"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
            aria-label="Clear search"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {expandable && (
        <button
          type="button"
          onClick={toggleExpand}
          className="ml-2 flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-150 ease-out"
          aria-label="Close search"
        >
          <Icon name="X" size={20} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;