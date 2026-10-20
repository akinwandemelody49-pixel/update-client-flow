import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LuMapPin,
  LuCalendar,
  LuClock,
  LuArrowUpRight,
  LuCircleCheck,
  LuExternalLink,
  LuSparkles,
  LuSend,
  LuLayers
} from 'react-icons/lu';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea, Select } from '../components/ui/Input';
import { PortfolioCard } from '../components/portfolio/PortfolioCard';
import { ProjectDetailModal } from '../components/portfolio/ProjectDetailModal';
import { PortfolioItem, ServiceCategory } from '../types';

export const ProfilePage: React.FC = () => {
  const { profile, portfolioItems, addEnquiry } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Enquiry form state
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = ['All', 'Branding', 'Packaging', 'UI/UX Design', 'Editorial & Print'];

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addEnquiry({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        companyName: formData.companyName || undefined,
        projectTitle: formData.projectTitle || `${formData.serviceCategory} Project Brief`,
        serviceCategory: formData.serviceCategory,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        internalNotes: 'Received via Sophia Vance Public Profile page.'
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      {/* Designer Hero Header */}
      <section className="bg-white border-b border-neutral-200 pt-12 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-white shadow-md"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full shadow-xs">
                {profile.availability}
              </span>
            </div>

            {/* Designer Bio */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <LuMapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{profile.location}</span>
                </span>
                <span>·</span>
                <span>{profile.experienceYears} Years Studio Experience</span>
                <span>·</span>
                <span>Starting from <strong className="text-neutral-900">{profile.startingRate}</strong></span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                {profile.name}
              </h1>

              <p className="text-base text-neutral-600 font-medium">
                {profile.title}
              </p>

              <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl pt-1">
                {profile.bio}
              </p>

              {/* Social / Portfolio Links */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                {profile.socials.map((soc) => (
                  <a
                    key={soc.platform}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  >
                    <span>{soc.label}</span>
                    <LuArrowUpRight className="w-3 h-3 text-neutral-400" />
                  </a>
                ))}
                <a href="#enquiry-form">
                  <Button variant="primary" size="sm" rightIcon={<LuSend className="w-3.5 h-3.5" />}>
                    Send Project Brief
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Capabilities */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="mb-6">
          <div className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider mb-1">Expertise</div>
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Services & Starting Engagements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.services.map((srv) => (
            <Card key={srv.category} padding="md" className="flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#FF5A60] uppercase tracking-wider">
                    {srv.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
                    From {srv.startingFrom}
                  </span>
                </div>
                <h3 className="text-base font-bold text-neutral-900">{srv.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{srv.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <LuClock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Turnaround: {srv.turnaround}</span>
                </span>
                <a
                  href="#enquiry-form"
                  onClick={() => setFormData(prev => ({ ...prev, serviceCategory: srv.category }))}
                  className="text-[#FF5A60] hover:underline font-medium inline-flex items-center gap-0.5"
                >
                  Request Brief &rarr;
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Selected Portfolio Gallery */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider mb-1">Archive</div>
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Selected Work & Case Studies</h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/70 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onClick={(i) => setSelectedItem(i)}
            />
          ))}
        </div>
      </section>

      {/* Direct Project Inquiry Form */}
      <section id="enquiry-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-8">
          <div className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider mb-1">Inbound Brief</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Work with Sophia
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Fill in your project requirements below to receive a proposal and timeline.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <LuCircleCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Project Brief Submitted!</h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Thank you, {formData.clientName}. Your enquiry has been routed directly into Sophia&apos;s ClientFlow dashboard.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link to="/dashboard/enquiries">
                <Button variant="primary" size="sm">
                  View in Designer Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSubmitted(false);
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
                Send Another Brief
              </Button>
            </div>
          </div>
        ) : (
          <Card padding="lg" className="border-neutral-300 shadow-md">
            <form onSubmit={handleSubmitEnquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  required
                  placeholder="e.g. Marcus Thorne"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
                <Input
                  label="Work Email"
                  type="email"
                  required
                  placeholder="e.g. marcus@company.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Company / Studio Name"
                  placeholder="e.g. Solis Capital"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
                <Select
                  label="Primary Service Needed"
                  value={formData.serviceCategory}
                  onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value as ServiceCategory })}
                  options={[
                    { value: 'Branding', label: 'Brand Identity & Guidelines' },
                    { value: 'Packaging', label: 'Sustainable Packaging' },
                    { value: 'UI/UX Design', label: 'Digital Product / Web Design' },
                    { value: 'Editorial & Print', label: 'Editorial & Art Monograph' },
                    { value: 'Motion Design', label: 'Motion Design' }
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Project Title"
                  required
                  placeholder="e.g. Rebrand & Packaging Suite"
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
                label="Project Details & Requirements"
                required
                rows={4}
                placeholder="Describe your current brand challenge, target audience, deliverables, and preferred kickoff date..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Direct submission to Sophia Vance
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  rightIcon={<LuArrowUpRight className="w-4 h-4" />}
                >
                  Submit Project Brief
                </Button>
              </div>
            </form>
          </Card>
        )}
      </section>

      {/* Lightbox Modal */}
      <ProjectDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
