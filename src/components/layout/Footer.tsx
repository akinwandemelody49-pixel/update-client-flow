import React from 'react';
import { Link } from 'react-router-dom';
import { LuLayers, LuArrowUpRight } from 'react-icons/lu';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-base font-bold text-neutral-900">
              <div className="w-7 h-7 rounded-lg bg-[#FF5A60] flex items-center justify-center text-white">
                <LuLayers className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-lg tracking-tight">ClientFlow</span>
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
              The all-in-one portfolio and enquiry pipeline system for independent graphic designers.
            </p>
            <div className="text-xs text-neutral-400">
              Prototype demo with localStorage persistence.
            </div>
          </div>

          {/* Product Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-900 tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link to="/#features" className="hover:text-neutral-900 transition-colors">Portfolio Showcase</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-neutral-900 transition-colors">Enquiry Pipeline</Link></li>
              <li><Link to="/dashboard" className="hover:text-neutral-900 transition-colors">Designer Dashboard</Link></li>
              <li><Link to="/pricing" className="hover:text-neutral-900 transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Designer Pages Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-900 tracking-wider uppercase">Demo Pages</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link to="/profile/sophia-vance" className="hover:text-neutral-900 transition-colors flex items-center gap-1">Sophia Vance Profile <LuArrowUpRight className="w-3 h-3" /></Link></li>
              <li><Link to="/dashboard/enquiries" className="hover:text-neutral-900 transition-colors">Manage Enquiries</Link></li>
              <li><Link to="/dashboard/projects" className="hover:text-neutral-900 transition-colors">Track Projects</Link></li>
              <li><Link to="/dashboard/portfolio" className="hover:text-neutral-900 transition-colors">Portfolio CMS</Link></li>
            </ul>
          </div>

          {/* Transparency & Boundaries Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-900 tracking-wider uppercase">Data Boundary</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              This preview runs entirely client-side using browser storage. Submitted enquiries and updated projects are saved locally on your device for immediate prototype testing.
            </p>
            <div className="pt-2 text-xs text-neutral-500">
              Accent: Coral <span className="font-mono text-neutral-700">#FF5A60</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} ClientFlow. Design work that gets you hired.
          </div>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-neutral-700 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-neutral-700 transition-colors">Privacy Policy</a>
            <a href="#designer-guide" className="hover:text-neutral-700 transition-colors">Designer Guide</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
