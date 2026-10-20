import { DesignerProfile, Enquiry, PortfolioItem, Project, TaskItem, ActivityItem, NotificationItem } from '../types';

export const initialProfile: DesignerProfile = {
  name: 'Sophia Vance',
  title: 'Independent Brand Identity & Digital Product Designer',
  location: 'London & Remote Worldwide',
  bio: 'Specialising in timeless visual identity systems, sustainable packaging, and high-conversion digital interfaces for ambitious independent brands and forward-thinking studios.',
  avatarUrl: '/images/avatar-sophia.jpg',
  availability: 'Available for Q4 projects',
  startingRate: '$4,500',
  experienceYears: 8,
  completedProjectsCount: 42,
  clientSatisfaction: 99,
  services: [
    {
      category: 'Branding',
      title: 'Brand Identity & Design Systems',
      description: 'Comprehensive visual identity including wordmarks, typography rules, color strategy, and complete brand guidelines.',
      startingFrom: '$5,500',
      turnaround: '3–4 weeks'
    },
    {
      category: 'Packaging',
      title: 'Sustainable Packaging Design',
      description: 'Custom structural and graphic packaging design tailored for luxury skincare, boutique spirits, and consumer goods.',
      startingFrom: '$4,800',
      turnaround: '3 weeks'
    },
    {
      category: 'UI/UX Design',
      title: 'Web & Mobile Product Design',
      description: 'Conversion-focused digital product design, interactive prototypes, and production-ready component libraries in Figma.',
      startingFrom: '$6,200',
      turnaround: '4–6 weeks'
    },
    {
      category: 'Editorial & Print',
      title: 'Art Direction & Editorial Books',
      description: 'Monographs, annual reports, cultural exhibition catalogues, and bespoke editorial publications.',
      startingFrom: '$3,800',
      turnaround: '2–3 weeks'
    }
  ],
  socials: [
    { platform: 'ReadCV', url: 'https://read.cv', label: 'read.cv/sophiavance' },
    { platform: 'Dribbble', url: 'https://dribbble.com', label: 'dribbble.com/sophiav' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', label: 'linkedin.com/in/sophiavance' },
    { platform: 'Twitter', url: 'https://twitter.com', label: '@sophiavance' }
  ]
};

export const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Arcana Design Studio & Type Specimen',
    clientName: 'Arcana Atelier',
    year: '2025',
    category: 'Branding',
    description: 'Complete visual identity architecture, geometric logomark, bespoke letterpress business cards, and modular brand guidelines.',
    imageUrl: '/images/lumina-branding.jpg',
    featured: true,
    tags: ['Brand Identity', 'Typography', 'Stationery', 'Guidelines'],
    metrics: '+180% inbound brand inquiries in first 90 days'
  },
  {
    id: 'port-2',
    title: 'Botanica Clean Skincare Packaging',
    clientName: 'Botanica Nordic Labs',
    year: '2025',
    category: 'Packaging',
    description: 'Sustainable luxury packaging with amber glass bottles, tactile unbleached paper boxes, and minimalist botanical typography.',
    imageUrl: '/images/norden-packaging.jpg',
    featured: true,
    tags: ['Packaging Design', 'Sustainable Materials', 'Label System', 'Cosmetics'],
    metrics: 'Selected for 2025 Dieline Eco-Packaging Award'
  },
  {
    id: 'port-3',
    title: 'Brutalist Void Architectural Monograph',
    clientName: 'Museum of Concrete Architecture',
    year: '2024',
    category: 'Editorial & Print',
    description: 'A 280-page archival hardcover monograph exploring mid-century concrete structures with rigorous Swiss typographic grid layouts.',
    imageUrl: '/images/forma-editorial.jpg',
    featured: true,
    tags: ['Book Design', 'Editorial Grid', 'Art Direction', 'Typography'],
    metrics: 'Sold out 2,500 limited first edition prints'
  },
  {
    id: 'port-4',
    title: 'Vesta Wealth Management Platform',
    clientName: 'Vesta FinTech UK',
    year: '2025',
    category: 'UI/UX Design',
    description: 'End-to-end mobile app design for modern investors, featuring dark-mode asset overviews, real-time portfolio charts, and design tokens.',
    imageUrl: '/images/fintech-ui.jpg',
    featured: true,
    tags: ['Fintech App', 'UI/UX', 'Design Tokens', 'iOS & Android'],
    metrics: '4.9/5 App Store rating across 14,000+ active users'
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-101',
    clientName: 'Elena Rostova',
    clientEmail: 'elena@novacoffee.co',
    companyName: 'Nova Artisan Roasters',
    projectTitle: 'Specialty Coffee Packaging & Brand Identity Refresh',
    serviceCategory: 'Packaging',
    budget: '$6,500',
    timeline: '4–6 weeks',
    message: 'We are relaunching our single-origin retail bags across 40 specialty stores in Europe. We love your work on Botanica and need a tactile, minimalist packaging system and refreshed mark.',
    dateReceived: '2026-10-18T10:14:00Z',
    status: 'new',
    internalNotes: 'Great brand fit. Send preliminary questionnaire and portfolio deck.'
  },
  {
    id: 'enq-102',
    clientName: 'Marcus Thorne',
    clientEmail: 'm.thorne@soliscapital.io',
    companyName: 'Solis Climate Ventures',
    projectTitle: 'Impact Investment Fund Brand & Website Design',
    serviceCategory: 'Branding',
    budget: '$12,000',
    timeline: '6–8 weeks',
    message: 'We are raising a $50M decarbonisation fund and need a sophisticated, institutional-grade visual identity and marketing landing page that feels clean and modern.',
    dateReceived: '2026-10-16T14:30:00Z',
    status: 'contacted',
    internalNotes: 'Discovery call held Oct 17. Proposal drafted at $12k milestone basis.'
  },
  {
    id: 'enq-103',
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah@kineticform.design',
    companyName: 'Kinetic Form Furniture',
    projectTitle: 'Exhibition Catalogue & Print Ephemera',
    serviceCategory: 'Editorial & Print',
    budget: '$4,200',
    timeline: '3 weeks',
    message: 'Preparing our Milano Design Week furniture showcase. Need a 48-page printed catalog and invitations with clean Swiss typography.',
    dateReceived: '2026-10-12T09:20:00Z',
    status: 'in_progress',
    internalNotes: 'Contract signed. Initial page layouts presented to client.'
  },
  {
    id: 'enq-104',
    clientName: 'David Chen',
    clientEmail: 'dchen@pulsehealth.app',
    companyName: 'Pulse Biometrics',
    projectTitle: 'Health Companion Mobile UI/UX Design',
    serviceCategory: 'UI/UX Design',
    budget: '$9,500',
    timeline: '5 weeks',
    message: 'Seeking a senior designer to overhaul our sleep and recovery tracking screens. Need intuitive data viz and refined design system in Figma.',
    dateReceived: '2026-10-05T16:45:00Z',
    status: 'completed',
    internalNotes: 'Handed off design tokens and Figma components. Invoiced final payment.'
  },
  {
    id: 'enq-105',
    clientName: 'Amara Okafor',
    clientEmail: 'amara@terraflora.earth',
    companyName: 'Terra Flora Botanicals',
    projectTitle: 'Organic Tea Tin Label & Carton Suite',
    serviceCategory: 'Packaging',
    budget: '$3,800',
    timeline: '4 weeks',
    message: 'Inquiring about tin packaging label designs for our loose-leaf botanical blends launching in autumn.',
    dateReceived: '2026-09-24T11:00:00Z',
    status: 'archived',
    internalNotes: 'Client postponed launch to Q1 2027 due to supply chain delays.'
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-201',
    title: 'Solis Climate Ventures Identity',
    clientName: 'Solis Capital',
    serviceCategory: 'Branding',
    status: 'in_progress',
    startDate: '2026-10-15',
    dueDate: '2026-11-28',
    budget: 12000,
    paidAmount: 6000,
    progress: 45,
    description: 'Visual identity system, typography hierarchy, responsive brand guidelines, and pitch deck template for climate tech fund.',
    deliverables: [
      { id: 'del-1', title: 'Creative brief and brand positioning audit', completed: true },
      { id: 'del-2', title: 'Primary wordmark & symbol iterations', completed: true },
      { id: 'del-3', title: 'Typography & secondary color palette', completed: false },
      { id: 'del-4', title: 'Complete Brand Guideline PDF (40 pages)', completed: false },
      { id: 'del-5', title: 'Figma Brand Asset Kit & Vector Exports', completed: false }
    ]
  },
  {
    id: 'proj-202',
    title: 'Kinetic Form Milano Catalog',
    clientName: 'Kinetic Form Furniture',
    serviceCategory: 'Editorial & Print',
    status: 'in_progress',
    startDate: '2026-10-10',
    dueDate: '2026-11-05',
    budget: 4200,
    paidAmount: 2100,
    progress: 75,
    description: '48-page exhibition catalog, foil-stamped invite cards, and spatial exhibition signage graphics for Milan showcase.',
    deliverables: [
      { id: 'del-6', title: 'Grid template and typographic scale', completed: true },
      { id: 'del-7', title: 'Catalog photo curation and retouching', completed: true },
      { id: 'del-8', title: 'Proof review with print studio', completed: true },
      { id: 'del-9', title: 'Final press-ready PDF with spot UV layer', completed: false }
    ]
  },
  {
    id: 'proj-203',
    title: 'Nova Specialty Coffee Packaging',
    clientName: 'Nova Artisan Roasters',
    serviceCategory: 'Packaging',
    status: 'planning',
    startDate: '2026-10-22',
    dueDate: '2026-12-02',
    budget: 6500,
    paidAmount: 0,
    progress: 10,
    description: 'Dieline development, sustainable pouch labels, and single-origin roast card system for European coffee distribution.',
    deliverables: [
      { id: 'del-10', title: 'Supplier dieline validation', completed: true },
      { id: 'del-11', title: 'Label typographic design & finish spec', completed: false },
      { id: 'del-12', title: 'Card insert system design', completed: false },
      { id: 'del-13', title: 'Pre-press packaging mechanical files', completed: false }
    ]
  },
  {
    id: 'proj-204',
    title: 'Pulse Biometrics Design System',
    clientName: 'Pulse Health App',
    serviceCategory: 'UI/UX Design',
    status: 'completed',
    startDate: '2026-09-01',
    dueDate: '2026-10-10',
    budget: 9500,
    paidAmount: 9500,
    progress: 100,
    description: 'Full iOS mobile app design system, dark-mode sleep metrics dashboards, and micro-interaction documentation.',
    deliverables: [
      { id: 'del-14', title: 'Figma design tokens & components', completed: true },
      { id: 'del-15', title: 'Screen flows & prototype', completed: true },
      { id: 'del-16', title: 'Handoff documentation for mobile engineers', completed: true }
    ]
  }
];

