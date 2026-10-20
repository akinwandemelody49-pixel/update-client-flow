import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LuInbox,
  LuFolderKanban,
  LuTrendingUp,
  LuDollarSign,
  LuArrowUpRight,
  LuPlus,
  LuSparkles
} from 'react-icons/lu';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { MetricCard } from '../components/dashboard/MetricCard';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { PipelineSummary } from '../components/dashboard/PipelineSummary';
import { UpcomingTasks } from '../components/dashboard/UpcomingTasks';
import { RecentEnquiriesTable } from '../components/dashboard/RecentEnquiriesTable';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { AddEnquiryModal } from '../components/dashboard/AddEnquiryModal';
import { EnquiryDetailModal } from '../components/enquiries/EnquiryDetailModal';
import { Enquiry } from '../types';

export const DashboardPage: React.FC = () => {
  const { enquiries, metrics, profile, updateEnquiryStatus, updateEnquiryNotes, deleteEnquiry } = useApp();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isAddEnquiryOpen, setIsAddEnquiryOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* 1. Welcome Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5A60]">
              Studio Overview
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs text-neutral-500 font-medium">Independent Designer OS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Welcome back, {profile.name.split(' ')[0]}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Here's what's happening with your design business today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/profile/sophia-vance" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="md"
              rightIcon={<LuArrowUpRight className="w-4 h-4 text-neutral-400" />}
            >
              Live Portfolio
            </Button>
          </Link>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsAddEnquiryOpen(true)}
            leftIcon={<LuPlus className="w-4 h-4" />}
          >
            Add Enquiry
          </Button>
        </div>
      </div>

      {/* 2. Demo-Data Notice */}
      <div className="px-4 py-2.5 rounded-xl bg-neutral-100/80 border border-neutral-200/90 text-xs text-neutral-600 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <LuSparkles className="w-4 h-4 text-[#FF5A60] shrink-0" />
          <span>
            <strong className="font-semibold text-neutral-800">Demo workspace:</strong> Sample records and prototype updates are safely stored in your browser's local storage.
          </span>
        </div>
        <span className="text-[11px] text-neutral-400 font-medium hidden md:inline">
          Last synced: Just now
        </span>
      </div>

      {/* 3. Four Reusable KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: New enquiries */}
        <MetricCard
          label="New enquiries"
          value={metrics.newEnquiries}
          supportingText="Awaiting your response"
          icon={<LuInbox className="w-4 h-4" />}
          highlightCoral={metrics.newEnquiries > 0}
          linkTo="/dashboard/enquiries?status=new"
          linkLabel="Review leads"
          trend={{
            value: `+${metrics.newEnquiries} new`,
            isPositive: true,
            label: 'this week'
          }}
        />

        {/* Card 2: Active projects */}
        <MetricCard
          label="Active projects"
          value={metrics.activeProjects}
          supportingText="Currently underway"
          icon={<LuFolderKanban className="w-4 h-4" />}
          accentColor="bg-blue-50 text-blue-600"
          linkTo="/dashboard/projects"
          linkLabel="Manage projects"
          trend={{
            value: 'On track',
            isPositive: true,
            label: 'milestones'
          }}
        />

        {/* Card 3: Pipeline value */}
        <MetricCard
          label="Pipeline value"
          value={`$${metrics.totalPipelineValue.toLocaleString()}`}
          supportingText="Estimated value of open opportunities"
          icon={<LuDollarSign className="w-4 h-4" />}
          accentColor="bg-emerald-50 text-emerald-600"
          linkTo="/dashboard/enquiries"
          linkLabel="Open pipeline"
        />

        {/* Card 4: Conversion rate */}
        <MetricCard
          label="Conversion rate"
          value={metrics.totalEnquiries > 0 ? `${metrics.conversionRate}%` : '—'}
          supportingText="Inbound enquiries converted to projects"
          icon={<LuTrendingUp className="w-4 h-4" />}
          accentColor="bg-purple-50 text-purple-600"
          linkTo="/analytics"
          linkLabel="View analytics"
          trend={{
            value: '42.8%',
            isPositive: true,
            label: 'industry avg'
          }}
        />
      </div>

      {/* 4. Performance Chart & Pipeline Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-5">
          <PipelineSummary />
        </div>
      </div>

      {/* 5. Split Grid: Upcoming Tasks & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <UpcomingTasks />
        </div>
        <div className="lg:col-span-5">
          <ActivityFeed />
        </div>
      </div>

      {/* 6. Recent Enquiries Table (Full Width Responsive) */}
      <div>
        <RecentEnquiriesTable
          enquiries={enquiries}
          onSelectEnquiry={(enq) => setSelectedEnquiry(enq)}
        />
      </div>

      {/* Add Enquiry Modal */}
      <AddEnquiryModal
        isOpen={isAddEnquiryOpen}
        onClose={() => setIsAddEnquiryOpen(false)}
      />

      {/* Enquiry Detail Modal */}
      <EnquiryDetailModal
        enquiry={selectedEnquiry}
        isOpen={!!selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdateStatus={updateEnquiryStatus}
        onUpdateNotes={updateEnquiryNotes}
        onDelete={deleteEnquiry}
      />
    </div>
  );
};
