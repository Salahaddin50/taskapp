import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { ArrowLeft, MessageCircle, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Messages() {
  const { user } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-md inline-block mb-6">
            <MessageCircle className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Sign in Required</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Please sign in to access your messages.
          </p>
          <Link to="/auth">
            <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
              Sign In to Continue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {/* Placeholder for when there are no messages */}
            <div className="py-12 text-center">
              <User className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No messages yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start a conversation by messaging other users
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}