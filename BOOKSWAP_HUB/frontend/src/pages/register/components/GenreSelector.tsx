import React from 'react';
import Select, { SelectOption } from '../../../components/ui/Select';

interface GenreSelectorProps {
    selectedGenres: string[];
    onChange: (genres: string[]) => void;
    error?: string;
}

const GENRE_OPTIONS: SelectOption[] = [
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'sci-fi', label: 'Science Fiction' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'romance', label: 'Romance' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'biography', label: 'Biography' },
    { value: 'history', label: 'History' },
    { value: 'self-help', label: 'Self Help' },
    { value: 'business', label: 'Business' },
    { value: 'poetry', label: 'Poetry' },
];

const GenreSelector: React.FC<GenreSelectorProps> = ({
    selectedGenres,
    onChange,
    error
}) => {
    return (
        <div className="space-y-2">
            <Select
                label="Favorite Genres"
                placeholder="Select genres you enjoy..."
                options={GENRE_OPTIONS}
                value={selectedGenres}
                onChange={onChange}
                multiple
                searchable
                error={error}
                description="Select as many as you like"
            />
        </div>
    );
};

export default GenreSelector;
