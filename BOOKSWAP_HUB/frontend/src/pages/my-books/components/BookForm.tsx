import { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { BookFormData, Book } from '../types';

interface BookFormProps {
  book?: Book | null;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
}

const BookForm = ({ book, onSubmit, onCancel }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    genre: '',
    condition: 'Good',
    description: '',
    imageUrl: '',
    imageAlt: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({});
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        condition: book.condition,
        description: book.description,
        imageUrl: book.imageUrl,
        imageAlt: book.imageAlt,
      });
    }
  }, [book]);

  const genres = [
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Self Help', label: 'Self Help' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Science Fiction', label: 'Science Fiction' },
    { value: 'Biography', label: 'Biography' },
    { value: 'History', label: 'History' },
    { value: 'Business', label: 'Business' },
  ];

  const conditions = [
    { value: 'Like New', label: 'Like New' },
    { value: 'Good', label: 'Good' },
    { value: 'Fair', label: 'Fair' },
    { value: 'Poor', label: 'Poor' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof BookFormData, string>> = {};

    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
      if (!formData.author.trim()) {
        newErrors.author = 'Author is required';
      }
      if (!formData.genre) {
        newErrors.genre = 'Genre is required';
      }
    } else if (step === 2) {
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      } else if (formData.description.length < 20) {
        newErrors.description = 'Description must be at least 20 characters';
      }
      if (!formData.imageUrl.trim()) {
        newErrors.imageUrl = 'Image URL is required';
      }
      if (!formData.imageAlt.trim()) {
        newErrors.imageAlt = 'Image description is required for accessibility';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(2)) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              {book ? 'Edit Book' : 'Add New Book'}
            </h2>
            <button
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
              aria-label="Close form"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                1
              </div>
              <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                Basic Info
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-border" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                2
              </div>
              <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                Details
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                label="Book Title"
                type="text"
                placeholder="Enter book title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={errors.title}
                required
              />

              <Input
                label="Author"
                type="text"
                placeholder="Enter author name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                error={errors.author}
                required
              />

              <Select
                label="Genre"
                options={genres}
                value={formData.genre}
                onChange={(value) => setFormData({ ...formData, genre: value as string })}
                error={errors.genre}
                placeholder="Select genre"
                required
              />

              <Select
                label="Condition"
                options={conditions}
                value={formData.condition}
                onChange={(value) => setFormData({ ...formData, condition: value as BookFormData['condition'] })}
                description="Assess the physical condition of your book"
                required
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description <span className="text-error">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a detailed description of the book (minimum 20 characters)"
                  rows={4}
                  className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-error">{errors.description}</p>
                )}
              </div>

              <Input
                label="Image URL"
                type="url"
                placeholder="https://example.com/book-cover.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                error={errors.imageUrl}
                description="Provide a direct link to the book cover image"
                required
              />

              <Input
                label="Image Description"
                type="text"
                placeholder="Describe the book cover for accessibility"
                value={formData.imageAlt}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                error={errors.imageAlt}
                description="Detailed description of the book cover for screen readers"
                required
              />

              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-foreground mb-2">Preview</p>
                  <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={formData.imageUrl}
                      alt={formData.imageAlt || 'Book cover preview'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {currentStep === 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              fullWidth={currentStep === 1}
            >
              Cancel
            </Button>
            {currentStep === 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
                fullWidth
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                iconName={book ? 'Save' : 'Plus'}
                iconPosition="left"
                fullWidth
              >
                {book ? 'Update Book' : 'Add Book'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;