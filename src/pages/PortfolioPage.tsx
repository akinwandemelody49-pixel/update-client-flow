import React, { useState } from 'react';
import {
  LuPlus,
  LuUpload
} from 'react-icons/lu';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input, Textarea, Select } from '../components/ui/Input';
import { PortfolioCard } from '../components/portfolio/PortfolioCard';
import { ProjectDetailModal } from '../components/portfolio/ProjectDetailModal';
import { PortfolioItem, ServiceCategory } from '../types';

export const PortfolioPage: React.FC = () => {
  const { portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    year: '2025',
    category: 'Branding' as ServiceCategory,
    description: '',
    imageUrl: '/images/lumina-branding.jpg',
    tagsInput: 'Brand Identity, Typography, Design System',
    metrics: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('/images/lumina-branding.jpg');
  const [uploadError, setUploadError] = useState<string>('');

  const categories = ['All', 'Branding', 'Packaging', 'UI/UX Design', 'Editorial & Print'];

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      clientName: '',
      year: '2026',
      category: 'Branding',
      description: '',
      imageUrl: '/images/lumina-branding.jpg',
      tagsInput: 'Brand Identity, Art Direction, Guidelines',
      metrics: ''
    });
    setImagePreview('/images/lumina-branding.jpg');
    setUploadError('');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      clientName: item.clientName,
      year: item.year,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      tagsInput: item.tags.join(', '),
      metrics: item.metrics || ''
    });
    setImagePreview(item.imageUrl);
    setUploadError('');
    setIsAddModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setUploadError('Image size exceeds 4MB limit.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      setFormData(prev => ({ ...prev, imageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.clientName.trim()) return;

    const tags = formData.tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (editingItem) {
      updatePortfolioItem(editingItem.id, {
        title: formData.title,
        clientName: formData.clientName,
        year: formData.year,
        category: formData.category,
        description: formData.description,
        imageUrl: formData.imageUrl,
        tags: tags.length > 0 ? tags : ['Design'],
        metrics: formData.metrics || undefined
      });
    } else {
      addPortfolioItem({
        title: formData.title,
        clientName: formData.clientName,
        year: formData.year,
        category: formData.category,
        description: formData.description,
        imageUrl: formData.imageUrl,
        featured: true,
        tags: tags.length > 0 ? tags : ['Design', 'Direction'],
        metrics: formData.metrics || undefined
      });
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Portfolio Content Manager
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Add case studies, upload client work mockups, and organize your public showcase.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAddModal}
          leftIcon={<LuPlus className="w-4 h-4" />}
        >
          Add Case Study
        </Button>
      </div>

      {/* Storage Limitation Notice */}
      <div className="p-3.5 bg-neutral-100 rounded-xl border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between gap-4">
        <span>
          <strong>Browser Storage Note:</strong> New items and uploaded image data URLs are saved in your local browser storage. For production deployments, an S3 or Cloud Storage bucket would be connected.
        </span>
        <span className="font-mono text-neutral-500 shrink-0 tabular-nums">
          {portfolioItems.length} items live
        </span>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid with Admin Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <PortfolioCard
            key={item.id}
            item={item}
            showAdminActions
            onClick={(i) => setSelectedItem(i)}
            onEdit={(i) => handleOpenEditModal(i)}
            onDelete={(id) => deletePortfolioItem(id)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <ProjectDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Add / Edit Case Study Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingItem ? 'Edit Portfolio Project' : 'Publish New Case Study'}
        subtitle="Manage presentation assets and descriptive tags for your public profile."
        maxWidth="2xl"
      >
        <form onSubmit={handleSavePortfolio} className="space-y-4">
          <Input
            label="Project Title"
            required
            placeholder="e.g. Modern Architecture Monograph"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Client Name"
              required
              placeholder="e.g. Arcana Atelier"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            />
            <Input
              label="Year"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
              options={[
                { value: 'Branding', label: 'Branding' },
                { value: 'Packaging', label: 'Packaging' },
                { value: 'UI/UX Design', label: 'UI/UX Design' },
                { value: 'Editorial & Print', label: 'Editorial & Print' },
                { value: 'Motion Design', label: 'Motion Design' }
              ]}
            />
          </div>

          <Textarea
            label="Project Description & Creative Rationale"
            required
            rows={3}
            placeholder="Describe the aesthetic direction, typography choices, and client goals..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          {/* Image Upload & Preset Options */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Project Cover Image
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="sm:col-span-4 aspect-4/3 rounded-lg overflow-hidden bg-neutral-200 border border-neutral-300">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-8 space-y-2">
                <div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-800 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors">
                    <LuUpload className="w-3.5 h-3.5" />
                    <span>Upload Local File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-neutral-400 ml-2">Max 4MB (JPG, PNG, WebP)</span>
                </div>

                {uploadError && (
                  <p className="text-xs text-red-600 font-medium">{uploadError}</p>
                )}

                {/* Preset image selector */}
                <div className="pt-2 border-t border-neutral-200/80">
                  <div className="text-[11px] font-medium text-neutral-500 mb-1.5">Or select high-res studio preset:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: 'Branding Specimen', url: '/images/lumina-branding.jpg' },
                      { label: 'Packaging Bottles', url: '/images/norden-packaging.jpg' },
                      { label: 'Architectural Book', url: '/images/forma-editorial.jpg' },
                      { label: 'FinTech Mobile UI', url: '/images/fintech-ui.jpg' }
                    ].map((preset) => (
                      <button
                        type="button"
                        key={preset.url}
                        onClick={() => {
                          setImagePreview(preset.url);
                          setFormData(prev => ({ ...prev, imageUrl: preset.url }));
                        }}
                        className={`text-[11px] px-2 py-1 rounded-md border transition-colors cursor-pointer ${
                          formData.imageUrl === preset.url
                            ? 'bg-neutral-900 text-white border-neutral-900 font-medium'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Deliverable Tags (comma separated)"
              placeholder="e.g. Identity, Stationery, Typography"
              value={formData.tagsInput}
              onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
            />
            <Input
              label="Key Metric / Award (Optional)"
              placeholder="e.g. +140% Inbound Leads in 90 Days"
              value={formData.metrics}
              onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
            />
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingItem ? 'Save Changes' : 'Publish Project'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
