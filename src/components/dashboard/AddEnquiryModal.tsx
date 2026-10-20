import React, { useState, useEffect } from 'react';
import { LuX, LuInbox, LuCalendar, LuDollarSign, LuBriefcase, LuMail, LuUser } from 'react-icons/lu';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';

interface AddEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEnquiryModal: React.FC<AddEnquiryModalProps> = ({ isOpen, onClose }) => {
  const { addEnquiry } = useApp();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('Branding');
  const [budgetNumber, setBudgetNumber] = useState('5000');
  const [timeline, setTimeline] = useState('4–6 weeks');
  const [message, setMessage] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!clientName.trim()) errs.clientName = 'Client name is required';
    if (!clientEmail.trim()) {
      errs.clientEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      errs.clientEmail = 'Please provide a valid email address';
    }
    if (!projectTitle.trim()) errs.projectTitle = 'Project title is required';
    const num = parseFloat(budgetNumber);
    if (isNaN(num) || num <= 0) {
      errs.budgetNumber = 'Please enter a positive budget amount';
    }
    if (!message.trim()) errs.message = 'Project brief or message is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addEnquiry({
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      companyName: companyName.trim() || undefined,
      projectTitle: projectTitle.trim(),
      serviceCategory,
      budget: `$${parseInt(budgetNumber, 10).toLocaleString()}`,
      timeline,
      message: message.trim(),
      internalNotes: followUpDate ? `Follow-up target date set for ${followUpDate}` : undefined,
      followUpDate: followUpDate || undefined
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      // Reset form
      setClientName('');
      setClientEmail('');
      setCompanyName('');
      setProjectTitle('');
      setMessage('');
      setFollowUpDate('');
      setErrors({});
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-neutral-200 max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF5A60]/10 text-[#FF5A60] flex items-center justify-center">
              <LuInbox className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 leading-tight">
                Record New Client Enquiry
              </h3>
              <p className="text-xs text-neutral-500">
                Log inbound opportunities directly into your pipeline.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <span className="font-semibold">Success!</span> Enquiry registered to pipeline and metrics updated.
            </div>
          )}

          {/* Client Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Client Name <span className="text-[#FF5A60]">*</span>
              </label>
              <div className="relative">
                <LuUser className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className={`w-full text-xs pl-9 pr-3 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF5A60] ${
                    errors.clientName ? 'border-rose-400 bg-rose-50/30' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.clientName && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.clientName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Client Email <span className="text-[#FF5A60]">*</span>
              </label>
              <div className="relative">
                <LuMail className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="client@company.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className={`w-full text-xs pl-9 pr-3 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF5A60] ${
                    errors.clientEmail ? 'border-rose-400 bg-rose-50/30' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.clientEmail && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.clientEmail}</p>
              )}
            </div>
          </div>

          {/* Company & Project Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Company / Brand
              </label>
              <input
                type="text"
                placeholder="e.g. Nova Artisan Roasters"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF5A60]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Project Title <span className="text-[#FF5A60]">*</span>
              </label>
              <div className="relative">
                <LuBriefcase className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Specialty Coffee Packaging"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className={`w-full text-xs pl-9 pr-3 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF5A60] ${
                    errors.projectTitle ? 'border-rose-400 bg-rose-50/30' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.projectTitle && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.projectTitle}</p>
              )}
            </div>
          </div>

          {/* Service & Budget Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Service Category
              </label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value as ServiceCategory)}
                className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF5A60]"
              >
                <option value="Branding">Branding</option>
                <option value="Packaging">Packaging</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Editorial & Print">Editorial & Print</option>
                <option value="Motion Design">Motion Design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Budget (USD $) <span className="text-[#FF5A60]">*</span>
              </label>
              <div className="relative">
                <LuDollarSign className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="number"
                  required
                  min="1"
                  step="100"
                  placeholder="5000"
                  value={budgetNumber}
                  onChange={(e) => setBudgetNumber(e.target.value)}
                  className={`w-full text-xs pl-8 pr-3 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF5A60] ${
                    errors.budgetNumber ? 'border-rose-400' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.budgetNumber && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.budgetNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Target Timeline
              </label>
              <input
                type="text"
                placeholder="4–6 weeks"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF5A60]"
              />
            </div>
          </div>

          {/* Follow-up Target Date */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Optional Follow-up Date
            </label>
            <div className="relative">
              <LuCalendar className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF5A60]"
              />
            </div>
          </div>

          {/* Message Brief */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Project Brief & Client Message <span className="text-[#FF5A60]">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Outline project scope, deliverables, and client goals..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full text-xs px-3 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FF5A60] ${
                errors.message ? 'border-rose-400' : 'border-neutral-300'
              }`}
            />
            {errors.message && (
              <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add Enquiry to Pipeline
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
