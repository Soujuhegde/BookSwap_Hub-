import { useState } from 'react';

import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onBulkDelete: () => void;
  selectedCount: number;
}

const FilterBar = ({ filters, onFilterChange, onBulkDelete, selectedCount }: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'in-negotiation', label: 'In Negotiation' },
    { value: 'exchanged', label: 'Exchanged' },
    { value: 'unavailable', label: 'Unavailable' },
  ];

  const genreOptions = [
    { value: '', label: 'All Genres' },
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Self Help', label: 'Self Help' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Science Fiction', label: 'Science Fiction' },
    { value: 'Biography', label: 'Biography' },
    { value: 'History', label: 'History' },
    { value: 'Business', label: 'Business' },
  ];

  const conditionOptions = [
    { value: '', label: 'All Conditions' },
    { value: 'Like New', label: 'Like New' },
    { value: 'Good', label: 'Good' },
    { value: 'Fair', label: 'Fair' },
    { value: 'Poor', label: 'Poor' },
  ];

  const sortOptions = [
    { value: 'dateAdded', label: 'Date Added' },
    { value: 'title', label: 'Title' },
    { value: 'popularity', label: 'Popularity' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(value) => onFilterChange({ ...filters, status: value as FilterOptions['status'] })}
            placeholder="Filter by status"
            className="flex-1"
          />

          <Button
            variant="outline"
            iconName="Filter"
            iconPosition="left"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:w-auto"
          >
            {showFilters ? 'Hide' : 'More'} Filters
          </Button>
        </div>

        {selectedCount > 0 && (
          <Button
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
            onClick={onBulkDelete}
          >
            Delete ({selectedCount})
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
          <Select
            label="Genre"
            options={genreOptions}
            value={filters.genre}
            onChange={(value) => onFilterChange({ ...filters, genre: value as string })}
          />

          <Select
            label="Condition"
            options={conditionOptions}
            value={filters.condition}
            onChange={(value) => onFilterChange({ ...filters, condition: value as string })}
          />

          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => onFilterChange({ ...filters, sortBy: value as FilterOptions['sortBy'] })}
          />
        </div>
      )}
    </div>
  );
};

export default FilterBar;