import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../pages/browse-books/types';

interface WishlistContextType {
    wishlist: Book[];
    addToWishlist: (book: Book) => void;
    removeFromWishlist: (bookId: string) => void;
    isInWishlist: (bookId: string) => boolean;
    toggleWishlist: (book: Book) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<Book[]>(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (book: Book) => {
        setWishlist((prev) => {
            if (!prev.find((b) => b.id === book.id)) {
                return [...prev, book];
            }
            return prev;
        });
    };

    const removeFromWishlist = (bookId: string) => {
        setWishlist((prev) => prev.filter((b) => b.id !== bookId));
    };

    const isInWishlist = (bookId: string) => {
        return wishlist.some((b) => b.id === bookId);
    };

    const toggleWishlist = (book: Book) => {
        if (isInWishlist(book.id)) {
            removeFromWishlist(book.id);
        } else {
            addToWishlist(book);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
