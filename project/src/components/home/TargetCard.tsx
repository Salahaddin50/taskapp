import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Target, User } from '../../types';
import { getCategory, getSubcategory } from '../../types/categories';
import { countries } from '../../data/countries';
import { Lock, Share2, MessageCircle, Heart, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';

interface TargetCardProps {
  target: Target;
  user: User;
  currentUser: User | null;
  onAuthRequired: () => void;
}

export function TargetCard({ target, user, currentUser, onAuthRequired }: TargetCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useStore();
  const category = getCategory(target.categoryId);
  const subcategory = getSubcategory(target.categoryId, target.subcategoryId);

  const handleTargetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser && target.userId !== currentUser?.id) {
      onAuthRequired();
      return;
    }
    navigate(`/targets/${target.id}`);
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      onAuthRequired();
      return;
    }
    navigate(`/users/${user.id}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement share functionality
  };

  const handleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      onAuthRequired();
      return;
    }
    navigate(`/messages?user=${user.id}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      onAuthRequired();
      return;
    }
    toggleFavorite(target.id);
  };

  const getLocationInfo = () => {
    const parts = [];
    if (user?.profile?.age) {
      parts.push(`${user.profile.age} y.o`);
    }
    if (user?.profile?.country) {
      const countryName = countries.find(c => c.code === user.profile.country)?.name;
      if (countryName) {
        parts.push(countryName);
      }
    }
    return parts.join(', ');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      onClick={handleTargetClick}
      className="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col group cursor-pointer"
    >
      <div className="flex items-start space-x-3 flex-shrink-0">
        <div 
          onClick={handleUserClick}
          className="group/avatar hover:opacity-80 transition-opacity cursor-pointer"
        >
          {user?.profile?.photo ? (
            <img
              src={user.profile.photo}
              alt={user.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white dark:ring-gray-700 flex-shrink-0 group-hover/avatar:ring-indigo-100 dark:group-hover/avatar:ring-indigo-900 transition-all"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center ring-2 ring-white dark:ring-gray-700 flex-shrink-0 group-hover/avatar:ring-indigo-100 dark:group-hover/avatar:ring-indigo-900 transition-all">
              <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                {user?.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div 
            onClick={handleUserClick}
            className="group/info cursor-pointer"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover/info:text-indigo-600 dark:group-hover/info:text-indigo-400 transition-colors">
              {user?.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
              {getLocationInfo()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
            {target.title}
          </h3>
          {!currentUser && (
            <Lock className="h-4 w-4 text-gray-400 dark:text-gray-600" />
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 flex-shrink-0">
          {target.description}
        </p>

        {category && subcategory && (
          <div className="flex items-center space-x-2 mt-2 flex-shrink-0">
            <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs rounded-full truncate">
              {category.name}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full truncate">
              {subcategory.name}
            </span>
          </div>
        )}

        <div className="mt-auto pt-3">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{target.progress}%</span>
          </div>
          <Progress value={target.progress} className="h-1.5" />
          
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleChat}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleFavorite}
                className={`${isFavorite(target.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
              >
                <Heart className="h-4 w-4" fill={isFavorite(target.id) ? 'currentColor' : 'none'} />
              </Button>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(target.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}