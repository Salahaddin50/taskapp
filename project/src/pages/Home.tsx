import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Plus, Target } from 'lucide-react';
import { categories } from '../types/categories';
import { SearchAndFilter } from '../components/home/SearchAndFilter';
import { TargetGrid } from '../components/home/TargetGrid';

export function Home() {
  const navigate = useNavigate();
  const { targets, users, user } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const handleNewTarget = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/targets/new');
  };

  const filteredTargets = targets.filter(target => {
    const matchesSearch = target.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      target.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || target.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTargets = [...filteredTargets].sort((a, b) => {
    switch (sortBy) {
      case 'progress':
        return b.progress - a.progress;
      case 'actions':
        return b.actions.length - a.actions.length;
      default: // recent
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user ? (
          <div className="text-center mb-12">
            <div className="inline-flex p-4 mb-8 rounded-2xl bg-white dark:bg-gray-800 shadow-md">
              <Target className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Discover Amazing Goals
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Browse through inspiring targets from our community. Join us to create and track your own goals.
            </p>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Discover Targets</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Explore and get inspired by community goals
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleNewTarget}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Target
              </Button>
            </div>
          </div>
        )}

        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <TargetGrid 
          targets={sortedTargets}
          users={users}
          currentUser={user}
          onAuthRequired={() => navigate('/auth')}
        />

        {!user && targets.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/auth">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                Sign in to Create Your Own Target
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}