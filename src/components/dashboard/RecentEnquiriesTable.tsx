import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EnquiryStatusBadge } from '../enquiries/EnquiryStatusBadge';
import { Enquiry } from '../../types';
import { LuEye, LuArrowUpRight, LuInbox } from 'react-icons/lu';

interface RecentEnquiriesTableProps {
  enquiries: Enquiry[];
  onSelectEnquiry: (enquiry: Enquiry) => void;
}

export const RecentEnquiriesTable: React.FC<RecentEnquiriesTableProps> = ({
  enquiries,
  onSelectEnquiry
}) => {
  const displayList = enquiries.slice(0, 5);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Recent Inbound Enquiries
          </h3>
          <p className="text-xs text-neutral-500">Latest prospective client project requests.</p>
        </div>
        <Link to="/dashboard/enquiries">
          <Button variant="ghost" size="sm" rightIcon={<LuArrowUpRight className="w-3.5 h-3.5" />}>
            View All ({enquiries.length})
          </Button>
        </Link>
      </div>

      {displayList.length === 0 ? (
        <div className="p-12 text-center text-xs text-neutral-400">
          <LuInbox className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
          No enquiries logged yet.
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Project Title</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {displayList.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => onSelectEnquiry(enq)}
                    className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {getInitials(enq.clientName)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-neutral-900 group-hover:text-[#FF5A60] transition-colors truncate">
                            {enq.clientName}
                          </div>
                          {enq.companyName && (
                            <div className="text-[11px] text-neutral-400 truncate">
                              {enq.companyName}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-neutral-700 max-w-[200px] truncate">
                      {enq.projectTitle}
                    </td>

                    <td className="py-3.5 px-4 text-neutral-500">
                      {enq.serviceCategory}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-neutral-900 tabular-nums">
                      {enq.budget}
                    </td>

                    <td className="py-3.5 px-4 text-neutral-400 whitespace-nowrap">
                      {new Date(enq.dateReceived).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <EnquiryStatusBadge status={enq.status} />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEnquiry(enq);
                        }}
                        leftIcon={<LuEye className="w-3.5 h-3.5" />}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards View */}
          <div className="md:hidden divide-y divide-neutral-100">
            {displayList.map((enq) => (
              <div
                key={enq.id}
                onClick={() => onSelectEnquiry(enq)}
                className="p-4 hover:bg-neutral-50 transition-colors flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-neutral-900 truncate">
                      {enq.clientName}
                    </span>
                    <EnquiryStatusBadge status={enq.status} />
                  </div>
                  <div className="text-xs text-neutral-600 truncate font-medium">
                    {enq.projectTitle}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-2">
                    <span className="font-semibold text-neutral-800">{enq.budget}</span>
                    <span>·</span>
                    <span>{enq.serviceCategory}</span>
                    <span>·</span>
                    <span>{new Date(enq.dateReceived).toLocaleDateString()}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEnquiry(enq);
                  }}
                  leftIcon={<LuEye className="w-3.5 h-3.5" />}
                >
                  Inspect
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};
