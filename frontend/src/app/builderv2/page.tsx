'use client';

import React, { useState } from 'react';
import { GripVertical, Plus, Settings, Trash2, Copy, Mail, Type, AlignLeft, Hash, Circle, Square, Divide, X } from 'lucide-react';

// Types
interface FormField {
  id: string;
  type: 'text' | 'email' | 'longtext' | 'number' | 'choice' | 'checkbox' | 'pageBreak';
  question: string;
  placeholder: string;
  required: boolean;
  options?: string[];
}

interface FormData {
  title: string;
  description: string;
  fields: FormField[];
}

// Field type configurations
const fieldTypes = [
  { type: 'text', label: 'Short Text', icon: Type, description: 'Single line of text' },
  { type: 'email', label: 'Email', icon: Mail, description: 'Email address' },
  { type: 'longtext', label: 'Long Text', icon: AlignLeft, description: 'Multiple lines of text' },
  { type: 'number', label: 'Number', icon: Hash, description: 'Numeric input' },
  { type: 'choice', label: 'Multiple Choice', icon: Circle, description: 'Pick one option' },
  { type: 'checkbox', label: 'Checkboxes', icon: Square, description: 'Pick multiple options' },
  { type: 'pageBreak', label: 'Page Break', icon: Divide, description: 'Split form into pages' },
];

