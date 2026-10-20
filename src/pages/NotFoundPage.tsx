import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuLayers } from 'react-icons/lu';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-neutral-50">
      <div className="w-12 h-12 rounded-xl bg-[#FF5A60]/10 text-[#FF5A60] flex items-center justify-center mb-4">
        <LuLayers className="w-6 h-6" />
      </div>
      <h1 className="text-4xl font-extrabold text-neutral-900 font-mono tracking-tight">404</h1>
      <h2 className="text-lg font-bold text-neutral-800 mt-2">Page Not Found</h2>
      <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mt-1 mb-6 leading-relaxed">
        The page you requested does not exist or has been moved in the studio layout.
      </p>
      <Link to="/">
        <Button variant="primary" size="md" leftIcon={<LuArrowLeft className="w-4 h-4" />}>
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
};
