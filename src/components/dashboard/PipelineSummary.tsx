import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { EnquiryStatus } from '../../types';

export const PipelineSummary: React.FC = () => {
  const { enquiries, metrics } = useApp();

  const stages: {
    key: EnquiryStatus;
    label: string;
    count: number;
    color: string;
    badgeBg: string;
    textColor: string;
  }[] = [
    {
      key: 'new',
      label: 'New Leads',
      count: metrics.newEnquiries,
      color: 'bg-[#FF5A60]',
      badgeBg: 'bg-[#FF5A60]/10',
      textColor: 'text-[#FF5A60]'
    },
    {
      key: 'contacted',
      label: 'Contacted',
      count: metrics.contactedEnquiries,
      color: 'bg-blue-500',
      badgeBg: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      key: 'in_progress',
      label: 'In Progress',
      count: metrics.inProgressEnquiries,
      color: 'bg-amber-500',
      badgeBg: 'bg-amber-50',
      textColor: 'text-amber-700'
    },
    {
      key: 'completed',
      label: 'Converted',
      count: metrics.completedEnquiries,
      color: 'bg-emerald-600',
      badgeBg: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      key: 'archived',
      label: 'Archived / Lost',
      count: enquiries.filter(e => e.status === 'archived').length,
      color: 'bg-neutral-400',
      badgeBg: 'bg-neutral-100',
      textColor: 'text-neutral-600'
    }
  ];

  const total = enquiries.length;

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Enquiry Sales Pipeline
          </h3>
          <p className="text-xs text-neutral-500">Distribution of leads across workflow stages.</p>
        </div>
        <Link
          to="/dashboard/enquiries"
          className="text-xs font-semibold text-[#FF5A60] hover:underline"
        >
          Manage Pipeline &rarr;
        </Link>
      </div>

      {/* Segmented Pipeline Bar */}
      <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden flex">
        {stages.map((stage) => {
          const percentage = total > 0 ? (stage.count / total) * 100 : 0;
          if (percentage === 0) return null;
          return (
            <div
              key={stage.key}
              style={{ width: `${percentage}%` }}
              className={`${stage.color} h-full transition-all duration-300`}
              title={`${stage.label}: ${stage.count} (${Math.round(percentage)}%)`}
            />
          );
        })}
      </div>

      {/* Interactive Stage Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
        {stages.map((stage) => {
          const percentage = total > 0 ? Math.round((stage.count / total) * 100) : 0;
          return (
            <Link
              key={stage.key}
              to={`/dashboard/enquiries?status=${stage.key}`}
              className="p-3 rounded-lg bg-neutral-50 border border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-100/70 transition-all group block"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-neutral-600 group-hover:text-neutral-900 truncate">
                  {stage.label}
                </span>
                <span className={`w-2 h-2 rounded-full ${stage.color} shrink-0`} />
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-lg font-bold text-neutral-900 tabular-nums">
                  {stage.count}
                </span>
                <span className="text-[11px] text-neutral-400 tabular-nums">
                  {percentage}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};
