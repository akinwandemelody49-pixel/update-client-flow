import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { Modal } from '../ui/Modal';
import { Input, Textarea, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const { addEnquiry } = useApp();

  // Form state for creating a manual enquiry / lead
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    companyName: '',
    projectTitle: '',
    serviceCategory: 'Branding' as ServiceCategory,
    budget: '$5,000',
    timeline: '4 weeks',
    message: '',
    internalNotes: ''
  });

  const [formError, setFormError] = useState('');

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.clientEmail.trim() || !formData.projectTitle.trim()) {
      setFormError('Please fill in the client name, email, and project title.');
      return;
    }

    addEnquiry({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      companyName: formData.companyName || undefined,
      projectTitle: formData.projectTitle,
      serviceCategory: formData.serviceCategory,
      budget: formData.budget,
      timeline: formData.timeline,
      message: formData.message || 'Direct lead created in studio dashboard.',
      internalNotes: formData.internalNotes || undefined
    });

    // Reset and close
    setFormData({
      clientName: '',
      clientEmail: '',
      companyName: '',
      projectTitle: '',
      serviceCategory: 'Branding',
      budget: '$5,000',
      timeline: '4 weeks',
      message: '',
      internalNotes: ''
    });
    setFormError('');
    setIsNewLeadModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:shrink-0">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex flex-col flex-1 w-full max-w-xs bg-white shadow-xl">
            <DashboardSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
        <DashboardHeader
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenNewEnquiryModal={() => setIsNewLeadModalOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Quick New Lead Modal */}
      <Modal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        title="Record New Client Lead"
        subtitle="Log an inbound enquiry or referral manually into your pipeline."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateLead} className="space-y-4">
          {formError && (
            <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Client Name"
              required
              placeholder="e.g. Marcus Thorne"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            />
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="e.g. client@company.com"
              value={formData.clientEmail}
              onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company / Studio"
              placeholder="e.g. Solis Capital"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
            <Select
              label="Service Category"
              value={formData.serviceCategory}
              onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value as ServiceCategory })}
              options={[
                { value: 'Branding', label: 'Branding & Identity' },
                { value: 'Packaging', label: 'Packaging Design' },
                { value: 'UI/UX Design', label: 'UI/UX & Product Design' },
                { value: 'Editorial & Print', label: 'Editorial & Print' },
                { value: 'Motion Design', label: 'Motion Design' }
              ]}
            />
          </div>

          <Input
            label="Project Title"
            required
            placeholder="e.g. Decarbonisation Fund Visual Identity"
            value={formData.projectTitle}
            onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Budget Scope"
              placeholder="e.g. $7,500"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
            <Input
              label="Estimated Timeline"
              placeholder="e.g. 4–6 weeks"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            />
          </div>

          <Textarea
            label="Initial Brief / Enquiry Details"
            rows={3}
            placeholder="What does the client need built or designed?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <Input
            label="Internal Notes"
            placeholder="e.g. Referred by Jane. High priority prospect."
            value={formData.internalNotes}
            onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
          />

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsNewLeadModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Save to Pipeline
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
