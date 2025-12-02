import { FilterOptions, RequestStatus } from '../types';
import Select from '../../../components/ui/Select';

interface FilterBarProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
}

const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
    const statusOptions = [
        { value: 'all', label: 'All Requests' },
        { value: 'pending', label: 'Pending' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const sortOptions = [
        { value: 'date', label: 'Sort by Date' },
        { value: 'priority', label: 'Sort by Priority' }
    ];

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <Select
                    options={statusOptions}
                    value={filters.status}
                    onChange={(value) => onFilterChange({ ...filters, status: value as RequestStatus | 'all' })}
                    placeholder="Filter by status"
                />
            </div>
            <div className="flex-1 sm:max-w-xs">
                <Select
                    options={sortOptions}
                    value={filters.sortBy}
                    onChange={(value) => onFilterChange({ ...filters, sortBy: value as 'date' | 'priority' })}
                    placeholder="Sort by"
                />
            </div>
        </div>
    );
};

export default FilterBar;