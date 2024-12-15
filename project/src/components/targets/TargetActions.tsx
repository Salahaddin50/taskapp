import { Share2, MessageCircle, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';

interface TargetActionsProps {
  targetId: string;
  onShare: () => void;
  onChat: () => void;
  onFavorite: () => void;
  isFavorited?: boolean;
}

export function TargetActions({ targetId, onShare, onChat, onFavorite, isFavorited }: TargetActionsProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`flex items-center space-x-2 mt-3 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={(e) => {
          e.stopPropagation();
          onShare();
        }}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onChat();
        }}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onFavorite();
        }}
        className={`${isFavorited ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
      >
        <Heart className="h-4 w-4" fill={isFavorited ? 'currentColor' : 'none'} />
      </Button>
    </div>
  );
}