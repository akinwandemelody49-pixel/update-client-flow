import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import {
  LuInbox,
  LuFolderKanban,
  LuCircleCheck,
  LuSparkles,
  LuTrendingUp,
  LuArrowUpRight
} from 'react-icons/lu';

export const ActivityFeed: React.FC = () => {
  const { activities } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'enquiry_new':
        return <LuInbox className="w-3.5 h-3.5 text-[#FF5A60]" />;
      case 'enquiry_status':
        return <LuTrendingUp className="w-3.5 h-3.5 text-blue-600" />;
      case 'project_progress':
        return <LuFolderKanban className="w-3.5 h-3.5 text-amber-600" />;
      case 'task_completed':
        return <LuCircleCheck className="w-3.5 h-3.5 text-emerald-600" />;
      case 'portfolio_added':
        return <LuSparkles className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <LuInbox className="w-3.5 h-3.5 text-neutral-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'enquiry_new':
        return 'bg-[#FF5A60]/10';
      case 'enquiry_status':
        return 'bg-blue-50';
      case 'project_progress':
        return 'bg-amber-50';
      case 'task_completed':
        return 'bg-emerald-50';
      case 'portfolio_added':
        return 'bg-purple-50';
      default:
        return 'bg-neutral-100';
    }
  };

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Recent Activity
          </h3>
          <p className="text-xs text-neutral-500">Live feed of studio updates, pipeline changes, and milestones.</p>
        </div>
      </div>

      <div className="divide-y divide-neutral-100">
        {activities.length === 0 ? (
          <div className="p-8 text-center text-xs text-neutral-400">
            No studio activity recorded yet.
          </div>
        ) : (
          activities.slice(0, 6).map((activity) => (
            <div key={activity.id} className="py-3 flex items-start gap-3 group">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${getBg(
                  activity.type
                )}`}
              >
                {getIcon(activity.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-neutral-900">{activity.title}</p>
                  <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{activity.description}</p>
                {activity.link && (
                  <Link
                    to={activity.link}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#FF5A60] hover:underline mt-1"
                  >
                    <span>View record</span>
                    <LuArrowUpRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
