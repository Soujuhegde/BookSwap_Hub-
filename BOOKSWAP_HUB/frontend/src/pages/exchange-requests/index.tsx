import { useState, useMemo } from 'react';
import { ExchangeRequest, TabType, FilterOptions } from './types';
import Header from '../../components/Header';
import SearchBar from '../../components/ui/SearchBar';
import RequestCard from './components/RequestCard';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';

const ExchangeRequests = () => {
  const [activeTab, setActiveTab] = useState<TabType>('received');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    sortBy: 'date'
  });

  const mockRequests: ExchangeRequest[] = [
  {
    id: 'req-001',
    requestedBook: {
      id: 'book-001',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      genre: 'Finance',
      condition: 'Like New',
      imageUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666",
      imageAlt: 'The Psychology of Money book cover showing gold coins and financial symbols on dark blue background'
    },
    offeredBook: {
      id: 'book-002',
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self Help',
      condition: 'Good',
      imageUrl: "https://images.unsplash.com/photo-1716171848317-1ca95b7f99ef",
      imageAlt: 'Atomic Habits book cover with minimalist design showing interconnected circles on white background'
    },
    requester: {
      id: 'user-001',
      name: 'Sarah Johnson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
      avatarAlt: 'Professional woman with brown hair wearing blue blazer smiling at camera',
      rating: 4.8,
      totalExchanges: 23
    },
    owner: {
      id: 'user-002',
      name: 'Current User',
      avatar: "https://images.unsplash.com/photo-1564071092322-b90e219e527b",
      avatarAlt: 'Young man with short dark hair wearing casual shirt in outdoor setting',
      rating: 4.5,
      totalExchanges: 15
    },
    status: 'pending',
    requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    message: 'Hi! I\'ve been looking for this book for a while. Would love to exchange with you. My copy of Atomic Habits is in excellent condition.',
    proposedExchangeDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    isRead: false
  },
  {
    id: 'req-002',
    requestedBook: {
      id: 'book-003',
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      genre: 'Thriller',
      condition: 'Good',
      imageUrl: "https://images.unsplash.com/photo-1648171830723-c23102c0d148",
      imageAlt: 'Stack of thriller novels with dark mysterious covers featuring shadowy figures'
    },
    offeredBook: {
      id: 'book-004',
      title: 'Ikigai',
      author: 'Héctor García',
      genre: 'Self Help',
      condition: 'Like New',
      imageUrl: "https://images.unsplash.com/photo-1699284754141-e0ff350f0a5d",
      imageAlt: 'Ikigai book with Japanese-inspired design showing zen garden elements on cream background'
    },
    requester: {
      id: 'user-003',
      name: 'Michael Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e5ee34f4-1763296128758.png",
      avatarAlt: 'Asian man with glasses wearing professional attire smiling warmly',
      rating: 4.9,
      totalExchanges: 31
    },
    owner: {
      id: 'user-002',
      name: 'Current User',
      avatar: "https://images.unsplash.com/photo-1564071092322-b90e219e527b",
      avatarAlt: 'Young man with short dark hair wearing casual shirt in outdoor setting',
      rating: 4.5,
      totalExchanges: 15
    },
    status: 'accepted',
    requestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    message: 'I\'m interested in exchanging books. I have Ikigai which I think you might enjoy!',
    responseMessage: 'Great! Let\'s proceed with the exchange. Looking forward to reading Ikigai.',
    proposedExchangeDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    isRead: true
  },
  {
    id: 'req-003',
    requestedBook: {
      id: 'book-005',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Fiction',
      condition: 'Fair',
      imageUrl: "https://images.unsplash.com/photo-1627023813330-c7d58fe34835",
      imageAlt: 'The Alchemist book cover with mystical desert landscape and golden sun imagery'
    },
    offeredBook: {
      id: 'book-006',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'Non-Fiction',
      condition: 'Good',
      imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecf46a4f-1764570695260.png",
      imageAlt: 'Sapiens book with evolutionary timeline graphics on cover showing human development'
    },
    requester: {
      id: 'user-002',
      name: 'Current User',
      avatar: "https://images.unsplash.com/photo-1564071092322-b90e219e527b",
      avatarAlt: 'Young man with short dark hair wearing casual shirt in outdoor setting',
      rating: 4.5,
      totalExchanges: 15
    },
    owner: {
      id: 'user-004',
      name: 'Emily Rodriguez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17c0179e8-1763295822377.png",
      avatarAlt: 'Hispanic woman with long dark hair wearing red top smiling brightly',
      rating: 4.7,
      totalExchanges: 19
    },
    status: 'pending',
    requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    message: 'Hello! I\'d love to read The Alchemist. I have Sapiens available for exchange.',
    proposedExchangeDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    isRead: true
  },
  {
    id: 'req-004',
    requestedBook: {
      id: 'book-007',
      title: 'Educated',
      author: 'Tara Westover',
      genre: 'Biography',
      condition: 'Like New',
      imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_135039482-1764570694452.png",
      imageAlt: 'Educated memoir book cover with mountain landscape and educational symbols'
    },
    offeredBook: {
      id: 'book-008',
      title: 'Becoming',
      author: 'Michelle Obama',
      genre: 'Biography',
      condition: 'Good',
      imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_115e5de2f-1763294932054.png",
      imageAlt: 'Becoming memoir with elegant portrait design on sophisticated background'
    },
    requester: {
      id: 'user-005',
      name: 'David Thompson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1507b6e2a-1763293256195.png",
      avatarAlt: 'Middle-aged man with gray hair wearing business casual attire',
      rating: 4.6,
      totalExchanges: 27
    },
    owner: {
      id: 'user-002',
      name: 'Current User',
      avatar: "https://images.unsplash.com/photo-1564071092322-b90e219e527b",
      avatarAlt: 'Young man with short dark hair wearing casual shirt in outdoor setting',
      rating: 4.5,
      totalExchanges: 15
    },
    status: 'completed',
    requestDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    message: 'I\'m a big fan of memoirs. Would you be interested in exchanging?',
    responseMessage: 'Absolutely! Both books are excellent reads.',
    completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    rating: 5,
    isRead: true
  },
  {
    id: 'req-005',
    requestedBook: {
      id: 'book-009',
      title: '1984',
      author: 'George Orwell',
      genre: 'Fiction',
      condition: 'Good',
      imageUrl: "https://images.unsplash.com/photo-1622609184693-58079bb6742f",
      imageAlt: '1984 dystopian novel cover with surveillance eye and dark totalitarian imagery'
    },
    offeredBook: {
      id: 'book-010',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Fiction',
      condition: 'Fair',
      imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd9faa1a-1764570694443.png",
      imageAlt: 'Brave New World book cover with futuristic dystopian design elements'
    },
    requester: {
      id: 'user-002',
      name: 'Current User',
      avatar: "https://images.unsplash.com/photo-1564071092322-b90e219e527b",
      avatarAlt: 'Young man with short dark hair wearing casual shirt in outdoor setting',
      rating: 4.5,
      totalExchanges: 15
    },
    owner: {
      id: 'user-006',
      name: 'Lisa Anderson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd44e7ad-1763297407210.png",
      avatarAlt: 'Blonde woman with short hair wearing professional attire with friendly expression',
      rating: 4.4,
      totalExchanges: 12
    },
    status: 'rejected',
    requestDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    message: 'I\'ve been wanting to read 1984. Interested in a dystopian novel exchange?',
    responseMessage: 'Sorry, I\'m currently reading this book. Maybe we can exchange later.',
    isRead: true
  }];


  const receivedRequests = mockRequests.filter((req) => req.owner.id === 'user-002');
  const sentRequests = mockRequests.filter((req) => req.requester.id === 'user-002');

  const currentRequests = activeTab === 'received' ? receivedRequests : sentRequests;

  const filteredRequests = useMemo(() => {
    let filtered = currentRequests;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((req) => {
        const partner = activeTab === 'received' ? req.requester : req.owner;
        const userBook = activeTab === 'received' ? req.requestedBook : req.offeredBook;
        const partnerBook = activeTab === 'received' ? req.offeredBook : req.requestedBook;

        return (
          partner.name.toLowerCase().includes(query) ||
          userBook.title.toLowerCase().includes(query) ||
          userBook.author.toLowerCase().includes(query) ||
          partnerBook.title.toLowerCase().includes(query) ||
          partnerBook.author.toLowerCase().includes(query));

      });
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter((req) => req.status === filters.status);
    }

    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return b.requestDate.getTime() - a.requestDate.getTime();
      } else {
        const priorityOrder = { pending: 0, accepted: 1, completed: 2, rejected: 3, cancelled: 4 };
        return priorityOrder[a.status] - priorityOrder[b.status];
      }
    });

    return filtered;
  }, [currentRequests, searchQuery, filters, activeTab]);

  const unreadCount = receivedRequests.filter((req) => !req.isRead).length;

  const handleAccept = (requestId: string) => {
    console.log('Accepting request:', requestId);
    alert('Request accepted successfully! You can now coordinate the exchange details.');
  };

  const handleReject = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    alert('Request rejected. The requester will be notified.');
  };

  const handleCancel = (requestId: string) => {
    console.log('Cancelling request:', requestId);
    alert('Request cancelled successfully.');
  };

  const handleComplete = (requestId: string) => {
    console.log('Completing request:', requestId);
    alert('Exchange marked as complete! Please rate your experience.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} notificationCount={unreadCount} onLogout={() => console.log('Logout clicked')} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Exchange Requests</h1>
          <p className="text-muted-foreground">Manage your incoming and outgoing book exchange requests</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab('received')}
                className={`relative px-6 py-3 font-medium transition-colors duration-150 ease-out ${
                activeTab === 'received' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
                }>

                Received Requests
                {unreadCount > 0 &&
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-primary-foreground bg-primary rounded-full">
                    {unreadCount}
                  </span>
                }
                {activeTab === 'received' &&
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                }
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`relative px-6 py-3 font-medium transition-colors duration-150 ease-out ${
                activeTab === 'sent' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
                }>

                Sent Requests
                {activeTab === 'sent' &&
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                }
              </button>
            </div>

            <div className="w-full sm:w-auto sm:max-w-md">
              <SearchBar
                placeholder="Search by name or book title..."
                value={searchQuery}
                onChange={setSearchQuery} />

            </div>
          </div>

          <FilterBar filters={filters} onFilterChange={setFilters} />
        </div>

        {filteredRequests.length === 0 ?
        searchQuery || filters.status !== 'all' ?
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Icon name="Search" size={40} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Results Found</h3>
              <p className="text-muted-foreground max-w-md">
                No requests match your current filters. Try adjusting your search or filter criteria.
              </p>
            </div> :

        <EmptyState type={activeTab} /> :


        <div className="space-y-4">
            {filteredRequests.map((request) =>
          <RequestCard
            key={request.id}
            request={request}
            type={activeTab}
            onAccept={activeTab === 'received' ? handleAccept : undefined}
            onReject={activeTab === 'received' ? handleReject : undefined}
            onCancel={activeTab === 'sent' ? handleCancel : undefined}
            onComplete={handleComplete} />

          )}
          </div>
        }
      </main>
    </div>);

};

export default ExchangeRequests;