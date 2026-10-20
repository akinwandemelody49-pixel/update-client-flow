import React, { useState, useEffect } from 'react';
import { LuMail, LuCalendar, LuDollarSign, LuClock, LuTrash2, LuSave } from 'react-icons/lu';
import { Enquiry, EnquiryStatus } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Textarea, Select } from '../ui/Input';
import { EnquiryStatusBadge } from './EnquiryStatusBadge';

interface EnquiryDetailModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: EnquiryStatus) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}

export const EnquiryDetailModal: React.FC<EnquiryDetailModalProps> = ({
  enquiry,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onDelete
}) => {
  const [currentStatus, setCurrentStatus] = useState<EnquiryStatus>('new');
  const [notes, setNotes] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [savedNotesToast, setSavedNotesToast] = useState(false);

  useEffect(() => {
    if (enquiry) {
      setCurrentStatus(enquiry.status);
      setNotes(enquiry.internalNotes || '');
      setIsConfirmingDelete(false);
      setSavedNotesToast(false);
    }
  }, [enquiry]);

  if (!enquiry) return null;

  const handleStatusChange = (newStatus: EnquiryStatus) => {
    setCurrentStatus(newStatus);
    onUpdateStatus(enquiry.id, newStatus);
  };

  const handleSaveNotes = () => {
    onUpdateNotes(enquiry.id, notes);
    setSavedNotesToast(true);
    setTimeout(() => setSavedNotesToast(false), 2500);
  };

  const handleDelete = () => {
    onDelete(enquiry.id);
    onClose();
  };

  const formattedDate = new Date(enquiry.dateReceived).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={enquiry.projectTitle}
      subtitle={`Received from ${enquiry.clientName} (${enquiry.companyName || 'Independent'})`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Header Badges & Quick Status Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 font-medium">Status:</span>
            <EnquiryStatusBadge status={currentStatus} />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="enquiry-status-selector" className="text-xs text-neutral-500 font-medium whitespace-nowrap">
              Change stage:
            </label>
            <select
              id="enquiry-status-selector"
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as EnquiryStatus)}
              className="px-2.5 py-1 text-xs font-medium bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A60]/20 focus:border-[#FF5A60]"
            >
              <option value="new">New Lead</option>
              <option value="contacted">Contacted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Client Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
              <LuMail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </div>
            <a
              href={`mailto:${enquiry.clientEmail}`}
              className="font-medium text-neutral-900 hover:text-[#FF5A60] truncate block"
            >
              {enquiry.clientEmail}
            </a>
          </div>

          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
              <LuDollarSign className="w-3.5 h-3.5" />
              <span>Budget</span>
            </div>
            <div className="font-semibold text-neutral-900 tabular-nums">
              {enquiry.budget}
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
              <LuClock className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </div>
            <div className="font-medium text-neutral-900">
              {enquiry.timeline}
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
              <LuCalendar className="w-3.5 h-3.5" />
              <span>Received</span>
            </div>
            <div className="font-medium text-neutral-900 truncate">
              {formattedDate}
            </div>
          </div>
        </div>

        {/* Client Message */}
        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Client Inquiry Message
          </h4>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/90 text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
            {enquiry.message}
          </div>
        </div>

        {/* Internal Designer Notes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Internal Studio Notes
            </label>
            {savedNotesToast && (
              <span className="text-xs text-emerald-600 font-medium animate-in fade-in">
                Notes saved
              </span>
            )}
          </div>
          <Textarea
            label=""
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record client requirements, discussion notes, budget agreements, or next follow-up date..."
          />
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveNotes}
              leftIcon={<LuSave className="w-3.5 h-3.5" />}
            >
              Save Notes
            </Button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {isConfirmingDelete ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-red-600 font-medium">Confirm deletion?</span>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Yes, Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsConfirmingDelete(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsConfirmingDelete(true)}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
            >
              <LuTrash2 className="w-3.5 h-3.5" />
              <span>Delete this enquiry</span>
            </button>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={`mailto:${enquiry.clientEmail}?subject=Re: ${encodeURIComponent(enquiry.projectTitle)}`}
              className="inline-block"
            >
              <Button variant="primary" size="sm" leftIcon={<LuMail className="w-3.5 h-3.5" />}>
                Reply to Client
              </Button>
            </a>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
