export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
    status: 'Available' | 'Reserved' | 'Exchanged';
    imageUrl: string;
    imageAlt: string;
    description: string;
    owner: {
        id: string;
        name: string;
        rating: number;
        location: string;
    };
    listedDate: Date;
    popularity: number;
}

export interface FilterState {
    searchQuery: string;
    genre: string;
    condition: string;
    availability: string;
    sortBy: 'newest' | 'popularity' | 'condition' | 'alphabetical';
    location: string;
    minRating: number;
}

export interface CategoryChip {
    id: string;
    label: string;
    icon: string;
    genre: string;
}