export const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Send packaging quote and discovery deck to Elena',
    relatedType: 'enquiry',
    relatedId: 'enq-101',
    relatedName: 'Nova Artisan Roasters',
    dueDate: '2026-10-21',
    priority: 'high',
    completed: false
  },
  {
    id: 'task-2',
    title: 'Review Solis Capital brand identity feedback with Marcus',
    relatedType: 'project',
    relatedId: 'proj-201',
    relatedName: 'Solis Climate Ventures',
    dueDate: '2026-10-23',
    priority: 'high',
    completed: false
  },
  {
    id: 'task-3',
    title: 'Prepare final Milano catalog press-ready PDF with spot UV layer',
    relatedType: 'project',
    relatedId: 'proj-202',
    relatedName: 'Kinetic Form Furniture',
    dueDate: '2026-10-25',
    priority: 'medium',
    completed: false
  },
  {
    id: 'task-4',
    title: 'Schedule Q4 project onboarding call with Sarah Jenkins',
    relatedType: 'enquiry',
    relatedId: 'enq-103',
    relatedName: 'Kinetic Form Furniture',
    dueDate: '2026-10-28',
    priority: 'low',
    completed: true
  }
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'enquiry_new',
    title: 'New enquiry received',
    description: 'Nova Artisan Roasters requested Specialty Coffee Packaging ($6,500)',
    timestamp: '2 hours ago',
    link: '/dashboard/enquiries'
  },
  {
    id: 'act-2',
    type: 'project_progress',
    title: 'Project milestone reached',
    description: 'Kinetic Form Milano Catalog reached 75% completion (Proofs reviewed)',
    timestamp: 'Yesterday',
    link: '/dashboard/projects'
  },
  {
    id: 'act-3',
    type: 'enquiry_status',
    title: 'Enquiry status updated',
    description: 'Solis Climate Ventures marked as Contacted (Discovery call scheduled)',
    timestamp: '2 days ago',
    link: '/dashboard/enquiries'
  },
  {
    id: 'act-4',
    type: 'task_completed',
    title: 'Task completed',
    description: 'Onboarding questionnaire sent for Q4 booking slot',
    timestamp: '3 days ago'
  },
  {
    id: 'act-5',
    type: 'portfolio_added',
    title: 'Portfolio item updated',
    description: 'Arcana Design Studio case study metrics refreshed (+180% inquiries)',
    timestamp: '5 days ago',
    link: '/dashboard/portfolio'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New High-Value Lead',
    description: 'Elena Rostova from Nova Artisan Roasters submitted a packaging enquiry ($6,500).',
    timestamp: '2h ago',
    read: false,
    type: 'enquiry',
    link: '/dashboard/enquiries'
  },
  {
    id: 'notif-2',
    title: 'Upcoming Project Deadline',
    description: 'Kinetic Form Milano Catalog press-ready files due in 4 days.',
    timestamp: '5h ago',
    read: false,
    type: 'project',
    link: '/dashboard/projects'
  },
  {
    id: 'notif-3',
    title: 'Follow-up Due Today',
    description: 'Follow-up scheduled with Marcus Thorne (Solis Capital).',
    timestamp: '1d ago',
    read: true,
    type: 'task',
    link: '/dashboard/enquiries'
  }
];

