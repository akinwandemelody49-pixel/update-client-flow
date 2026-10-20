import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  supportingText: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  linkTo?: string;
  linkLabel?: string;
  highlightCoral?: boolean;
  accentColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  supportingText,
  trend,
  linkTo,
  linkLabel = 'View details',
  highlightCoral = false,
  accentColor = 'bg-[#FF5A60]/10 text-[#FF5A60]'
}) => {
  return (
    <Card
      padding="md"
      className={`transition-all duration-200 hover:shadow-md ${
        highlightCoral ? 'border-l-4 border-l-[#FF5A60]' : 'border-neutral-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {label}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${accentColor}`}>
          {icon}
        </div>
      </div>

      <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight tabular-nums">
        {value}
      </div>

      <div className="text-xs text-neutral-500 mt-1 leading-relaxed">
        {supportingText}
      </div>

      {(trend || linkTo) && (
        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
          {trend ? (
            <span
              className={`inline-flex items-center gap-1 font-semibold ${
                trend.isPositive ? 'text-emerald-600' : 'text-neutral-600'
              }`}
            >
              <span>{trend.value}</span>
              {trend.label && <span className="text-neutral-400 font-normal">{trend.label}</span>}
            </span>
          ) : (
            <span className="text-neutral-400">Live data</span>
          )}

          {linkTo && (
            <Link
              to={linkTo}
              className="text-[#FF5A60] hover:text-[#E0484E] font-medium hover:underline inline-flex items-center gap-0.5 ml-auto"
            >
              <span>{linkLabel}</span>
              <span>&rarr;</span>
            </Link>
          )}
        </div>
      )}
    </Card>
  );
};
