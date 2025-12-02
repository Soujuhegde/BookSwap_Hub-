import { Book } from '../types';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

interface OwnerProfileProps {
    book: Book;
}

const OwnerProfile = ({ book }: OwnerProfileProps) => {
    return (
        <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Book Owner
            </h3>

            <div className="flex items-start gap-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                        <Image
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${book.ownerName}`}
                            alt={`Profile picture of ${book.ownerName}, book owner`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {book.ownerVerified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                            <Icon name="CheckCircle" size={14} color="white" />
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-semibold text-foreground">{book.ownerName}</h4>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                        <Icon name="Star" size={14} className="text-warning fill-warning" />
                        <span className="text-sm font-medium text-foreground">{book.ownerRating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">
                            ({book.ownerExchangeCount} exchanges)
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={14} />
                        <span>{book.ownerLocation}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-primary">{book.ownerExchangeCount}</p>
                        <p className="text-xs text-muted-foreground mt-1">Successful Exchanges</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-primary">{book.ownerRating.toFixed(1)}</p>
                        <p className="text-xs text-muted-foreground mt-1">Average Rating</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerProfile;