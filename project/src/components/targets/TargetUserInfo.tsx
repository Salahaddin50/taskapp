import { User } from '../../types';
import { countries } from '../../data/countries';

interface TargetUserInfoProps {
  user: User;
  onClick: (e: React.MouseEvent) => void;
}

export function TargetUserInfo({ user, onClick }: TargetUserInfoProps) {
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

  return (
    <div className="flex items-start space-x-3 flex-shrink-0">
      <div 
        onClick={onClick}
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
          onClick={onClick}
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
  );
}