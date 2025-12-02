import { Book } from '../types';
import Icon from '../../../components/AppIcon';

interface BookDescriptionProps {
    book: Book;
}

const BookDescription = ({ book }: BookDescriptionProps) => {
    return (
        <div className="space-y-6">
            <div className="p-6 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                    <Icon name="FileText" size={20} className="text-primary" />
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                        Description
                    </h3>
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {book.description}
                </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                    <Icon name="MessageSquare" size={20} className="text-primary" />
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                        Owner's Notes
                    </h3>
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {book.ownerNotes}
                </p>
            </div>

            <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                    <Icon name="Shield" size={20} className="text-primary mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                            Secure Exchange Guarantee
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            All exchanges are protected by our secure platform. We verify user identities and provide dispute resolution to ensure safe transactions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDescription;