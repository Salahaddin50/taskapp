import { Category, Subcategory } from '../../types/categories';

interface TargetCategoriesProps {
  category?: Category;
  subcategory?: Subcategory;
}

export function TargetCategories({ category, subcategory }: TargetCategoriesProps) {
  if (!category || !subcategory) return null;

  return (
    <div className="flex items-center space-x-2 mt-2 flex-shrink-0">
      <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs rounded-full truncate">
        {category.name}
      </span>
      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full truncate">
        {subcategory.name}
      </span>
    </div>
  );
}