import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LuBell, LuCheck, LuArrowUpRight, LuInbox, LuFolderKanban, LuCalendar } from 'react-icons/lu';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadNotificationsCount } = useApp();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'enquiry':
        return <LuInbox className="w-3.5 h-3.5 text-[#FF5A60]" />;
      case 'project':
        return <LuFolderKanban className="w-3.5 h-3.5 text-blue-600" />;
      default:
        return <LuCalendar className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-neutral-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="p-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
        <div className="flex items-center gap-2">
          <LuBell className="w-4 h-4 text-neutral-600" />
          <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Notifications
          </h4>
          {unreadNotificationsCount > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FF5A60] text-white">
              {unreadNotificationsCount}
            </span>
          )}
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-[11px] text-[#FF5A60] hover:underline font-medium cursor-pointer"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-neutral-400">
            No notifications at the moment.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                notif.read ? 'bg-white hover:bg-neutral-50/70' : 'bg-[#FF5A60]/5 hover:bg-[#FF5A60]/10'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-xs font-semibold text-neutral-900 truncate">
                    {notif.title}
                  </h5>
                  <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed line-clamp-2">
                  {notif.description}
                </p>
                {notif.link && (
                  <Link
                    to={notif.link}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FF5A60] hover:underline mt-1.5"
                  >
                    <span>View item</span>
                    <LuArrowUpRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-[#FF5A60] shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-2 border-t border-neutral-100 bg-neutral-50 text-center">
        <span className="text-[11px] text-neutral-400">
          Showing recent activity alerts
        </span>
      </div>
    </div>
  );
};
