import { Progress } from '../ui/Progress';

interface TargetProgressProps {
  progress: number;
}

export function TargetProgress({ progress }: TargetProgressProps) {
  return (
    <div className="mt-auto pt-3 space-y-2 flex-shrink-0">
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
}