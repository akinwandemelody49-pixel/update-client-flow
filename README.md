# ClientFlow — Web Platform for Independent Graphic Designers

ClientFlow is a modern web application built specifically for independent graphic designers to showcase creative portfolios, attract high-value clients, track inbound project enquiries through a sales pipeline, and monitor active deliverables.

## Tech Stack

- **React 19** with functional components and hooks
- **Vite 8** build tooling & development server
- **Tailwind CSS v4** for clean, modern utility styling
- **React Router v7** (`react-router-dom`) for client-side routing
- **React Icons (`react-icons/lu`)** for consistent interface iconography
- **LocalStorage API** for client-side prototype persistence without mock network dependencies

## Brand Identity

- **Product**: ClientFlow
- **Hero Headline**: *"Design work that gets you hired."*
- **Primary Accent**: Coral Red (`#FF5A60`)
- **Typography**: Plus Jakarta Sans (Display & Body) and JetBrains Mono (Tabular numerals)
- **Aesthetic**: Production SaaS clarity inspired by modern financial and productivity tools

## Key Features Implemented

1. **Marketing Homepage (`/`)**:
   - Hero section with high-converting copy and interactive product preview
   - Features grid highlighting designer portfolio CMS, enquiry pipeline, and business insights
   - 3-step "How It Works" workflow guide
   - Live interactive Portfolio Showcase with category filtering (Branding, Packaging, UI/UX, Editorial & Print)
   - Inbound project enquiry form that saves directly into the studio dashboard
   - Demonstration client reviews and testimonials
   - Standard 3-Zone Top Bar contract (`Navbar`) and disclosure `Footer`

2. **Designer Studio Dashboard (`/dashboard`)**:
   - Live overview metrics derived from a single source of truth in React Context:
     - New unaddressed inbound enquiries
     - Active client projects
     - Total pipeline value ($)
     - Lead-to-project conversion rate (%)
   - 4-stage visual sales pipeline breakdown (New Leads, Contacted, In Progress, Completed)
   - Recent enquiries table with quick status changer and inspector modal
   - Active project progress bars and milestone indicators

3. **Enquiry Management (`/dashboard/enquiries`)**:
   - Search across client names, emails, project titles, and company names
   - Filter by enquiry status (`all`, `new`, `contacted`, `in_progress`, `completed`, `archived`)
   - Filter by service discipline (`Branding`, `Packaging`, `UI/UX Design`, `Editorial & Print`, `Motion Design`)
   - Sort by newest, oldest, highest budget, and lowest budget
   - Full enquiry detail modal: client contact info, project brief message, timeline, budget
   - In-place stage updates that reflect instantly across dashboard metrics
   - Studio internal notes editor with auto-save feedback
   - Confirmed enquiry deletion workflow

4. **Projects Management (`/dashboard/projects`)**:
   - Project cards displaying contract budgets, clients, disciplines, and due dates
   - Filter by status (`planning`, `in_progress`, `review`, `completed`)
   - Interactive milestone checklist that recalculates project progress percentage in real time
   - Add new project contract modal with deliverable generator

5. **Portfolio Content Manager (`/dashboard/portfolio`)**:
   - Clean 4:3 ratio grid of published design work
   - Category filtering
   - Case study lightbox modal with deliverables, metrics, and photography
   - Add / Edit project modal supporting local image upload (FileReader data URL) or high-resolution studio presets
   - Project deletion with confirmation

6. **Public Designer Profile (`/profile/sophia-vance`)**:
   - Custom public landing page for featured designer Sophia Vance
   - Studio biography, location, starting rates, and availability indicator
   - Services offered cards with starting prices and turnaround times
   - Filterable portfolio gallery
   - Direct inbound project brief form submitting straight to the designer's pipeline

7. **Pricing & Plans (`/pricing`)**:
   - Monthly and annual billing switch with 20% discount badge
   - Free Starter Plan vs. Studio Pro vs. Collective comparison matrix
   - Clear prototype boundary disclosure

## Setup & Running Locally

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run production build
npm run build

# Run TypeScript checks
npm run lint
```

## Data and Security Boundaries

This application runs as a front-end prototype. All data is saved to the browser's `localStorage`. Data does not leave your device and does not require third-party cookies or remote credentials.
