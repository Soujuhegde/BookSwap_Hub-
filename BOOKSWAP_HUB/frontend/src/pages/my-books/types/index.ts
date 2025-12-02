export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Poor';
  status: 'available' | 'in-negotiation' | 'exchanged' | 'unavailable';
  description: string;
  imageUrl: string;
  imageAlt: string;
  dateAdded: Date;
  exchangeCount: number;
  viewCount: number;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Poor';
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export interface BookStats {
  totalListings: number;
  successfulExchanges: number;
  activeNegotiations: number;
  totalViews: number;
}

export interface FilterOptions {
  status: 'all' | 'available' | 'in-negotiation' | 'exchanged' | 'unavailable';
  genre: string;
  condition: string;
  sortBy: 'dateAdded' | 'title' | 'popularity';
}