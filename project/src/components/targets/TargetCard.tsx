import { useState } from 'react';
import { Target, User } from '../../types';
import { Lock } from 'lucide-react';
import { getCategory, getSubcategory } from '../../types/categories';
import { TargetProgress } from './TargetProgress';
import { TargetCategories } from './TargetCategories';
import { TargetUserInfo } from './TargetUserInfo';
import { TargetActions } from './TargetActions';
import { ShareDialog } from './ShareDialog';

interface TargetCardProps {
  target: Target;
  user: User;
  currentUser: User | null;
  onAuthRequired: () => void;
}

export function TargetCard({ target, user, currentUser, onAuthRequired }: TargetCardProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const category = getCategory(target.categoryId);
  const subcategory = getSubcategory(target.categoryId, target.subcategoryId);

  const handleTargetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser && target.userId !== currentUser?.id) {
      onAuthRequired();
      return;
    }
    window.location.href = `/targets/${target.id}`;
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      onAuthRequired();
      return;
    }
    window.location.href = `/users/${user.id}`;
  };

  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  const handleChat = () => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }
    window.location.href = `/messages?user=${user.id}`;
  };

  const handleFavorite = () => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      <div 
        onClick={handleTargetClick}
        className="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 h-[220px] flex flex-col group cursor-pointer"
      >
        <TargetUserInfo user={user} onClick={handleUserClick} />

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

          <TargetCategories category={category} subcategory={subcategory} />
          <TargetProgress progress={target.progress} />
          
          <TargetActions
            targetId={target.id}
            onShare={handleShare}
            onChat={handleChat}
            onFavorite={handleFavorite}
            isFavorited={isFavorited}
          />
        </div>
      </div>

      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        targetTitle={target.title}
        targetUrl={`${window.location.origin}/targets/${target.id}`}
      />
    </>
  );
}