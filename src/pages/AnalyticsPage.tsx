import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import {
  LuTrendingUp,
  LuDollarSign,
  LuInbox,
  LuFolderKanban,
  LuChartPie,
  LuChartColumn
} from 'react-icons/lu';

type AnalyticsRange = '30d' | '90d' | '1y' | 'all';

export const AnalyticsPage: React.FC = () => {
  const { enquiries, projects, metrics } = useApp();
  const [range, setRange] = useState<AnalyticsRange>('30d');

  // Breakdown by Service Category
  const categories = ['Branding', 'Packaging', 'UI/UX Design', 'Editorial & Print', 'Motion Design'];
  const categoryStats = categories.map(cat => {
    const catEnquiries = enquiries.filter(e => e.serviceCategory === cat);
    const catProjects = projects.filter(p => p.serviceCategory === cat);
    const catRevenue = catProjects.reduce((acc, p) => acc + (p.paidAmount || 0), 0);
    return {
      category: cat,
      enquiryCount: catEnquiries.length,
      projectCount: catProjects.length,
      revenue: catRevenue
    };
  });

  const totalRevenue = metrics.totalRevenue;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'planning').length;

  return (
    <div className="space-y-8">
      {/* Page Title & Time Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-xl border border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5A60]">
              Performance Analytics
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs text-neutral-500">Business Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Studio Financial & Lead Analytics
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Real data calculated from client contracts, paid milestone invoices, and enquiry conversions.
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg self-start sm:self-center">
          {(['30d', '90d', '1y', 'all'] as AnalyticsRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                range === r
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {r === '30d' ? '30 Days' : r === '90d' ? '90 Days' : r === '1y' ? '1 Year' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Collected Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <LuDollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 tabular-nums">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            From verified paid client milestones
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pipeline Potential</span>
            <div className="w-7 h-7 rounded-lg bg-[#FF5A60]/10 text-[#FF5A60] flex items-center justify-center">
              <LuTrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 tabular-nums">
            ${metrics.totalPipelineValue.toLocaleString()}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Active open opportunities
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Inbound Conversion</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <LuChartPie className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 tabular-nums">
            {metrics.conversionRate}%
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            {metrics.completedEnquiries + metrics.inProgressEnquiries} of {enquiries.length} leads converted
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Project Velocity</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <LuFolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 tabular-nums">
            {completedProjects} <span className="text-sm font-normal text-neutral-400">/ {projects.length} done</span>
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            {inProgressProjects} active deliverables
          </div>
        </Card>
      </div>

      {/* Category Breakdown Table */}
      <Card padding="md" className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Service Category Revenue & Lead Volume
            </h3>
            <p className="text-xs text-neutral-500">Breakdown of earnings and enquiries per creative discipline.</p>
          </div>
          <span className="text-xs text-neutral-400 font-medium">Categorical Audit</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Discipline</th>
                <th className="py-3 px-4">Inbound Leads</th>
                <th className="py-3 px-4">Active / Done Projects</th>
                <th className="py-3 px-4">Milestone Revenue</th>
                <th className="py-3 px-4">Revenue Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {categoryStats.map((item) => {
                const sharePercent = totalRevenue > 0 ? Math.round((item.revenue / totalRevenue) * 100) : 0;
                return (
                  <tr key={item.category} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 tabular-nums">
                      {item.enquiryCount} leads
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 tabular-nums">
                      {item.projectCount} contracts
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 tabular-nums">
                      ${item.revenue.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF5A60] rounded-full"
                            style={{ width: `${sharePercent}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-neutral-500 tabular-nums">
                          {sharePercent}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
