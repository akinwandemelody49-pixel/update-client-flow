import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, hint, className = '', ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
          {label} {props.required && <span className="text-[#FF5A60]">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A60]/20 focus:border-[#FF5A60] ${
            error ? 'border-red-400 text-red-900 focus:ring-red-200' : 'border-neutral-300 text-neutral-900'
          } ${className}`}
          {...props}
        />
        {hint && !error && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
        {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id, error, hint, className = '', rows = 4, ...props }, ref) => {
    const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="w-full">
        <label htmlFor={textareaId} className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
          {label} {props.required && <span className="text-[#FF5A60]">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A60]/20 focus:border-[#FF5A60] ${
            error ? 'border-red-400 text-red-900 focus:ring-red-200' : 'border-neutral-300 text-neutral-900'
          } ${className}`}
          {...props}
        />
        {hint && !error && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
        {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  hint?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options, error, hint, className = '', ...props }, ref) => {
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="w-full">
        <label htmlFor={selectId} className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
          {label} {props.required && <span className="text-[#FF5A60]">*</span>}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5A60]/20 focus:border-[#FF5A60] ${
            error ? 'border-red-400 text-red-900 focus:ring-red-200' : 'border-neutral-300 text-neutral-900'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {hint && !error && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
        {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
