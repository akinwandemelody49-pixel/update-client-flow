import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuCheck, LuArrowUpRight, LuLayers } from 'react-icons/lu';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="bg-neutral-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider mb-2">
            Transparent Pricing
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight [text-wrap:balance]">
            Simple plans for independent designers
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-3">
            Start completely free to manage your portfolio and client enquiries. Upgrade when your freelance studio scales.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-neutral-200/80 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold text-[#FF5A60] bg-[#FF5A60]/10 px-1.5 py-0.5 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Plan 1: Free Starter */}
          <Card padding="lg" className="flex flex-col justify-between border-neutral-300">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Free Starter</span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1">Independent</h3>
                <p className="text-xs text-neutral-500 mt-1">For solo designers launching their freelance business.</p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="text-4xl font-extrabold text-neutral-900 font-mono">$0</span>
                <span className="text-xs text-neutral-500">/ forever free</span>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-700 pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Up to 10 published portfolio case studies</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom public designer profile link</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Inbound client enquiry brief form</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Enquiry sales pipeline management</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Up to 3 active client projects</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100">
              <Link to="/profile/sophia-vance" className="w-full">
                <Button variant="outline" size="md" className="w-full">
                  Current Free Tier
                </Button>
              </Link>
            </div>
          </Card>

          {/* Plan 2: Pro Studio (Featured) */}
          <Card padding="lg" className="flex flex-col justify-between border-[#FF5A60] shadow-md relative bg-white">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#FF5A60] text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#FF5A60] uppercase tracking-wider">Studio Pro</span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1">Active Studio</h3>
                <p className="text-xs text-neutral-500 mt-1">For established designers managing ongoing client pipelines.</p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="text-4xl font-extrabold text-neutral-900 font-mono">
                  ${billingCycle === 'annual' ? '19' : '24'}
                </span>
                <span className="text-xs text-neutral-500">/ month, billed {billingCycle}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-700 pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-[#FF5A60] shrink-0" />
                  <span className="font-semibold text-neutral-900">Unlimited portfolio case studies</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-[#FF5A60] shrink-0" />
                  <span>Custom custom domain (e.g. sophiavance.design)</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-[#FF5A60] shrink-0" />
                  <span>Unlimited client projects & milestones</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-[#FF5A60] shrink-0" />
                  <span>Automated client proposal PDF exports</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-[#FF5A60] shrink-0" />
                  <span>High-resolution image CDN hosting</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-[#FF5A60] shrink-0" />
                  <span>Stripe invoice & milestone payment links</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100">
              <Link to="/dashboard" className="w-full">
                <Button variant="primary" size="md" className="w-full" rightIcon={<LuArrowUpRight className="w-4 h-4" />}>
                  Start 14-Day Studio Trial
                </Button>
              </Link>
            </div>
          </Card>

          {/* Plan 3: Boutique Agency */}
          <Card padding="lg" className="flex flex-col justify-between border-neutral-300">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Collective</span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1">Design Collective</h3>
                <p className="text-xs text-neutral-500 mt-1">For multi-designer creative collectives and small studios.</p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="text-4xl font-extrabold text-neutral-900 font-mono">
                  ${billingCycle === 'annual' ? '49' : '59'}
                </span>
                <span className="text-xs text-neutral-500">/ month, billed {billingCycle}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-700 pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Everything in Studio Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Up to 5 designer member seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Collaborative client feedback portal</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated priority onboarding</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100">
              <Link to="/dashboard" className="w-full">
                <Button variant="outline" size="md" className="w-full">
                  Explore Collective
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Prototype Disclosure */}
        <div className="max-w-2xl mx-auto mt-16 p-4 rounded-xl bg-white border border-neutral-200 text-center text-xs text-neutral-500">
          <p>
            <strong>Note on prototype billing:</strong> Paid plans represent future production subscription tiers. No real credit card or Stripe charges occur in this demonstration environment.
          </p>
        </div>
      </div>
    </div>
  );
};
