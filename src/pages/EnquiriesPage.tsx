import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  LuSearch,
  LuFilter,
  LuArrowUpDown,
  LuInbox,
  LuEye,
  LuMail,
  LuTrash2
} from 'react-icons/lu';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { EnquiryStatusBadge } from '../components/enquiries/EnquiryStatusBadge';
import { EnquiryDetailModal } from '../components/enquiries/EnquiryDetailModal';
import { Enquiry, EnquiryStatus, ServiceCategory } from '../types';

export const EnquiriesPage: React.FC = () => {
  const { enquiries, updateEnquiryStatus, updateEnquiryNotes, deleteEnquiry } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>(() => searchParams.get('status') || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'budget_high' | 'budget_low'>('date_desc');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    const urlStatus = searchParams.get('status');
    if (urlStatus) {
      setSelectedStatus(urlStatus);
    }
  }, [searchParams]);

  // Filtered and sorted enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Search
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.clientName.toLowerCase().includes(query) ||
        item.clientEmail.toLowerCase().includes(query) ||
        item.projectTitle.toLowerCase().includes(query) ||
        (item.companyName && item.companyName.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // Status
      if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;

      // Category
      if (selectedCategory !== 'all' && item.serviceCategory !== selectedCategory) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date_desc') {
        return new Date(b.dateReceived).getTime() - new Date(a.dateReceived).getTime();
      }
      if (sortBy === 'date_asc') {
        return new Date(a.dateReceived).getTime() - new Date(b.dateReceived).getTime();
      }
      const budgetA = parseInt(a.budget.replace(/[^0-9]/g, ''), 10) || 0;
      const budgetB = parseInt(b.budget.replace(/[^0-9]/g, ''), 10) || 0;
      if (sortBy === 'budget_high') {
        return budgetB - budgetA;
      }
      if (sortBy === 'budget_low') {
        return budgetA - budgetB;
      }
      return 0;
    });
  }, [enquiries, searchQuery, selectedStatus, selectedCategory, sortBy]);

  const categories: ServiceCategory[] = ['Branding', 'Packaging', 'UI/UX Design', 'Editorial & Print', 'Motion Design'];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Client Enquiries & Leads
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Manage incoming briefs, negotiate budgets, and transition prospects into active projects.
          </p>
        </div>
        <div className="text-xs text-neutral-500 font-mono">
          Showing <span className="font-bold text-neutral-900">{filteredEnquiries.length}</span> of {enquiries.length} enquiries
        </div>
      </div>

      {/* Control Bar: Search, Category, Status, Sort */}
      <Card padding="sm" className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by client name, email, or project title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A60]/20 focus:border-[#FF5A60] transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A60]/20 focus:border-[#FF5A60]"
            >
              <option value="all">All Stages</option>
              <option value="new">New Leads</option>
              <option value="contacted">Contacted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A60]/20 focus:border-[#FF5A60]"
            >
              <option value="all">All Disciplines</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A60]/20 focus:border-[#FF5A60]"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="budget_high">Highest Budget</option>
              <option value="budget_low">Lowest Budget</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedStatus !== 'all' || selectedCategory !== 'all' || searchQuery) && (
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-xs text-neutral-500">
            <span>Active filters:</span>
            {selectedStatus !== 'all' && (
              <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-700">
                Stage: {selectedStatus}
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-700">
                Discipline: {selectedCategory}
              </span>
            )}
            {searchQuery && (
              <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-700">
                Search: "{searchQuery}"
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
                setSelectedCategory('all');
              }}
              className="text-[#FF5A60] hover:underline font-medium ml-2 cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </Card>

      {/* Enquiries List / Table */}
      {filteredEnquiries.length === 0 ? (
        <EmptyState
          icon={<LuInbox className="w-6 h-6" />}
          title="No enquiries match your criteria"
          description="Try broadening your search query or reset your stage and discipline filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedStatus('all');
            setSelectedCategory('all');
          }}
        />
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-neutral-50/80 border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            <div className="col-span-3">Client & Company</div>
            <div className="col-span-3">Project Title & Service</div>
            <div className="col-span-2">Budget Scope</div>
            <div className="col-span-2">Stage</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-neutral-100">
            {filteredEnquiries.map((enq) => (
              <div
                key={enq.id}
                onClick={() => setSelectedEnquiry(enq)}
                className="p-4 sm:px-6 hover:bg-neutral-50/70 transition-colors flex flex-col lg:grid lg:grid-cols-12 gap-3 lg:gap-4 lg:items-center cursor-pointer group"
              >
                {/* Client info */}
                <div className="lg:col-span-3 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900 group-hover:text-[#FF5A60] transition-colors truncate">
                      {enq.clientName}
                    </span>
                    <span className="lg:hidden">
                      <EnquiryStatusBadge status={enq.status} />
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 truncate mt-0.5">
                    {enq.companyName ? `${enq.companyName} · ` : ''}
                    <span className="text-neutral-400">{enq.clientEmail}</span>
                  </div>
                </div>

                {/* Project title and discipline */}
                <div className="lg:col-span-3 min-w-0">
                  <div className="text-xs sm:text-sm font-medium text-neutral-800 truncate">
                    {enq.projectTitle}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {enq.serviceCategory} · Timeline: {enq.timeline}
                  </div>
                </div>

                {/* Budget */}
                <div className="lg:col-span-2">
                  <div className="text-xs sm:text-sm font-bold text-neutral-900 tabular-nums">
                    {enq.budget}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Received {new Date(enq.dateReceived).toLocaleDateString()}
                  </div>
                </div>

                {/* Stage selector (in-place) */}
                <div className="hidden lg:block lg:col-span-2" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={enq.status}
                    onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                    className="text-xs font-medium px-2.5 py-1 rounded-md border border-neutral-300 bg-white hover:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#FF5A60]"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Action button */}
                <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-2 pt-2 lg:pt-0 border-t border-neutral-100 lg:border-t-0">
                  <span className="lg:hidden text-xs text-neutral-400">
                    {new Date(enq.dateReceived).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEnquiry(enq);
                      }}
                      leftIcon={<LuEye className="w-3.5 h-3.5" />}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
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
