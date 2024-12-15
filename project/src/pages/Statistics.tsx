import { useStore } from '../store/useStore';
import { Priority, Action, Task } from '../types';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { 
  Target, 
  AlertTriangle, 
  AlertCircle, 
  Calendar,
  ArrowUp,
  ArrowDown,
  Clock,
  ChevronRight,
  HelpCircle,
  ArrowLeft,
  Layers,
  ListChecks,
  AlertOctagon,
  CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Statistics() {
  const { targets, user } = useStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-md inline-block mb-6">
            <Target className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Sign in Required</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Please sign in to view your statistics and progress tracking.
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

  const userTargets = targets.filter(target => target.userId === user.id);
  const completedTargets = userTargets.filter(target => target.progress === 100);

  const getAllActions = () => {
    return userTargets.flatMap(target => target.actions);
  };

  const getAllSteps = () => {
    return getAllActions().flatMap(action => action.steps);
  };

  const getAllTasks = () => {
    return getAllSteps().flatMap(step => step.tasks || []);
  };

  const getAllObstacles = () => {
    return getAllActions().flatMap(action => action.obstacles);
  };

  const getActionsByPriority = () => {
    const actions = getAllActions();
    const priorityMap: Record<Priority, Action[]> = {
      high: [],
      medium: [],
      low: []
    };

    actions.forEach(action => {
      if (action.urgency === 'high' || action.impact === 'high') {
        priorityMap.high.push(action);
      } else if (action.urgency === 'medium' || action.impact === 'medium') {
        priorityMap.medium.push(action);
      } else {
        priorityMap.low.push(action);
      }
    });

    return priorityMap;
  };

  const getPendingTasks = () => {
    const tasks = getAllTasks().filter(task => !task.completed);
    return tasks.sort((a, b) => {
      const getTaskPriority = (task: Task) => {
        const action = getAllActions().find(action => 
          action.steps.some(step => step.tasks?.some(t => t.id === task.id))
        );
        if (action?.urgency === 'high' || action?.impact === 'high') return 3;
        if (action?.urgency === 'medium' || action?.impact === 'medium') return 2;
        return 1;
      };
      return getTaskPriority(b) - getTaskPriority(a);
    });
  };

  const getTotalProgress = () => {
    if (userTargets.length === 0) return 0;
    return Math.round(
      userTargets.reduce((sum, target) => sum + target.progress, 0) / userTargets.length
    );
  };

  const navigateToTargetAction = (targetId: string, actionId: string) => {
    navigate(`/targets/${targetId}`, { state: { selectedActionId: actionId } });
  };

  const actions = getAllActions();
  const completedActions = actions.filter(action => action.progress === 100);
  const steps = getAllSteps();
  const completedSteps = steps.filter(step => 
    step.tasks?.every(task => task.completed) || step.completed
  );
  const tasks = getAllTasks();
  const completedTasks = tasks.filter(task => task.completed);
  const obstacles = getAllObstacles();
  const resolvedObstacles = obstacles.filter(obstacle => obstacle.resolved);
  const actionsByPriority = getActionsByPriority();
  const pendingTasks = getPendingTasks();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Statistics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and manage tasks effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/dashboard" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Target className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedTargets.length}/{userTargets.length}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Targets</h3>
            </div>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Layers className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedActions.length}/{actions.length}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Actions</h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <ListChecks className="h-8 w-8 text-green-600 dark:text-green-500" />
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedSteps.length}/{steps.length}
                </span>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {completedTasks.length}/{tasks.length} tasks
                </div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Steps</h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertOctagon className="h-8 w-8 text-orange-600 dark:text-orange-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {resolvedObstacles.length}/{obstacles.length}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Obstacles</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Overall Progress</h2>
            <div className="space-y-4">
              {userTargets.map(target => (
                <Link key={target.id} to={`/targets/${target.id}`}>
                  <div className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 -mx-3 rounded-xl transition-colors">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-medium">
                        {target.title}
                      </span>
                      <div className="flex items-center">
                        <span>{target.progress}%</span>
                        <ChevronRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <Progress value={target.progress} />
                  </div>
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white mb-2">
                  <span>Total Progress</span>
                  <span>{getTotalProgress()}%</span>
                </div>
                <Progress value={getTotalProgress()} className="h-3" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Actions by Priority</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowUp className="h-4 w-4 text-red-500 dark:text-red-400" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">High Priority</h3>
                </div>
                <div className="space-y-2">
                  {actionsByPriority.high.map(action => (
                    <button
                      key={action.id}
                      onClick={() => navigateToTargetAction(action.targetId, action.id)}
                      className="w-full text-left"
                    >
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-colors">
                        <p className="text-sm text-red-900 dark:text-red-300">{action.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-red-700 dark:text-red-400">
                            {userTargets.find(t => t.id === action.targetId)?.title}
                          </p>
                          <ChevronRight className="h-4 w-4 text-red-400 dark:text-red-500" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowUp className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Medium Priority</h3>
                </div>
                <div className="space-y-2">
                  {actionsByPriority.medium.map(action => (
                    <button
                      key={action.id}
                      onClick={() => navigateToTargetAction(action.targetId, action.id)}
                      className="w-full text-left"
                    >
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-xl transition-colors">
                        <p className="text-sm text-yellow-900 dark:text-yellow-300">{action.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-yellow-700 dark:text-yellow-400">
                            {userTargets.find(t => t.id === action.targetId)?.title}
                          </p>
                          <ChevronRight className="h-4 w-4 text-yellow-400 dark:text-yellow-500" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowDown className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Low Priority</h3>
                </div>
                <div className="space-y-2">
                  {actionsByPriority.low.map(action => (
                    <button
                      key={action.id}
                      onClick={() => navigateToTargetAction(action.targetId, action.id)}
                      className="w-full text-left"
                    >
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-colors">
                        <p className="text-sm text-green-900 dark:text-green-300">{action.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-green-700 dark:text-green-400">
                            {userTargets.find(t => t.id === action.targetId)?.title}
                          </p>
                          <ChevronRight className="h-4 w-4 text-green-400 dark:text-green-500" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Pending Tasks ({pendingTasks.length})
          </h2>
          <div className="space-y-3">
            {pendingTasks.map(task => {
              const action = getAllActions().find(action => 
                action.steps.some(step => step.tasks?.some(t => t.id === task.id))
              );
              const target = userTargets.find(t => t.id === action?.targetId);
              
              return (
                <button
                  key={task.id}
                  onClick={() => action && target && navigateToTargetAction(target.id, action.id)}
                  className="w-full text-left"
                >
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.description}
                        </p>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {target?.title} • {action?.title}
                          </span>
                          {task.deadline && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                              Due {new Date(task.deadline).toLocaleDateString()}
                            </span>
                          )}
                          {(action?.urgency === 'high' || action?.impact === 'high') && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
                              High Priority
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-1" />
                    </div>
                  </div>
                </button>
              );
            })}
            {pendingTasks.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">All tasks completed!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}