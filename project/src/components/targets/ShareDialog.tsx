import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../ui/Button';
import { X, Link, Copy, Twitter, Facebook, LinkedinIcon } from 'lucide-react';
import { useState } from 'react';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetTitle: string;
  targetUrl: string;
}

export function ShareDialog({ open, onOpenChange, targetTitle, targetUrl }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=Check out this target: ${targetTitle}&url=${encodeURIComponent(targetUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(targetUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(targetUrl)}`, '_blank');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
              Share Target
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Link className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={targetUrl}
                  readOnly
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-600 dark:text-gray-300"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className={copied ? 'text-green-500' : 'text-gray-500'}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied && (
                <span className="absolute right-0 -bottom-6 text-xs text-green-500">
                  Copied to clipboard!
                </span>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={shareOnTwitter}
                className="flex-1"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={shareOnFacebook}
                className="flex-1"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={shareOnLinkedIn}
                className="flex-1"
              >
                <LinkedinIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}