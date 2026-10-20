import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LuMenu,
  LuPlus,
  LuExternalLink,
  LuInbox,
  LuBell
} from 'react-icons/lu';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { NotificationPanel } from '../dashboard/NotificationPanel';
import { AddEnquiryModal } from '../dashboard/AddEnquiryModal';

interface DashboardHeaderProps {
  onOpenMobileSidebar: () => void;
  onOpenNewEnquiryModal?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenMobileSidebar,
  onOpenNewEnquiryModal
}) => {
  const location = useLocation();
  const { metrics, profile, unreadNotificationsCount } = useApp();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAddEnquiryOpen, setIsAddEnquiryOpen] = useState(false);

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/dashboard':
      case '/dashboard/':
        return {
          title: 'Overview',
          subtitle: "Here's what's happening with your design business."
        };
      case '/dashboard/enquiries':
      case '/enquiries':
        return {
          title: 'Client Enquiries',
          subtitle: 'Manage and convert inbound design requests.'
        };
      case '/dashboard/projects':
      case '/projects':
        return {
          title: 'Active Projects',
          subtitle: 'Track deliverables, milestones, and deadlines.'
        };
      case '/dashboard/portfolio':
      case '/portfolio':
        return {
          title: 'Portfolio CMS',
          subtitle: 'Curate your showcase case studies and visuals.'
        };
      case '/dashboard/analytics':
      case '/analytics':
        return {
          title: 'Studio Analytics',
          subtitle: 'Revenue, conversion rates, and client growth metrics.'
        };
      case '/dashboard/settings':
      case '/settings':
        return {
          title: 'Studio Settings',
          subtitle: 'Customize designer profile, rates, and preferences.'
        };
      default:
        return {
          title: 'Studio Dashboard',
          subtitle: 'Workspace management.'
        };
    }
  };

  const meta = getPageMeta();

  return (
    <>
      <header className="h-16 bg-white border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer shrink-0"
            aria-label="Open sidebar"
          >
            <LuMenu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <span>ClientFlow</span>
              <span>/</span>
              <span className="text-neutral-600 font-medium truncate">{meta.title}</span>
            </div>
            <h1 className="text-base font-bold text-neutral-900 tracking-tight leading-none mt-0.5 truncate">
              {meta.title}
            </h1>
          </div>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* New enquiries badge */}
          {metrics.newEnquiries > 0 && (
            <Link
              to="/dashboard/enquiries?status=new"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#FF5A60] bg-[#FF5A60]/10 rounded-full hover:bg-[#FF5A60]/15 transition-colors"
            >
              <LuInbox className="w-3.5 h-3.5" />
              <span className="tabular-nums">{metrics.newEnquiries}</span> new enquiry{metrics.newEnquiries > 1 ? 's' : ''}
            </Link>
          )}

          {/* Notifications Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg relative cursor-pointer transition-colors"
              aria-label="Notifications"
            >
              <LuBell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5A60] ring-2 ring-white" />
              )}
            </button>

            <NotificationPanel
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>

          {/* View Public Profile Link */}
          <Link
            to="/profile/sophia-vance"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 font-medium px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <span>Live Profile</span>
            <LuExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </Link>

          {/* Primary Action Button: Add Enquiry */}
          <Button
            onClick={onOpenNewEnquiryModal || (() => setIsAddEnquiryOpen(true))}
            variant="primary"
            size="md"
            leftIcon={<LuPlus className="w-4 h-4" />}
          >
            Add Enquiry
          </Button>
        </div>
      </header>

      {/* Add Enquiry Modal triggered from Header */}
      <AddEnquiryModal
        isOpen={isAddEnquiryOpen}
        onClose={() => setIsAddEnquiryOpen(false)}
      />
    </>
  );
};
