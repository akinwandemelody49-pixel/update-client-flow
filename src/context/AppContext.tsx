import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DesignerProfile,
  Enquiry,
  EnquiryStatus,
  PortfolioItem,
  Project,
  ProjectStatus,
  TaskItem,
  ActivityItem,
  NotificationItem
} from '../types';
import {
  initialEnquiries,
  initialPortfolioItems,
  initialProfile,
  initialProjects,
  initialTasks,
  initialActivities,
  initialNotifications
} from '../data/demoData';

interface AppContextType {
  // Enquiries
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'dateReceived' | 'status'>) => Enquiry;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  updateEnquiryNotes: (id: string, notes: string) => void;
  deleteEnquiry: (id: string) => void;

  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => Project;
  updateProjectStatus: (id: string, status: ProjectStatus) => void;
  updateProjectProgress: (id: string, progress: number) => void;
  toggleDeliverable: (projectId: string, deliverableId: string) => void;
  deleteProject: (id: string) => void;

  // Portfolio
  portfolioItems: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => PortfolioItem;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;

  // Tasks
  tasks: TaskItem[];
  toggleTask: (id: string) => void;
  addTask: (task: Omit<TaskItem, 'id' | 'completed'>) => void;
  deleteTask: (id: string) => void;

  // Activities & Notifications
  activities: ActivityItem[];
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;

  // Profile & Settings
  profile: DesignerProfile;
  updateProfile: (updated: Partial<DesignerProfile>) => void;
  resetAllData: () => void;

  // Centralized Derived Metrics
  metrics: {
    totalEnquiries: number;
    newEnquiries: number;
    contactedEnquiries: number;
    inProgressEnquiries: number;
    completedEnquiries: number;
    activeProjects: number;
    totalPipelineValue: number;
    totalRevenue: number;
    conversionRate: number; // percentage
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ENQUIRIES: 'clientflow_enquiries_v1',
  PROJECTS: 'clientflow_projects_v1',
  PORTFOLIO: 'clientflow_portfolio_v1',
  PROFILE: 'clientflow_profile_v1',
  TASKS: 'clientflow_tasks_v1',
  ACTIVITIES: 'clientflow_activities_v1',
  NOTIFICATIONS: 'clientflow_notifications_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      return saved ? JSON.parse(saved) : initialEnquiries;
    } catch {
      return initialEnquiries;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      return saved ? JSON.parse(saved) : initialPortfolioItems;
    } catch {
      return initialPortfolioItems;
    }
  });

  const [profile, setProfile] = useState<DesignerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return saved ? JSON.parse(saved) : initialActivities;
    } catch {
      return initialActivities;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.warn('Could not save enquiries to localStorage:', e);
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Could not save projects to localStorage:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolioItems));
    } catch (e) {
      console.warn('Could not save portfolio items to localStorage:', e);
    }
  }, [portfolioItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not save profile to localStorage:', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Could not save tasks to localStorage:', e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch (e) {
      console.warn('Could not save activities to localStorage:', e);
    }
  }, [activities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Could not save notifications to localStorage:', e);
    }
  }, [notifications]);

  // Enquiry Actions
  const addEnquiry = (data: Omit<Enquiry, 'id' | 'dateReceived' | 'status'>) => {
    const newEnq: Enquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      dateReceived: new Date().toISOString(),
      status: 'new'
    };
    setEnquiries(prev => [newEnq, ...prev]);

    // Log Activity
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'enquiry_new',
      title: 'New enquiry received',
      description: `${newEnq.clientName} requested ${newEnq.projectTitle} (${newEnq.budget})`,
      timestamp: 'Just now',
      link: '/dashboard/enquiries'
    };
    setActivities(prev => [newAct, ...prev]);

    // Create Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Inbound Lead',
      description: `${newEnq.clientName} sent an enquiry for ${newEnq.serviceCategory} (${newEnq.budget}).`,
      timestamp: 'Just now',
      read: false,
      type: 'enquiry',
      link: '/dashboard/enquiries'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newEnq;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries(prev => {
      const target = prev.find(e => e.id === id);
      if (target && target.status !== status) {
        const newAct: ActivityItem = {
          id: `act-${Date.now()}`,
          type: 'enquiry_status',
          title: 'Enquiry status changed',
          description: `${target.clientName} (${target.projectTitle}) moved to ${status.replace('_', ' ')}`,
          timestamp: 'Just now',
          link: '/dashboard/enquiries'
        };
        setActivities(acts => [newAct, ...acts]);
      }
      return prev.map(item => item.id === id ? { ...item, status } : item);
    });
  };

  const updateEnquiryNotes = (id: string, notes: string) => {
    setEnquiries(prev => prev.map(item => item.id === id ? { ...item, internalNotes: notes } : item));
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(item => item.id !== id));
  };

  // Project Actions
  const addProject = (data: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...data,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'project_progress',
      title: 'New project created',
      description: `Started ${newProj.title} for ${newProj.clientName}`,
      timestamp: 'Just now',
      link: '/dashboard/projects'
    };
    setActivities(prev => [newAct, ...prev]);

    return newProj;
  };

  const updateProjectStatus = (id: string, status: ProjectStatus) => {
    setProjects(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const updateProjectProgress = (id: string, progress: number) => {
    setProjects(prev => prev.map(item => item.id === id ? { ...item, progress: Math.min(100, Math.max(0, progress)) } : item));
  };

  const toggleDeliverable = (projectId: string, deliverableId: string) => {
    setProjects(prev => prev.map(proj => {
      if (proj.id !== projectId) return proj;
      const updatedDel = proj.deliverables.map(del =>
        del.id === deliverableId ? { ...del, completed: !del.completed } : del
      );
      const completedCount = updatedDel.filter(d => d.completed).length;
      const calculatedProgress = updatedDel.length > 0 ? Math.round((completedCount / updatedDel.length) * 100) : proj.progress;
      return {
        ...proj,
        deliverables: updatedDel,
        progress: calculatedProgress,
        status: calculatedProgress === 100 ? 'completed' : proj.status === 'completed' ? 'in_progress' : proj.status
      };
    }));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
  };

  // Tasks Actions
  const toggleTask = (id: string) => {
    setTasks(prev => {
      const target = prev.find(t => t.id === id);
      const nextCompleted = !target?.completed;
      if (target && nextCompleted) {
        const newAct: ActivityItem = {
          id: `act-${Date.now()}`,
          type: 'task_completed',
          title: 'Task completed',
          description: `Completed "${target.title}"`,
          timestamp: 'Just now'
        };
        setActivities(acts => [newAct, ...acts]);
      }
      return prev.map(t => t.id === id ? { ...t, completed: nextCompleted } : t);
    });
  };

  const addTask = (data: Omit<TaskItem, 'id' | 'completed'>) => {
    const newTask: TaskItem = {
      ...data,
      id: `task-${Date.now()}`,
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Notification Actions
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Portfolio Actions
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`
    };
    setPortfolioItems(prev => [newItem, ...prev]);

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'portfolio_added',
      title: 'Portfolio item added',
      description: `Published "${newItem.title}" to showcase gallery`,
      timestamp: 'Just now',
      link: '/dashboard/portfolio'
    };
    setActivities(prev => [newAct, ...prev]);

    return newItem;
  };

  const updatePortfolioItem = (id: string, updated: Partial<PortfolioItem>) => {
    setPortfolioItems(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  // Profile & Settings
  const updateProfile = (updated: Partial<DesignerProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const resetAllData = () => {
    setEnquiries(initialEnquiries);
    setProjects(initialProjects);
    setPortfolioItems(initialPortfolioItems);
    setProfile(initialProfile);
    setTasks(initialTasks);
    setActivities(initialActivities);
    setNotifications(initialNotifications);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
  };

  // Single Source of Truth Metrics Calculations
  // Section 8 KPI definitions:
  // Card 1: New enquiries (status === 'new')
  const newEnquiries = enquiries.filter(e => e.status === 'new').length;
  const contactedEnquiries = enquiries.filter(e => e.status === 'contacted').length;
  const inProgressEnquiries = enquiries.filter(e => e.status === 'in_progress').length;
  const completedEnquiries = enquiries.filter(e => e.status === 'completed').length;

  // Card 2: Active projects (status is in_progress or review)
  const activeProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'planning' || p.status === 'review').length;

  // Card 3: Pipeline value
  // Sum of budgets for eligible open opportunities. Exclude converted ('completed'), lost, archived.
  const totalPipelineValue = enquiries.reduce((acc, curr) => {
    if (curr.status === 'archived' || curr.status === 'completed') return acc;
    const num = parseInt(curr.budget.replace(/[^0-9]/g, ''), 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  // Collected revenue from actual paid records in projects
  const totalRevenue = projects.reduce((acc, curr) => acc + (curr.paidAmount || 0), 0);

  // Card 4: Conversion rate
  // converted eligible enquiries / total eligible enquiries * 100
  const eligibleEnquiries = enquiries.filter(e => e.status !== 'archived');
  const convertedEnquiries = enquiries.filter(e => e.status === 'in_progress' || e.status === 'completed');
  const conversionRate = eligibleEnquiries.length > 0 ? Math.round((convertedEnquiries.length / eligibleEnquiries.length) * 100) : 0;

  return (
    <AppContext.Provider
      value={{
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        updateEnquiryNotes,
        deleteEnquiry,
        projects,
        addProject,
        updateProjectStatus,
        updateProjectProgress,
        toggleDeliverable,
        deleteProject,
        portfolioItems,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        activities,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        profile,
        updateProfile,
        resetAllData,
        metrics: {
          totalEnquiries: enquiries.length,
          newEnquiries,
          contactedEnquiries,
          inProgressEnquiries,
          completedEnquiries,
          activeProjects,
          totalPipelineValue,
          totalRevenue,
          conversionRate
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
