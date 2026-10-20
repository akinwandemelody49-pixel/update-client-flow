export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';

export type ServiceCategory = 'Branding' | 'Packaging' | 'UI/UX Design' | 'Editorial & Print' | 'Motion Design';

export interface Enquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName?: string;
  projectTitle: string;
  serviceCategory: ServiceCategory;
  budget: string;
  timeline: string;
  message: string;
  dateReceived: string; // ISO string
  status: EnquiryStatus;
  internalNotes?: string;
  followUpDate?: string;
}

export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed';

export interface Project {
  id: string;
  title: string;
  clientName: string;
  serviceCategory: ServiceCategory;
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
  budget: number;
  paidAmount: number;
  progress: number; // 0 - 100
  description: string;
  deliverables: { id: string; title: string; completed: boolean }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  year: string;
  category: ServiceCategory;
  description: string;
  imageUrl: string;
  featured: boolean;
  tags: string[];
  metrics?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  relatedType: 'enquiry' | 'project' | 'general';
  relatedId?: string;
  relatedName: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'enquiry_new' | 'enquiry_status' | 'project_progress' | 'task_completed' | 'portfolio_added';
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'enquiry' | 'project' | 'task';
  link?: string;
}

export interface DesignerProfile {
  name: string;
  title: string;
  location: string;
  bio: string;
  avatarUrl: string;
  availability: string;
  startingRate: string;
  experienceYears: number;
  completedProjectsCount: number;
  clientSatisfaction: number;
  services: {
    category: ServiceCategory;
    title: string;
    description: string;
    startingFrom: string;
    turnaround: string;
  }[];
  socials: {
    platform: string;
    url: string;
    label: string;
  }[];
}
