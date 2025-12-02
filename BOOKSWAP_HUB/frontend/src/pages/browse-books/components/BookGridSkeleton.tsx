

const BookGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 })?.map((_, index) => (
                <div
                    key={index}
                    className="bg-card rounded-lg border border-border overflow-hidden animate-pulse"
                >
                    <div className="h-64 bg-muted" />
                    <div className="p-4 space-y-3">
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-4 bg-muted rounded w-2/3" />
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="h-4 bg-muted rounded w-1/3" />
                            <div className="h-4 bg-muted rounded w-1/4" />
                        </div>
                        <div className="h-10 bg-muted rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookGridSkeleton;