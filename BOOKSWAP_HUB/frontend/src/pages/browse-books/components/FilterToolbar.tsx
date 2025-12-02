import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import SearchBar from '../../../components/ui/SearchBar';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { FilterState } from '../types';

interface FilterToolbarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    resultCount: number;
    isMobileFilterOpen: boolean;
    onToggleMobileFilter: () => void;
}

const FilterToolbar = ({
    filters,
    onFilterChange,
    resultCount,
    isMobileFilterOpen,
    onToggleMobileFilter
}: FilterToolbarProps) => {
    const [localFilters, setLocalFilters] = useState<FilterState>(filters);

    const genreOptions = [
        { value: 'all', label: 'All Genres' },
        { value: 'fiction', label: 'Fiction' },
        { value: 'non-fiction', label: 'Non-Fiction' },
        { value: 'self-help', label: 'Self Help' },
        { value: 'romance', label: 'Romance' },
        { value: 'thriller', label: 'Thriller' },
        { value: 'mystery', label: 'Mystery' },
        { value: 'science-fiction', label: 'Science Fiction' },
        { value: 'biography', label: 'Biography' }
    ];

    const conditionOptions = [
        { value: 'all', label: 'All Conditions' },
        { value: 'new', label: 'New' },
        { value: 'like-new', label: 'Like New' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
    ];

    const availabilityOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'available', label: 'Available' },
        { value: 'reserved', label: 'Reserved' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'popularity', label: 'Most Popular' },
        { value: 'condition', label: 'Best Condition' },
        { value: 'alphabetical', label: 'A to Z' }
    ];

    const ratingOptions = [
        { value: '0', label: 'All Ratings' },
        { value: '4', label: '4+ Stars' },
        { value: '3', label: '3+ Stars' },
        { value: '2', label: '2+ Stars' }
    ];

    const handleSearchChange = (value: string) => {
        const newFilters = { ...localFilters, searchQuery: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleFilterChange = (key: keyof FilterState, value: string | number) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleClearFilters = () => {
        const clearedFilters: FilterState = {
            searchQuery: '',
            genre: 'all',
            condition: 'all',
            availability: 'all',
            sortBy: 'newest',
            location: '',
            minRating: 0
        };
        setLocalFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    const hasActiveFilters =
        localFilters.searchQuery !== '' ||
        localFilters.genre !== 'all' ||
        localFilters.condition !== 'all' ||
        localFilters.availability !== 'all' ||
        localFilters.minRating > 0;

    return (
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Icon name="Filter" size={20} className="text-muted-foreground" />
                    <h2 className="text-lg font-heading font-semibold text-foreground">
                        Filters
                    </h2>
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
                        {resultCount} books
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            iconName="X"
                            iconPosition="left"
                            onClick={handleClearFilters}
                        >
                            Clear
                        </Button>
                    )}
                    <button
                        onClick={onToggleMobileFilter}
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-150 ease-out"
                        aria-label="Toggle filters"
                    >
                        <Icon name={isMobileFilterOpen ? 'X' : 'SlidersHorizontal'} size={20} />
                    </button>
                </div>
            </div>

            <div className={`space-y-4 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
                <div className="w-full">
                    <SearchBar
                        placeholder="Search by title or author..."
                        value={localFilters.searchQuery}
                        onChange={handleSearchChange}
                        className="w-full"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Select
                        label="Genre"
                        options={genreOptions}
                        value={localFilters.genre}
                        onChange={(value) => handleFilterChange('genre', value)}
                    />

                    <Select
                        label="Condition"
                        options={conditionOptions}
                        value={localFilters.condition}
                        onChange={(value) => handleFilterChange('condition', value)}
                    />

                    <Select
                        label="Availability"
                        options={availabilityOptions}
                        value={localFilters.availability}
                        onChange={(value) => handleFilterChange('availability', value)}
                    />

                    <Select
                        label="Sort By"
                        options={sortOptions}
                        value={localFilters.sortBy}
                        onChange={(value) => handleFilterChange('sortBy', value)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                        label="Minimum Rating"
                        options={ratingOptions}
                        value={localFilters.minRating.toString()}
                        onChange={(value) => handleFilterChange('minRating', parseInt(value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterToolbar;