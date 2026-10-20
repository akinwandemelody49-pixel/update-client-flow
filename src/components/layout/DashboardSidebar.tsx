import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LuLayoutDashboard,
  LuInbox,
  LuFolderKanban,
  LuImages,
  LuUserRound,
  LuChartNoAxesCombined,
  LuSettings,
  LuArrowUpRight,
  LuLayers,
  LuX
} from 'react-icons/lu';
import { useApp } from '../../context/AppContext';

interface DashboardSidebarProps {
  onCloseMobile?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onCloseMobile }) => {
  const { metrics, profile } = useApp();

  const mainNavigation = [
    { name: 'Overview', to: '/dashboard', icon: LuLayoutDashboard, end: true },
    {
      name: 'Enquiries',
      to: '/dashboard/enquiries',
      icon: LuInbox,
      badge: metrics.newEnquiries > 0 ? metrics.newEnquiries : undefined
    },
    {
      name: 'Projects',
      to: '/dashboard/projects',
      icon: LuFolderKanban,
      badge: metrics.activeProjects > 0 ? metrics.activeProjects : undefined
    },
    { name: 'Portfolio', to: '/dashboard/portfolio', icon: LuImages }
  ];

  const workspaceNavigation = [
    { name: 'Public Profile', to: '/profile/sophia-vance', icon: LuUserRound, isExternal: true },
    { name: 'Analytics', to: '/dashboard/analytics', icon: LuChartNoAxesCombined },
    { name: 'Settings', to: '/dashboard/settings', icon: LuSettings }
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col h-full shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-neutral-200 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF5A60] flex items-center justify-center text-white shadow-xs">
            <LuLayers className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-neutral-900 tracking-tight">ClientFlow</span>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
            aria-label="Close navigation"
          >
            <LuX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* MAIN SECTION */}
        <div className="space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
            Main
          </div>
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#FF5A60]/10 text-[#FF5A60] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#FF5A60]' : 'text-neutral-500'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full tabular-nums ${
                          isActive
                            ? 'bg-[#FF5A60] text-white'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* WORKSPACE SECTION */}
        <div className="space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
            Workspace
          </div>
          {workspaceNavigation.map((item) => {
            const Icon = item.icon;
            if (item.isExternal) {
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={onCloseMobile}
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <LuArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 shrink-0" />
                </Link>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#FF5A60]/10 text-[#FF5A60] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#FF5A60]' : 'text-neutral-500'
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Demo User Profile near bottom of sidebar */}
      <div className="p-3 border-t border-neutral-200">
        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-9 h-9 rounded-full object-cover border border-neutral-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-neutral-900 truncate">{profile.name}</h4>
              <p className="text-[11px] text-neutral-500 truncate">{profile.title}</p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Studio
            </span>
            <Link
              to="/profile/sophia-vance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF5A60] font-semibold hover:underline inline-flex items-center gap-0.5 text-[11px]"
            >
              Public View <LuArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};
