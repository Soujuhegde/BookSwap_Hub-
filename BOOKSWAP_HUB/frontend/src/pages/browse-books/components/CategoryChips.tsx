import Icon from '../../../components/AppIcon';
import { CategoryChip } from '../types';

interface CategoryChipsProps {
    categories: CategoryChip[];
    selectedCategory: string;
    onCategorySelect: (genre: string) => void;
}

const CategoryChips = ({ categories, selectedCategory, onCategorySelect }: CategoryChipsProps) => {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                Browse by Category
            </h2>
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategorySelect(category.genre)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out ${selectedCategory === category.genre
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-card text-foreground border border-border hover:border-primary/50 hover:bg-muted'
                            }`}
                    >
                        <Icon name={category.icon} size={18} />
                        <span>{category.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryChips;