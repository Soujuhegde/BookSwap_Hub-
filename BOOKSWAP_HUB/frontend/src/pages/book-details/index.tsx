import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Book, SimilarBook, OwnerBook, ExchangeRequestForm } from './types';
import Header from '../../components/Header';
import BookCover from './components/BookCover';
import BookInfo from './components/BookInfo';
import OwnerProfile from './components/OwnerProfile';
import BookDescription from './components/BookDescription';
import SimilarBooks from './components/SimilarBooks';
import OwnerOtherBooks from './components/OwnerOtherBooks';
import ExchangeRequestModal from './components/ExchangeRequestModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const BookDetails = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookId = searchParams.get('id') || '1';

    const [isAuthenticated] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const mockBook: Book = {
        id: bookId,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        genre: "Finance & Business",
        condition: "Like New",
        status: "Available",
        imageUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666",
        imageAlt: "Book cover of The Psychology of Money showing minimalist design with gold coins and financial symbols on dark blue background",
        description: `Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.\n\nMoney—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don't make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together.\n\nIn The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life's most important topics.`,
        ownerNotes: `This book is in excellent condition with no markings or damage. I've read it once and kept it on my shelf since. It's a must-read for anyone interested in understanding their relationship with money.\n\nThe book has been stored in a smoke-free, pet-free home. All pages are intact and the spine is in perfect condition. Happy to answer any questions about the book's condition or content!`,
        ownerId: "owner1",
        ownerName: "Sarah Johnson",
        ownerRating: 4.8,
        ownerLocation: "San Francisco, CA",
        ownerExchangeCount: 47,
        ownerVerified: true,
        publishedYear: 2020,
        isbn: "978-0857197689",
        language: "English",
        pages: 256
    };

    const mockSimilarBooks: SimilarBook[] = [
        {
            id: "2",
            title: "Atomic Habits",
            author: "James Clear",
            imageUrl: "https://images.unsplash.com/photo-1716171848317-1ca95b7f99ef",
            imageAlt: "Book cover of Atomic Habits featuring bold typography and minimalist design with atomic symbol on white background",
            condition: "Good",
            status: "Available"
        },
        {
            id: "3",
            title: "Think and Grow Rich",
            author: "Napoleon Hill",
            imageUrl: "https://images.unsplash.com/photo-1723308308097-d2a5ee21da4a",
            imageAlt: "Classic book cover of Think and Grow Rich with vintage gold lettering on burgundy leather-bound cover",
            condition: "Fair",
            status: "Available"
        },
        {
            id: "4",
            title: "Rich Dad Poor Dad",
            author: "Robert Kiyosaki",
            imageUrl: "https://images.unsplash.com/photo-1586755596549-c105e88e20f5",
            imageAlt: "Book cover of Rich Dad Poor Dad showing contrasting imagery of wealth and poverty with purple and gold color scheme",
            condition: "Like New",
            status: "Unavailable"
        },
        {
            id: "5",
            title: "The Intelligent Investor",
            author: "Benjamin Graham",
            imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1a0c1720d-1764570694734.png",
            imageAlt: "Book cover of The Intelligent Investor featuring classic design with stock market graphs and professional typography",
            condition: "Good",
            status: "Available"
        }];


    const mockOwnerBooks: OwnerBook[] = [
        {
            id: "6",
            title: "Sapiens",
            author: "Yuval Noah Harari",
            imageUrl: "https://images.unsplash.com/photo-1615098711413-bbe8196e0f05",
            imageAlt: "Book cover of Sapiens showing evolutionary timeline with human silhouettes on orange gradient background",
            genre: "History",
            status: "Available"
        },
        {
            id: "7",
            title: "The Alchemist",
            author: "Paulo Coelho",
            imageUrl: "https://images.unsplash.com/photo-1627023813330-c7d58fe34835",
            imageAlt: "Book cover of The Alchemist featuring mystical desert landscape with golden sun and spiritual symbols",
            genre: "Fiction",
            status: "Available"
        },
        {
            id: "8",
            title: "Educated",
            author: "Tara Westover",
            imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_18567dfa3-1764570693447.png",
            imageAlt: "Book cover of Educated showing mountain landscape with academic imagery and bold title typography",
            genre: "Biography",
            status: "Unavailable"
        },
        {
            id: "9",
            title: "Thinking, Fast and Slow",
            author: "Daniel Kahneman",
            imageUrl: "https://images.unsplash.com/photo-1556695725-3cc4a29d4ef7",
            imageAlt: "Book cover of Thinking Fast and Slow with brain imagery and dual-tone design representing two thinking systems",
            genre: "Psychology",
            status: "Available"
        }];


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [bookId]);

    const handleExchangeRequest = (data: ExchangeRequestForm) => {
        console.log('Exchange request submitted:', data);
        setIsModalOpen(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
    };

    const handleRequestClick = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        console.log('User logged out');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background">
            <Header isAuthenticated={isAuthenticated} notificationCount={3} onLogout={handleLogout} />

            <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
                <button
                    onClick={() => navigate('/browse-books')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors duration-150 ease-out">

                    <Icon name="ArrowLeft" size={20} />
                    <span className="text-sm font-medium">Back to Browse</span>
                </button>

                {showSuccessMessage &&
                    <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
                        <Icon name="CheckCircle" size={20} className="text-success" />
                        <div>
                            <p className="text-sm font-medium text-success">Exchange request sent successfully!</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                The owner will be notified and can respond to your request.
                            </p>
                        </div>
                    </div>
                }

                <div className="flex flex-col lg:flex-row gap-8">
                    <BookCover book={mockBook} />

                    <div className="flex-1 space-y-6">
                        <BookInfo book={mockBook} />

                        <div className="flex flex-col sm:flex-row gap-3">
                            {mockBook.status === 'Available' ?
                                <Button
                                    variant="default"
                                    size="lg"
                                    iconName="Repeat"
                                    iconPosition="left"
                                    onClick={handleRequestClick}
                                    fullWidth
                                    className="sm:flex-1">

                                    Request Exchange
                                </Button> :

                                <Button
                                    variant="outline"
                                    size="lg"
                                    disabled
                                    fullWidth
                                    className="sm:flex-1">

                                    Currently Unavailable
                                </Button>
                            }
                            <Button
                                variant="outline"
                                size="lg"
                                iconName="Heart"
                                iconPosition="left"
                                className="sm:w-auto">

                                Save
                            </Button>
                        </div>

                        <OwnerProfile book={mockBook} />
                        <BookDescription book={mockBook} />
                    </div>
                </div>

                <SimilarBooks books={mockSimilarBooks} />
                <OwnerOtherBooks books={mockOwnerBooks} ownerName={mockBook.ownerName} />
            </main>

            <ExchangeRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleExchangeRequest}
                bookTitle={mockBook.title} />

        </div>);

};

export default BookDetails;