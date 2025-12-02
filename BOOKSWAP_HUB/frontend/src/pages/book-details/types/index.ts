export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    condition: 'Like New' | 'Good' | 'Fair' | 'Poor';
    status: 'Available' | 'Unavailable' | 'Exchanged';
    imageUrl: string;
    imageAlt: string;
    description: string;
    ownerNotes: string;
    ownerId: string;
    ownerName: string;
    ownerRating: number;
    ownerLocation: string;
    ownerExchangeCount: number;
    ownerVerified: boolean;
    publishedYear: number;
    isbn: string;
    language: string;
    pages: number;
}

export interface SimilarBook {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    imageAlt: string;
    condition: string;
    status: 'Available' | 'Unavailable';
}

export interface OwnerBook {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    imageAlt: string;
    genre: string;
    status: 'Available' | 'Unavailable';
}

export interface ExchangeRequestForm {
    message: string;
    proposedBooks: string[];
}