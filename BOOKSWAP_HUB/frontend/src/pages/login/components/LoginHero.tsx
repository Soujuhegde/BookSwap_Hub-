import Icon from '../../../components/AppIcon';

const LoginHero = () => {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12 lg:py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div className="max-w-md mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
            <Icon name="BookMarked" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              BookSwap Hub
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Exchange Books, Share Stories
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon name="Search" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Discover New Books
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Browse through thousands of books from fellow readers and find your next great read.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon name="ArrowLeftRight" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Easy Exchange Process
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Send exchange requests, chat with book owners, and complete transactions seamlessly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon name="UserPlus" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Join Our Community
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect with 15,000+ active readers and share your love for books.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">50K+</p>
              <p className="text-xs text-muted-foreground mt-1">Books Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">15K+</p>
              <p className="text-xs text-muted-foreground mt-1">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">25K+</p>
              <p className="text-xs text-muted-foreground mt-1">Exchanges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHero;