import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  LuFolderKanban,
  LuPlus,
  LuClock,
  LuCircleCheck,
  LuDollarSign,
  LuCalendar,
  LuTrash2
} from 'react-icons/lu';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input, Textarea, Select } from '../components/ui/Input';
import { Project, ProjectStatus, ServiceCategory } from '../types';

export const ProjectsPage: React.FC = () => {
  const { projects, addProject, updateProjectStatus, toggleDeliverable, deleteProject } = useApp();
  const [searchParams] = useSearchParams();
  const [filterStatus, setFilterStatus] = useState<string>(() => searchParams.get('status') || 'all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const urlStatus = searchParams.get('status');
    if (urlStatus) {
      setFilterStatus(urlStatus);
    }
  }, [searchParams]);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    clientName: '',
    serviceCategory: 'Branding' as ServiceCategory,
    status: 'in_progress' as ProjectStatus,
    startDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    budget: 5000,
    paidAmount: 2500,
    progress: 25,
    description: '',
    deliverablesInput: 'Creative Brief\nVisual Concepts\nFinal Asset Handoff'
  });

  const filteredProjects = filterStatus === 'all'
    ? projects
    : projects.filter(p => p.status === filterStatus);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.clientName.trim()) return;

    const deliverables = newProject.deliverablesInput
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map((title, idx) => ({
        id: `del-${Date.now()}-${idx}`,
        title,
        completed: idx === 0
      }));

    addProject({
      title: newProject.title,
      clientName: newProject.clientName,
      serviceCategory: newProject.serviceCategory,
      status: newProject.status,
      startDate: newProject.startDate,
      dueDate: newProject.dueDate,
      budget: Number(newProject.budget),
      paidAmount: Number(newProject.paidAmount),
      progress: Number(newProject.progress),
      description: newProject.description,
      deliverables: deliverables.length > 0 ? deliverables : [
        { id: 'del-1', title: 'Creative brief & brand audit', completed: true },
        { id: 'del-2', title: 'Concept presentation & review', completed: false },
        { id: 'del-3', title: 'Final vector asset export', completed: false }
      ]
    });

    setIsAddModalOpen(false);
    setNewProject({
      title: '',
      clientName: '',
      serviceCategory: 'Branding',
      status: 'in_progress',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      budget: 5000,
      paidAmount: 2500,
      progress: 25,
      description: '',
      deliverablesInput: 'Creative Brief\nVisual Concepts\nFinal Asset Handoff'
    });
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'review':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Client Design Projects
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Monitor client milestones, project scopes, payments, and deliverables.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<LuPlus className="w-4 h-4" />}
        >
          Add New Project
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-3">
        {['all', 'in_progress', 'planning', 'review', 'completed'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer capitalize ${
              filterStatus === st
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {st === 'all' ? 'All Projects' : st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            padding="md"
            className="flex flex-col justify-between hover:border-neutral-300 transition-all cursor-pointer group"
            onClick={() => setSelectedProject(project)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getStatusColor(project.status)} uppercase tracking-wider`}>
                  {project.status.replace('_', ' ')}
                </span>
                <span className="text-xs font-semibold text-neutral-900 tabular-nums">
                  ${project.budget.toLocaleString()}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#FF5A60] transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Client: <span className="font-medium text-neutral-700">{project.clientName}</span> · {project.serviceCategory}
                </p>
              </div>

              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Progress */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Progress</span>
                  <span className="font-bold text-neutral-900 tabular-nums">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF5A60] rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <LuCalendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-700 font-medium tabular-nums">
                <LuCircleCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{project.deliverables.filter(d => d.completed).length}/{project.deliverables.length} done</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Project Detail Modal with Deliverables Checklist */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || 'Project Scope'}
        subtitle={`Client: ${selectedProject?.clientName} · ${selectedProject?.serviceCategory}`}
        maxWidth="2xl"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <div>
                <div className="text-xs text-neutral-500">Current Phase</div>
                <select
                  value={selectedProject.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as ProjectStatus;
                    updateProjectStatus(selectedProject.id, newStatus);
                    setSelectedProject({ ...selectedProject, status: newStatus });
                  }}
                  className="mt-1 text-xs font-semibold px-2.5 py-1 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5A60]"
                >
                  <option value="planning">Planning Phase</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">Client Review</option>
                  <option value="completed">Completed & Invoiced</option>
                </select>
              </div>

              <div className="text-right">
                <div className="text-xs text-neutral-500">Contract Total</div>
                <div className="text-lg font-bold text-neutral-900 tabular-nums">
                  ${selectedProject.budget.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Scope description */}
            <div>
              <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                Project Scope & Requirements
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed bg-white p-3.5 rounded-lg border border-neutral-200">
                {selectedProject.description}
              </p>
            </div>

            {/* Deliverables Interactive Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Deliverables Checklist ({selectedProject.deliverables.filter(d => d.completed).length}/{selectedProject.deliverables.length})
                </h4>
                <span className="text-xs text-neutral-400">Click to toggle progress</span>
              </div>

              <div className="space-y-2">
                {selectedProject.deliverables.map((del) => (
                  <div
                    key={del.id}
                    onClick={() => {
                      toggleDeliverable(selectedProject.id, del.id);
                      const updated = selectedProject.deliverables.map(d =>
                        d.id === del.id ? { ...d, completed: !d.completed } : d
                      );
                      const comp = updated.filter(d => d.completed).length;
                      setSelectedProject({
                        ...selectedProject,
                        deliverables: updated,
                        progress: Math.round((comp / updated.length) * 100)
                      });
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer select-none ${
                      del.completed
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                        : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                      del.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-neutral-300 bg-white'
                    }`}>
                      {del.completed && <LuCircleCheck className="w-4 h-4" />}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${del.completed ? 'line-through text-emerald-800' : ''}`}>
                      {del.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              <button
                onClick={() => {
                  deleteProject(selectedProject.id);
                  setSelectedProject(null);
                }}
                className="text-xs text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <LuTrash2 className="w-3.5 h-3.5" />
                <span>Delete Project</span>
              </button>

              <Button variant="primary" size="sm" onClick={() => setSelectedProject(null)}>
                Close Window
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add New Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Start New Project Contract"
        subtitle="Record active client engagement in your studio records."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <Input
            label="Project Title"
            required
            placeholder="e.g. Modern Architecture Monograph"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Client Name / Organization"
              required
              placeholder="e.g. Museum of Art"
              value={newProject.clientName}
              onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
            />
            <Select
              label="Service Category"
              value={newProject.serviceCategory}
              onChange={(e) => setNewProject({ ...newProject, serviceCategory: e.target.value as ServiceCategory })}
              options={[
                { value: 'Branding', label: 'Branding' },
                { value: 'Packaging', label: 'Packaging' },
                { value: 'UI/UX Design', label: 'UI/UX Design' },
                { value: 'Editorial & Print', label: 'Editorial & Print' },
                { value: 'Motion Design', label: 'Motion Design' }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Contract Value ($)"
              type="number"
              required
              value={newProject.budget}
              onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
            />
            <Input
              label="Target Due Date"
              type="date"
              required
              value={newProject.dueDate}
              onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
            />
          </div>

          <Textarea
            label="Project Scope Description"
            rows={2}
            placeholder="Scope details, milestones, agreed revision rounds..."
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />

          <Textarea
            label="Milestone Deliverables (one per line)"
            rows={3}
            hint="Each line becomes a trackable checklist item."
            value={newProject.deliverablesInput}
            onChange={(e) => setNewProject({ ...newProject, deliverablesInput: e.target.value })}
          />

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Create Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
