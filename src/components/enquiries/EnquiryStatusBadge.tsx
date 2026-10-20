import React from 'react';
import { EnquiryStatus } from '../../types';

interface EnquiryStatusBadgeProps {
  status: EnquiryStatus;
  className?: string;
}

export const EnquiryStatusBadge: React.FC<EnquiryStatusBadgeProps> = ({ status, className = '' }) => {
  const config: Record<EnquiryStatus, { label: string; dotColor: string; bg: string; text: string }> = {
    new: {
      label: 'New Lead',
      dotColor: 'bg-[#FF5A60]',
      bg: 'bg-[#FF5A60]/10',
      text: 'text-[#FF5A60]'
    },
    contacted: {
      label: 'Contacted',
      dotColor: 'bg-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-700'
    },
    in_progress: {
      label: 'In Progress',
      dotColor: 'bg-amber-500',
      bg: 'bg-amber-50',
      text: 'text-amber-700'
    },
    completed: {
      label: 'Completed',
      dotColor: 'bg-emerald-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700'
    },
    archived: {
      label: 'Archived',
      dotColor: 'bg-neutral-400',
      bg: 'bg-neutral-100',
      text: 'text-neutral-600'
    }
  };

  const item = config[status] || config.new;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${item.bg} ${item.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor} shrink-0`} />
      <span>{item.label}</span>
    </span>
  );
};
