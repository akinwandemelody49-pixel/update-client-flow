import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuMenu, LuX, LuArrowUpRight, LuLayers } from 'react-icons/lu';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Designer Profile', href: '/profile/sophia-vance' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-[#FF5A60] flex items-center justify-center text-white shadow-xs">
            <LuLayers className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-neutral-950 font-heading">
            ClientFlow
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-600">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                  location.pathname === link.href ? 'text-neutral-950 font-bold border-b-2 border-[#FF5A60]' : ''
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Action Buttons (Comfortable sizes, not tiny) */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/dashboard" className="hidden sm:inline-flex">
            <Button
              variant="outline"
              size="md"
              className="font-semibold text-sm px-4.5 py-2.5 h-10.5"
            >
              Studio Dashboard
            </Button>
          </Link>

          <Link to="/profile/sophia-vance">
            <Button
              variant="primary"
              size="md"
              rightIcon={<LuArrowUpRight className="w-4 h-4" />}
              className="font-semibold text-sm px-5 py-2.5 h-10.5 shadow-md shadow-[#FF5A60]/20"
            >
              Get Started Free
            </Button>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-10 h-10 flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-xl cursor-pointer transition-colors border border-neutral-200"
          >
            {mobileMenuOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-5 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1.5 text-sm font-medium text-neutral-700">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-xl hover:bg-neutral-100 hover:text-neutral-900 transition-colors font-semibold"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-xl hover:bg-neutral-100 hover:text-neutral-900 transition-colors font-semibold"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2.5">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="outline" size="md" className="w-full justify-center py-2.5">
                Open Studio Dashboard
              </Button>
            </Link>
            <Link to="/profile/sophia-vance" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button
                variant="primary"
                size="md"
                rightIcon={<LuArrowUpRight className="w-4 h-4" />}
                className="w-full justify-center py-2.5"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
