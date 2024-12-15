import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Target, Action, Step, Obstacle, User, Task } from '../types';

interface Store {
  user: User | null;
  users: User[];
  targets: Target[];
  favorites: string[]; // Array of target IDs
  registerUser: (user: User) => void;
  signIn: (email: string, password: string) => { user: User | null };
  signOut: () => void;
  setUser: (user: User | null) => void;
  addTarget: (target: Target) => void;
  updateTarget: (targetId: string, updates: Partial<Target>) => void;
  deleteTarget: (targetId: string) => void;
  toggleFavorite: (targetId: string) => void;
  isFavorite: (targetId: string) => boolean;
  addAction: (targetId: string, action: Action) => void;
  updateAction: (targetId: string, action: Action) => void;
  deleteAction: (targetId: string, actionId: string) => void;
  addStep: (targetId: string, actionId: string, step: Step) => void;
  updateStep: (targetId: string, actionId: string, step: Step) => void;
  deleteStep: (targetId: string, actionId: string, stepId: string) => void;
  addTask: (targetId: string, actionId: string, stepId: string, task: Task) => void;
  updateTask: (targetId: string, actionId: string, stepId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (targetId: string, actionId: string, stepId: string, taskId: string) => void;
  updateTaskDeadline: (targetId: string, actionId: string, stepId: string, taskId: string, deadline?: Date) => void;
  toggleTask: (targetId: string, actionId: string, stepId: string, taskId: string) => void;
  addObstacle: (targetId: string, actionId: string, obstacle: Obstacle) => void;
  updateObstacle: (targetId: string, actionId: string, obstacleId: string, updates: Partial<Obstacle>) => void;
  deleteObstacle: (targetId: string, actionId: string, obstacleId: string) => void;
  resolveObstacle: (targetId: string, actionId: string, obstacleId: string, resolution: string, resolutionDate: Date) => void;
  unresolveObstacle: (targetId: string, actionId: string, obstacleId: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      targets: [],
      favorites: [],

      registerUser: (user) =>
        set((state) => ({
          users: [...state.users, { ...user, createdAt: new Date() }],
          user: user,
        })),

      signIn: (email, password) => {
        let matchedUser: User | null = null;
        set((state) => {
          const user = state.users.find(
            (u) => u.email === email && u.password === password
          );
          matchedUser = user || null;
          return { user: matchedUser };
        });
        return { user: matchedUser };
      },

      signOut: () => set({ user: null }),
      
      setUser: (user) => set({ user }),

      addTarget: (target) =>
        set((state) => ({
          targets: [...state.targets, target],
        })),

      updateTarget: (targetId, updates) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId ? { ...target, ...updates } : target
          ),
        })),

      deleteTarget: (targetId) =>
        set((state) => ({
          targets: state.targets.filter((target) => target.id !== targetId),
          favorites: state.favorites.filter((id) => id !== targetId),
        })),

      toggleFavorite: (targetId) =>
        set((state) => ({
          favorites: state.favorites.includes(targetId)
            ? state.favorites.filter(id => id !== targetId)
            : [...state.favorites, targetId]
        })),

      isFavorite: (targetId) => get().favorites.includes(targetId),

      addAction: (targetId, action) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? { ...target, actions: [...target.actions, action] }
              : target
          ),
        })),

      updateAction: (targetId, action) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((a) =>
                    a.id === action.id ? { ...a, ...action } : a
                  ),
                }
              : target
          ),
        })),

      deleteAction: (targetId, actionId) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.filter((a) => a.id !== actionId),
                }
              : target
          ),
        })),

      addStep: (targetId, actionId, step) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? { ...action, steps: [...action.steps, step] }
                      : action
                  ),
                }
              : target
          ),
        })),

      updateStep: (targetId, actionId, step) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          steps: action.steps.map((s) =>
                            s.id === step.id ? { ...s, ...step } : s
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      deleteStep: (targetId, actionId, stepId) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          steps: action.steps.filter((s) => s.id !== stepId),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      addTask: (targetId, actionId, stepId, task) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          steps: action.steps.map((step) =>
                            step.id === stepId
                              ? {
                                  ...step,
                                  tasks: [...(step.tasks || []), task],
                                }
                              : step
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      updateTask: (targetId, actionId, stepId, taskId, updates) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          steps: action.steps.map((step) =>
                            step.id === stepId
                              ? {
                                  ...step,
                                  tasks: (step.tasks || []).map((task) =>
                                    task.id === taskId
                                      ? { ...task, ...updates }
                                      : task
                                  ),
                                }
                              : step
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      deleteTask: (targetId, actionId, stepId, taskId) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          steps: action.steps.map((step) =>
                            step.id === stepId
                              ? {
                                  ...step,
                                  tasks: (step.tasks || []).filter(
                                    (task) => task.id !== taskId
                                  ),
                                }
                              : step
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      updateTaskDeadline: (targetId, actionId, stepId, taskId, deadline) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          steps: action.steps.map((step) =>
                            step.id === stepId
                              ? {
                                  ...step,
                                  tasks: (step.tasks || []).map((task) =>
                                    task.id === taskId
                                      ? { ...task, deadline }
                                      : task
                                  ),
                                }
                              : step
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      toggleTask: (targetId, actionId, stepId, taskId) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          steps: action.steps.map((step) =>
                            step.id === stepId
                              ? {
                                  ...step,
                                  tasks: (step.tasks || []).map((task) =>
                                    task.id === taskId
                                      ? { ...task, completed: !task.completed }
                                      : task
                                  ),
                                }
                              : step
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      addObstacle: (targetId, actionId, obstacle) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          obstacles: [...action.obstacles, obstacle],
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      updateObstacle: (targetId, actionId, obstacleId, updates) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          obstacles: action.obstacles.map((obstacle) =>
                            obstacle.id === obstacleId
                              ? { ...obstacle, ...updates }
                              : obstacle
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      deleteObstacle: (targetId, actionId, obstacleId) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          obstacles: action.obstacles.filter(
                            (o) => o.id !== obstacleId
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      resolveObstacle: (targetId, actionId, obstacleId, resolution, resolutionDate) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          obstacles: action.obstacles.map((obstacle) =>
                            obstacle.id === obstacleId
                              ? {
                                  ...obstacle,
                                  resolved: true,
                                  resolution,
                                  resolutionDate,
                                }
                              : obstacle
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),

      unresolveObstacle: (targetId, actionId, obstacleId) =>
        set((state) => ({
          targets: state.targets.map((target) =>
            target.id === targetId
              ? {
                  ...target,
                  actions: target.actions.map((action) =>
                    action.id === actionId
                      ? {
                          ...action,
                          obstacles: action.obstacles.map((obstacle) =>
                            obstacle.id === obstacleId
                              ? {
                                  ...obstacle,
                                  resolved: false,
                                  resolution: undefined,
                                  resolutionDate: undefined,
                                }
                              : obstacle
                          ),
                        }
                      : action
                  ),
                }
              : target
          ),
        })),
    }),
    {
      name: 'target-achiever-storage',
    }
  )
);