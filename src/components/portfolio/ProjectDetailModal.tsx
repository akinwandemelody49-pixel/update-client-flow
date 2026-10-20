import React from 'react';
import { LuCalendar, LuTag, LuBriefcase, LuAward } from 'react-icons/lu';
import { PortfolioItem } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ProjectDetailModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquireAboutSimilar?: (category: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onEnquireAboutSimilar
}) => {
  if (!item) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item.title}
      subtitle={`${item.clientName} · ${item.category}`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Large Media View */}
        <div className="rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-auto max-h-[460px] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Project Meta Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
              <LuBriefcase className="w-3.5 h-3.5" />
              <span>Client</span>
            </div>
            <div className="font-semibold text-neutral-900 truncate">{item.clientName}</div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
              <LuCalendar className="w-3.5 h-3.5" />
              <span>Year</span>
            </div>
            <div className="font-semibold text-neutral-900 tabular-nums">{item.year}</div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
              <LuTag className="w-3.5 h-3.5" />
              <span>Discipline</span>
            </div>
            <div className="font-semibold text-neutral-900">{item.category}</div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
              <LuAward className="w-3.5 h-3.5" />
              <span>Scope</span>
            </div>
            <div className="font-semibold text-neutral-900 truncate">Commercial Release</div>
          </div>
        </div>

        {/* Overview & Story */}
        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Project Overview & Strategy
          </h4>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {item.description}
          </p>
        </div>

        {item.metrics && (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
            <div className="font-semibold mb-0.5">Project Impact & Recognition:</div>
            <div>{item.metrics}</div>
          </div>
        )}

        {/* Tags */}
        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Disciplines & Deliverables
          </h4>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-md border border-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Back to Gallery
          </Button>
          {onEnquireAboutSimilar && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onEnquireAboutSimilar(item.category);
              }}
            >
              Enquire About {item.category}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
