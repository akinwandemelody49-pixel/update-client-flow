import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LuArrowUpRight,
  LuLayers,
  LuInbox,
  LuFolderKanban,
  LuTrendingUp,
  LuSparkles,
  LuCheck,
  LuMessageSquare,
  LuCircleCheck
} from 'react-icons/lu';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input, Textarea, Select } from '../components/ui/Input';
import { PortfolioCard } from '../components/portfolio/PortfolioCard';
import { ProjectDetailModal } from '../components/portfolio/ProjectDetailModal';
import { useApp } from '../context/AppContext';
import { PortfolioItem, ServiceCategory } from '../types';

export const HomePage: React.FC = () => {
  const { portfolioItems, addEnquiry, metrics } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Inbound enquiry form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    companyName: '',
    projectTitle: '',
    serviceCategory: 'Branding' as ServiceCategory,
    budget: '$5,000 - $8,000',
    timeline: '4 - 6 weeks',
    message: ''
  });

  const categories = ['All', 'Branding', 'Packaging', 'UI/UX Design', 'Editorial & Print'];

  const filteredPortfolio = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addEnquiry({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        companyName: formData.companyName || undefined,
        projectTitle: formData.projectTitle || `${formData.serviceCategory} Project`,
        serviceCategory: formData.serviceCategory,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        internalNotes: 'Received via ClientFlow homepage inbound demonstration form.'
      });

      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-neutral-50 overflow-hidden">
      {/* 1. Hero Section with Background Image - Expansive Full Viewport Presence */}
      <section className="relative min-h-[88vh] lg:min-h-[94vh] flex items-center justify-center py-28 md:py-40 lg:py-48 border-b border-neutral-200/20 overflow-hidden">
        {/* Background Image Layer */}
        <img
          src="/assets/aistudio/pexels-lilartsy-6502493_9d100685.jpg"
          alt="Creative design editorial backdrop"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Scrim & Dark Gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/75 backdrop-blur-[1px]" />

        {/* Ambient Subtle Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF5A60]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF5A60] animate-pulse" />
            <span>Built Exclusively for Independent Designers</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] [text-wrap:balance] max-w-4xl mx-auto drop-shadow-sm font-heading">
            Design work that gets you hired.
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-neutral-200/90 leading-relaxed max-w-3xl mx-auto mt-7 [text-wrap:balance] font-normal">
            ClientFlow is the all-in-one studio platform for graphic designers to showcase high-impact portfolios, attract ideal commercial clients, and manage every enquiry without the chaos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link to="/profile/sophia-vance">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<LuArrowUpRight className="w-5 h-5" />}
                className="px-8 py-4 text-base font-bold shadow-xl shadow-[#FF5A60]/30 min-h-[52px] rounded-2xl"
              >
                Start for Free
              </Button>
            </Link>

            <a href="#portfolio">
              <button
                type="button"
                className="inline-flex items-center justify-center text-base px-7 py-3.5 rounded-2xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all cursor-pointer min-h-[52px]"
              >
                Explore Portfolio Showcase
              </button>
            </a>

            <Link to="/dashboard">
              <button
                type="button"
                className="inline-flex items-center justify-center text-base px-7 py-3.5 rounded-2xl font-semibold text-neutral-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer min-h-[52px]"
              >
                View Live Studio OS &rarr;
              </button>
            </Link>
          </div>

          {/* Micro Proof Trust Strip */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-neutral-300 text-xs sm:text-sm font-medium">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#FF5A60] font-bold">✓</span>
              <span>Editorial case study presentation</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#FF5A60] font-bold">✓</span>
              <span>Structured project brief intake</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#FF5A60] font-bold">✓</span>
              <span>Milestone revenue & pipeline tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section id="features" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider mb-2">Designed for Creatives</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight [text-wrap:balance]">
            Everything you need to run your freelance design business
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3">
            Stop losing high-value project inquiries in messy inboxes and DM threads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5A60]/10 text-[#FF5A60] flex items-center justify-center">
              <LuSparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Beautiful Designer Portfolios</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Showcase high-resolution case studies, typography specimens, and packaging with editorial elegance.
            </p>
          </Card>

          <Card padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <LuInbox className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Client Enquiry Management</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Capture structured project briefs, budget expectations, and timelines directly from prospective clients.
            </p>
          </Card>

          <Card padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <LuTrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Lead Pipeline Tracking</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Move enquiries seamlessly through stages from New Lead to Proposal, In Progress, and Completed.
            </p>
          </Card>

          <Card padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <LuFolderKanban className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Project Status Tracking</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Track project milestones, deliverables, payment schedules, and progress percentages with zero clutter.
            </p>
          </Card>

          <Card padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <LuLayers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Business Insights</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Understand your lead conversion rate, total pipeline value, and average deal size at a single glance.
            </p>
          </Card>

          <Card padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#FF5A60] flex items-center justify-center">
              <LuMessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Internal Studio Notes</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Keep private notes on client discussions, agreed revisions, and discovery call highlights right on each lead.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider mb-2">Simplicity First</div>
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">How ClientFlow Works</h2>
            <p className="text-sm text-neutral-600 mt-2">Three straightforward steps to take control of your creative business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="space-y-3">
              <div className="text-3xl font-bold text-[#FF5A60] font-mono">01</div>
              <h3 className="text-lg font-bold text-neutral-900">Build Your Portfolio</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Upload your finest brand identity, packaging, and digital UI work. Share your public profile with clients worldwide.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-3xl font-bold text-[#FF5A60] font-mono">02</div>
              <h3 className="text-lg font-bold text-neutral-900">Attract & Receive Enquiries</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Clients discover your work and submit detailed briefs with budget ranges, project timelines, and goals.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-3xl font-bold text-[#FF5A60] font-mono">03</div>
              <h3 className="text-lg font-bold text-neutral-900">Convert Leads into Projects</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Track deliverables, check off project milestones, record invoices, and watch your studio pipeline grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfolio Showcase Section */}
      <section id="portfolio" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider mb-2">Featured Work</div>
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
              Selected Designer Portfolio
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Sample work published by independent designer Sophia Vance.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/70 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPortfolio.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onClick={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/profile/sophia-vance">
            <Button variant="outline" size="md" rightIcon={<LuArrowUpRight className="w-4 h-4" />}>
              View Full Designer Profile & Rates
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. Inbound Demo Enquiry Form Section */}
      <section className="py-20 bg-white border-y border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider mb-2">Interactive Demonstration</div>
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
              Test Inbound Enquiry Flow
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Send a demo project enquiry below. It will immediately appear in the Designer Dashboard!
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <LuCircleCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Enquiry Received Successfully!</h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                Your enquiry for <span className="font-semibold text-neutral-900">{formData.projectTitle || formData.serviceCategory}</span> was saved to local storage.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link to="/dashboard/enquiries">
                  <Button variant="primary" size="md">
                    Open Dashboard to View Your Enquiry
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      clientName: '',
                      clientEmail: '',
                      companyName: '',
                      projectTitle: '',
                      serviceCategory: 'Branding',
                      budget: '$5,000 - $8,000',
                      timeline: '4 - 6 weeks',
                      message: ''
                    });
                  }}
                >
                  Submit Another Test Enquiry
                </Button>
              </div>
            </div>
          ) : (
            <Card padding="lg" className="border-neutral-300 shadow-md">
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name / Client Name"
                    required
                    placeholder="e.g. Rachel Adams"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="e.g. rachel@studio.co"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Company or Brand (Optional)"
                    placeholder="e.g. Luminary Skincare"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                  <Select
                    label="Service Needed"
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value as ServiceCategory })}
                    options={[
                      { value: 'Branding', label: 'Brand Identity & Guidelines' },
                      { value: 'Packaging', label: 'Sustainable Packaging' },
                      { value: 'UI/UX Design', label: 'Digital Product / Web Design' },
                      { value: 'Editorial & Print', label: 'Editorial & Art Monograph' },
                      { value: 'Motion Design', label: 'Motion & Animation' }
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Project Title"
                    required
                    placeholder="e.g. New Brand Identity & Packaging Suite"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  />
                  <Select
                    label="Budget Range"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    options={[
                      { value: '$3,000 - $5,000', label: '$3,000 - $5,000' },
                      { value: '$5,000 - $8,000', label: '$5,000 - $8,000' },
                      { value: '$8,000 - $15,000', label: '$8,000 - $15,000' },
                      { value: '$15,000+', label: '$15,000+ Enterprise' }
                    ]}
                  />
                </div>

                <Textarea
                  label="Project Brief & Goals"
                  required
                  rows={4}
                  placeholder="Tell Sophia about your vision, deliverables, target audience, and preferred kickoff date..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    Saves to demo pipeline instantly.
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    rightIcon={<LuArrowUpRight className="w-4 h-4" />}
                  >
                    Send Project Enquiry
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </section>

      {/* 6. Testimonials Section (Clearly identified as demonstration feedback) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider mb-2">Designer Community</div>
          <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">Loved by Independent Creatives</h2>
          <p className="text-sm text-neutral-500 mt-2">Demonstration reviews from active designers using ClientFlow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="md" className="space-y-4">
            <p className="text-sm text-neutral-700 leading-relaxed italic">
              &ldquo;Before ClientFlow, I was tracking enquiries in Google Sheets and losing proposals in Instagram DMs. Now my clients take me more seriously and my average deal size doubled.&rdquo;
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-xs text-neutral-700">
                MK
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-900">Maya Kapoor</div>
                <div className="text-[11px] text-neutral-500">Brand Identity Specialist · Berlin</div>
              </div>
            </div>
          </Card>

          <Card padding="md" className="space-y-4">
            <p className="text-sm text-neutral-700 leading-relaxed italic">
              &ldquo;The public profile is pure gold. Clients fill out my structured brief before we ever jump on a Zoom call. It saves me at least 5 hours of back-and-forth every week.&rdquo;
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-xs text-neutral-700">
                JL
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-900">Julian Laurent</div>
                <div className="text-[11px] text-neutral-500">Packaging Designer · Montreal</div>
              </div>
            </div>
          </Card>

          <Card padding="md" className="space-y-4">
            <p className="text-sm text-neutral-700 leading-relaxed italic">
              &ldquo;Clean, fast, and no unnecessary bloat. Having my portfolio, client leads, and deliverables in one unified dashboard changed how I operate my solo studio.&rdquo;
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-xs text-neutral-700">
                TN
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-900">Tomás Navarro</div>
                <div className="text-[11px] text-neutral-500">UI/UX & Product Designer · Madrid</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Case Study Modal */}
      <ProjectDetailModal
        item={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquireAboutSimilar={(category) => {
          setFormData((prev) => ({ ...prev, serviceCategory: category as ServiceCategory }));
          window.location.hash = 'interactive-preview';
        }}
      />
    </div>
  );
};
