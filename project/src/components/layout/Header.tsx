import { UserMenu } from '../auth/UserMenu';
import { useStore } from '../../store/useStore';
import { BarChart, Layout, MessageCircle, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

export function Header() {
  const { user } = useStore();
  const location = useLocation();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/50 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-colors">
                <Layout className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Target Achiever
              </span>
            </Link>
            {user && (
              <nav className="flex space-x-1">
                <Link
                  to="/dashboard"
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Layout className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/statistics"
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/statistics'
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  Statistics
                </Link>
                <Link
                  to="/messages"
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/messages'
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                </Link>
                <Link
                  to="/favorites"
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/favorites'
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}