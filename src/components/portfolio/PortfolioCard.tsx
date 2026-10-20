import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { PortfolioItem } from '../../types';
import { Button } from '../ui/Button';

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
  showAdminActions?: boolean;
  onEdit?: (item: PortfolioItem) => void;
  onDelete?: (id: string) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  item,
  onClick,
  showAdminActions = false,
  onEdit,
  onDelete
}) => {
  return (
    <div
      onClick={() => onClick(item)}
      className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-neutral-300 hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col"
    >
      {/* Image Container with 4:3 Ratio */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Info Block: Minimal - Only Title and Details Button */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-4">
        <h3 className="text-base font-semibold text-neutral-900 group-hover:text-[#FF5A60] transition-colors leading-snug line-clamp-2">
          {item.title}
        </h3>

        <div className="pt-2 flex items-center justify-between gap-2 border-t border-neutral-100 mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick(item);
            }}
            rightIcon={<LuArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#FF5A60]" />}
            className="w-full justify-between hover:border-[#FF5A60] hover:text-[#FF5A60]"
          >
            <span>View Details</span>
          </Button>

          {/* Admin Controls (when in CMS view) */}
          {showAdminActions && (
            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="text-xs text-neutral-600 hover:text-neutral-900 font-medium px-2 py-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1.5 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