export default function CalmFormsBuilder() {
  const [form, setForm] = useState<FormData>({
    title: 'Untitled Form',
    description: '',
    fields: [
      {
        id: '1',
        type: 'text',
        question: 'What is your name?',
        placeholder: 'Type your answer here...',
        required: false,
      },
    ],
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      question: type === 'pageBreak' ? '' : 'Type your question...',
      placeholder: 'Type answer here...',
      required: false,
      options: type === 'choice' || type === 'checkbox' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
    };
    setForm({ ...form, fields: [...form.fields, newField] });
    setShowAddMenu(false);
    setFocusedField(newField.id);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setForm({
      ...form,
      fields: form.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    });
  };

  const deleteField = (id: string) => {
    setForm({ ...form, fields: form.fields.filter((f) => f.id !== id) });
  };

  const duplicateField = (field: FormField) => {
    const newField = { ...field, id: Date.now().toString() };
    const index = form.fields.findIndex((f) => f.id === field.id);
    const newFields = [...form.fields];
    newFields.splice(index + 1, 0, newField);
    setForm({ ...form, fields: newFields });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              CalmForms
            </div>
            <div className="w-px h-5 bg-amber-200" />
            <div className="text-sm text-gray-600">{form.title}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-emerald-600 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Saved
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Preview
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-amber-200">
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Form Header */}
        <div className="mb-16 space-y-4">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full text-5xl font-bold text-gray-900 bg-transparent border-none outline-none placeholder-gray-300"
            placeholder="Untitled form"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full text-lg text-gray-600 bg-transparent border-none outline-none placeholder-gray-300 resize-none"
            placeholder="Add a description..."
            rows={2}
          />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {form.fields.map((field, index) => (
            <QuestionBlock
              key={field.id}
              field={field}
              index={index}
              isFocused={focusedField === field.id}
              onFocus={() => setFocusedField(field.id)}
              onUpdate={(updates) => updateField(field.id, updates)}
              onDelete={() => deleteField(field.id)}
              onDuplicate={() => duplicateField(field)}
            />
          ))}
        </div>

        {/* Add Button */}
        <div className="relative mt-8">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-full py-6 border-2 border-dashed border-amber-200 hover:border-amber-400 rounded-2xl text-gray-400 hover:text-amber-600 transition-all hover:bg-amber-50/50 flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add question
          </button>

          {/* Add Menu */}
          {showAddMenu && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                Question Types
              </div>
              {fieldTypes.map(({ type, label, icon: Icon, description }) => (
                <button
                  key={type}
                  onClick={() => addField(type as FormField['type'])}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-amber-50 rounded-xl transition-colors text-left group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-amber-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{label}</div>
                    <div className="text-xs text-gray-500">{description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function QuestionBlock({
  field,
  index,
  isFocused,
  onFocus,
  onUpdate,
  onDelete,
  onDuplicate,
}: {
  field: FormField;
  index: number;
  isFocused: boolean;
  onFocus: () => void;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}) {
  const fieldConfig = fieldTypes.find((f) => f.type === field.type);
  const Icon = fieldConfig?.icon || Type;

  // Special rendering for page break
  if (field.type === 'pageBreak') {
    return (
      <div
        onClick={onFocus}
        className={`group relative bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 transition-all cursor-pointer border-2 border-dashed ${
          isFocused ? 'border-amber-400' : 'border-amber-200 hover:border-amber-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Divide className="w-5 h-5 text-amber-500" />
            <div>
              <div className="text-sm font-semibold text-gray-700">Page Break</div>
              <div className="text-xs text-gray-500">Questions after this will appear on a new page</div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onFocus}
      className={`group relative bg-white rounded-2xl p-8 transition-all cursor-pointer ${
        isFocused
          ? 'ring-2 ring-amber-400 shadow-xl shadow-amber-100'
          : 'hover:shadow-lg hover:shadow-gray-100 border border-gray-100'
      }`}
    >
      {/* Drag Handle */}
      <button className="absolute -left-12 top-8 w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </button>

      {/* Question Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-xl font-bold text-sm transition-all ${
            isFocused ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {index + 1}
        </div>
        <div className="flex-1 space-y-3">
          <input
            type="text"
            value={field.question}
            onChange={(e) => onUpdate({ question: e.target.value })}
            className="w-full text-lg font-semibold text-gray-900 bg-transparent border-none outline-none placeholder-gray-300"
            placeholder="Type your question..."
          />
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
            <Icon className="w-3.5 h-3.5" />
            {fieldConfig?.label}
          </div>
        </div>
      </div>

      {/* Answer Preview */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Preview</div>
        <AnswerPreview field={field} onUpdate={onUpdate} />
      </div>

      {/* Actions */}
      <div
        className={`mt-6 pt-6 border-t border-gray-100 flex items-center justify-between transition-opacity ${
          isFocused || 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Duplicate"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors group/delete"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-gray-600 group-hover/delete:text-red-600" />
          </button>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded accent-amber-500"
          />
          <span className="text-sm font-medium text-gray-700">Required</span>
        </label>
      </div>
    </div>
  );
}

function AnswerPreview({ field, onUpdate }: { field: FormField; onUpdate: (updates: Partial<FormField>) => void }) {
  // Helper function to update a specific option
  const updateOption = (index: number, newValue: string) => {
    if (!field.options) return;
    const newOptions = [...field.options];
    newOptions[index] = newValue;
    onUpdate({ options: newOptions });
  };

  // Helper function to add a new option
  const addOption = () => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
    onUpdate({ options: newOptions });
  };

  // Helper function to remove an option
  const removeOption = (index: number) => {
    if (!field.options || field.options.length <= 1) return; // Keep at least one option
    const newOptions = field.options.filter((_, i) => i !== index);
    onUpdate({ options: newOptions });
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
      return (
        <input
          type={field.type}
          placeholder={field.placeholder}
          disabled
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 text-sm"
        />
      );

    case 'longtext':
      return (
        <textarea
          placeholder={field.placeholder}
          disabled
          rows={4}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 text-sm resize-none"
        />
      );

    case 'choice':
      return (
        <div className="space-y-2">
          {field.options?.map((option, i) => (
            <div key={i} className="flex items-center gap-2 group/option">
              <div className="flex items-center gap-3 flex-1 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <input type="radio" disabled className="w-4 h-4 accent-amber-500 flex-shrink-0" />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(i, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 text-sm text-gray-700 bg-transparent border-none outline-none focus:text-gray-900"
                  placeholder={`Option ${i + 1}`}
                />
              </div>
              {field.options && field.options.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(i);
                  }}
                  className="p-2 opacity-0 group-hover/option:opacity-100 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove option"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-red-600" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addOption();
            }}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium px-3 py-2 hover:bg-amber-50 rounded-lg transition-colors"
          >
            + Add option
          </button>
        </div>
      );

    case 'checkbox':
      return (
        <div className="space-y-2">
          {field.options?.map((option, i) => (
            <div key={i} className="flex items-center gap-2 group/option">
              <div className="flex items-center gap-3 flex-1 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <input type="checkbox" disabled className="w-4 h-4 rounded accent-amber-500 flex-shrink-0" />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(i, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 text-sm text-gray-700 bg-transparent border-none outline-none focus:text-gray-900"
                  placeholder={`Option ${i + 1}`}
                />
              </div>
              {field.options && field.options.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(i);
                  }}
                  className="p-2 opacity-0 group-hover/option:opacity-100 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove option"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-red-600" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addOption();
            }}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium px-3 py-2 hover:bg-amber-50 rounded-lg transition-colors"
          >
            + Add option
          </button>
        </div>
      );

    default:
      return null;
  }
}