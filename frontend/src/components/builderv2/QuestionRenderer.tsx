import React from 'react';
import type { FormQuestion, QuestionType } from '@/types/formBuilderTypes';

interface QuestionRendererProps {
  question: FormQuestion;
  onUpdate: (id: string, updates: Partial<FormQuestion['props']>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  index: number;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  onUpdate,
  onDelete,
  onDuplicate,
  index,
}) => {
  const handlePropUpdate = (key: string, value: any) => {
    onUpdate(question.id, { [key]: value });
  };

  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
      <div className="p-6">
        <div className="flex gap-4">
          <div className="flex items-center justify-center w-9 h-9 text-sm font-bold text-gray-500 bg-gray-100 rounded-lg">
            {index + 1}
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={question.props.question}
              onChange={(e) => handlePropUpdate('question', e.target.value)}
              className="w-full text-lg font-medium bg-transparent outline-none placeholder:text-gray-400"
              placeholder="Ask your question..."
            />
            <QuestionTypeLabel type={question.type} />
          </div>
        </div>

        {/* Preview based on question type */}
        <QuestionPreview question={question} onPropUpdate={handlePropUpdate} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-t border-gray-100 rounded-b-xl">
        <div className="flex gap-2">
          <button
            onClick={() => onDuplicate(question.id)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            title="Duplicate"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
          </button>
          <button
            onClick={() => onDelete(question.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </button>
        </div>
        <label className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="checkbox"
            checked={question.props.required}
            onChange={(e) => handlePropUpdate('required', e.target.checked)}
            className="w-4 h-4 text-amber-500 rounded"
          />
          Required
        </label>
      </div>
    </div>
  );
};

// Component for question type label
const QuestionTypeLabel: React.FC<{ type: QuestionType }> = ({ type }) => {
  const labels: Record<QuestionType, string> = {
    shortText: 'Short text',
    longText: 'Long text',
    email: 'Email',
    number: 'Number',
    select: 'Dropdown',
    multipleChoice: 'Multiple choice',
    checkbox: 'Checkboxes',
  };

  return (
    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h12M4 17h8" />
      </svg>
      {labels[type]}
    </div>
  );
};

// Component for rendering preview based on type
const QuestionPreview: React.FC<{
  question: FormQuestion;
  onPropUpdate: (key: string, value: any) => void;
}> = ({ question, onPropUpdate }) => {
  const renderPreview = () => {
    switch (question.type) {
      case 'shortText':
      case 'email':
      case 'number':
        return (
          <input
            type="text"
            disabled
            placeholder={question.props.placeholder || 'Type answer here...'}
            className="w-full px-3 py-2.5 text-gray-400 bg-gray-50 border border-gray-200 rounded-lg"
          />
        );
      
      case 'longText':
        return (
          <textarea
            disabled
            placeholder={question.props.placeholder || 'Type detailed answer here...'}
            className="w-full px-3 py-2.5 text-gray-400 bg-gray-50 border border-gray-200 rounded-lg resize-none"
            rows={3}
          />
        );
      
      case 'select':
      case 'multipleChoice':
      case 'checkbox':
        const options = 'options' in question.props ? question.props.options : [];
        return (
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 mb-2">Options:</div>
            {options.map((option, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx] = e.target.value;
                    onPropUpdate('options', newOptions);
                  }}
                  className="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg"
                />
                <button
                  onClick={() => {
                    const newOptions = options.filter((_, i) => i !== idx);
                    onPropUpdate('options', newOptions);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                onPropUpdate('options', [...options, `Option ${options.length + 1}`]);
              }}
              className="text-sm text-amber-600 hover:text-amber-700"
            >
              + Add option
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        How it looks to respondents
      </div>
      {renderPreview()}
    </div>
  );
};