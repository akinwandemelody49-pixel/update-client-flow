import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { LuCheck, LuClock, LuPlus, LuTrash2, LuCalendar, LuFlag } from 'react-icons/lu';

export const UpcomingTasks: React.FC = () => {
  const { tasks, toggleTask, addTask, deleteTask } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle.trim(),
      relatedName: newClient.trim() || 'General Studio',
      relatedType: 'general',
      dueDate: newDueDate || new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      priority: newPriority
    });

    setNewTitle('');
    setNewClient('');
    setNewDueDate('');
    setIsAdding(false);
  };

  const priorityColors = {
    high: 'text-rose-600 bg-rose-50 border-rose-200',
    medium: 'text-amber-600 bg-amber-50 border-amber-200',
    low: 'text-neutral-600 bg-neutral-100 border-neutral-200'
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Upcoming Studio Tasks
            </h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 tabular-nums">
              {pendingTasks.length} pending
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Follow-ups, client deliverables, and proposal milestones.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(!isAdding)}
          leftIcon={<LuPlus className="w-3.5 h-3.5" />}
        >
          {isAdding ? 'Cancel' : 'Add Task'}
        </Button>
      </div>

      {/* Add Task Quick Form */}
      {isAdding && (
        <form onSubmit={handleCreateTask} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
          <input
            type="text"
            required
            placeholder="Task description (e.g., Send packaging concept deck to Elena)..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full text-xs px-3 py-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5A60] focus:border-[#FF5A60]"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Related client/project"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              className="text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5A60]"
            />
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5A60]"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as any)}
              className="text-xs px-3 py-1.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5A60]"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Task
            </Button>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="space-y-2.5">
        {tasks.length === 0 ? (
          <div className="p-8 text-center text-xs text-neutral-400">
            No upcoming tasks recorded. Click "Add Task" to create one.
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start justify-between gap-3 p-3 rounded-lg border transition-all ${
                task.completed
                  ? 'bg-neutral-50/60 border-neutral-200/60 opacity-60'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {/* Checkbox */}
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors cursor-pointer border ${
                  task.completed
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-neutral-300 hover:border-[#FF5A60] bg-white'
                }`}
                aria-label={task.completed ? 'Mark task pending' : 'Mark task completed'}
              >
                {task.completed && <LuCheck className="w-3.5 h-3.5 stroke-[3]" />}
              </button>

              {/* Task Details */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-medium leading-snug ${
                    task.completed ? 'line-through text-neutral-400' : 'text-neutral-900'
                  }`}
                >
                  {task.title}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-neutral-500">
                  <span className="font-medium text-neutral-700">{task.relatedName}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <LuCalendar className="w-3 h-3 text-neutral-400" />
                    <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                  </span>
                  <span>·</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                      priorityColors[task.priority]
                    }`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                className="text-neutral-300 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                title="Delete task"
              >
                <LuTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className="pt-2 text-right">
          <span className="text-[11px] text-neutral-400">
            {completedTasks.length} task{completedTasks.length > 1 ? 's' : ''} completed
          </span>
        </div>
      )}
    </Card>
  );
};
