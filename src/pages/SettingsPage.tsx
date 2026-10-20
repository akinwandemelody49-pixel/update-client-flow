import React, { useState } from 'react';
import { LuSave, LuRefreshCw, LuUser, LuDatabase, LuCheck, LuType } from 'react-icons/lu';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';

export const SettingsPage: React.FC = () => {
  const { profile, updateProfile, resetAllData } = useApp();

  const [formData, setFormData] = useState({
    name: profile.name,
    title: profile.title,
    location: profile.location,
    bio: profile.bio,
    availability: profile.availability,
    startingRate: profile.startingRate,
    experienceYears: profile.experienceYears
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  // Google Font selection
  const [selectedFont, setSelectedFont] = useState(() => {
    return localStorage.getItem('clientflow_font_theme') || 'plus_jakarta';
  });

  const fontOptions = [
    {
      id: 'plus_jakarta',
      name: 'Plus Jakarta Sans',
      category: 'Geometric Neo-Grotesque (Default)',
      family: "'Plus Jakarta Sans', system-ui, sans-serif"
    },
    {
      id: 'outfit',
      name: 'Outfit',
      category: 'Contemporary Display Sans',
      family: "'Outfit', system-ui, sans-serif"
    },
    {
      id: 'dm_sans',
      name: 'DM Sans',
      category: 'Clean Geometric Sans',
      family: "'DM Sans', system-ui, sans-serif"
    }
  ];

  const handleFontChange = (fontId: string) => {
    const font = fontOptions.find(f => f.id === fontId);
    if (!font) return;
    setSelectedFont(fontId);
    localStorage.setItem('clientflow_font_theme', fontId);
    document.documentElement.style.setProperty('--app-font-family', font.family);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    resetAllData();
    setResetConfirm(false);
    setFormData({
      name: 'Sophia Vance',
      title: 'Independent Brand Identity & Digital Product Designer',
      location: 'London & Remote Worldwide',
      bio: 'Specialising in timeless visual identity systems, sustainable packaging, and high-conversion digital interfaces for ambitious independent brands and forward-thinking studios.',
      availability: 'Available for Q4 projects',
      startingRate: '$4,500',
      experienceYears: 8
    });
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
          Studio & Profile Settings
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
          Update your public profile, rates, and manage local prototype data.
        </p>
      </div>

      {/* Profile Form */}
      <Card padding="lg">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <LuUser className="w-4 h-4 text-[#FF5A60]" />
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Designer Public Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Professional Title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <Input
              label="Availability Status"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            />
            <Input
              label="Starting Rate"
              value={formData.startingRate}
              onChange={(e) => setFormData({ ...formData, startingRate: e.target.value })}
            />
          </div>

          <Textarea
            label="Biography / Studio Philosophy"
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />

          <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
            {savedSuccess ? (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <LuCheck className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </span>
            ) : (
              <span className="text-xs text-neutral-400">Updates reflect live across all views.</span>
            )}

            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<LuSave className="w-4 h-4" />}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Studio Typography & Google Font Selection */}
      <Card padding="lg">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
          <LuType className="w-4 h-4 text-[#FF5A60]" />
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Studio Typography (Google Fonts)
          </h3>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed mt-3 mb-4">
          Select the active Google Font pairing for your public portfolio and studio dashboard. The selected family is rendered across all headings, body text, and client forms.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {fontOptions.map((font) => (
            <button
              key={font.id}
              type="button"
              onClick={() => handleFontChange(font.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedFont === font.id
                  ? 'border-[#FF5A60] bg-[#FF5A60]/5 ring-1 ring-[#FF5A60]'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-neutral-900" style={{ fontFamily: font.family }}>
                  {font.name}
                </span>
                {selectedFont === font.id && (
                  <span className="w-2 h-2 rounded-full bg-[#FF5A60]" />
                )}
              </div>
              <div className="text-[11px] text-neutral-500">
                {font.category}
              </div>
              <div className="mt-2 text-xs text-neutral-400 font-medium" style={{ fontFamily: font.family }}>
                Design work that gets you hired.
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span>Tabular numerals powered by <strong className="font-mono text-neutral-700">JetBrains Mono</strong></span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <LuCheck className="w-3.5 h-3.5" />
            <span>Google Fonts Live</span>
          </span>
        </div>
      </Card>

      {/* Data Management & Reset */}
      <Card padding="lg" className="border-red-200 bg-red-50/20">
        <div className="flex items-center gap-2 pb-3 border-b border-red-100 text-red-900">
          <LuDatabase className="w-4 h-4 text-red-600" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Prototype Data Management
          </h3>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed mt-3">
          ClientFlow is currently running as a prototype with data stored in your browser&apos;s <code className="bg-neutral-200 px-1 py-0.5 rounded text-neutral-800">localStorage</code>. If you wish to restore original demo enquiries, projects, and portfolio items, click below.
        </p>

        <div className="mt-4 pt-3 border-t border-red-100 flex items-center justify-between">
          {resetConfirm ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-700 font-semibold">Are you sure?</span>
              <Button variant="danger" size="sm" onClick={handleReset}>
                Yes, Reset All Data
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setResetConfirm(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setResetConfirm(true)}
              leftIcon={<LuRefreshCw className="w-3.5 h-3.5 text-red-600" />}
            >
              Reset to Original Sample Data
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
