import type { QuestionTypeMeta, QuestionTypeConfig } from '@/types/formBuilderTypes';

export const QUESTION_TYPE_REGISTRY: Record<string, QuestionTypeMeta> = {
  shortText: {
    id: 'shortText',
    label: 'Short Text',
    icon: 'text',
    category: 'text',
    defaultProps: {
      question: 'Your question here...',
      placeholder: 'Type your answer...',
      required: false,
    },
  },
  longText: {
    id: 'longText',
    label: 'Long Text',
    icon: 'align-left',
    category: 'text',
    defaultProps: {
      question: 'Your question here...',
      placeholder: 'Type your detailed answer...',
      required: false,
    },
  },
  email: {
    id: 'email',
    label: 'Email',
    icon: 'mail',
    category: 'contact',
    defaultProps: {
      question: 'What is your email?',
      placeholder: 'your.email@example.com',
      required: false,
    },
  },
  number: {
    id: 'number',
    label: 'Number',
    icon: 'hash',
    category: 'text',
    defaultProps: {
      question: 'Enter a number',
      placeholder: '0',
      required: false,
    },
  },
  select: {
    id: 'select',
    label: 'Dropdown',
    icon: 'chevron-down',
    category: 'choice',
    defaultProps: {
      question: 'Select an option',
      options: ['Option 1', 'Option 2', 'Option 3'],
      required: false,
    },
  },
  multipleChoice: {
    id: 'multipleChoice',
    label: 'Multiple Choice',
    icon: 'circle',
    category: 'choice',
    defaultProps: {
      question: 'Choose one option',
      options: ['Option 1', 'Option 2', 'Option 3'],
      required: false,
    },
  },
  checkbox: {
    id: 'checkbox',
    label: 'Checkboxes',
    icon: 'check-square',
    category: 'choice',
    defaultProps: {
      question: 'Select all that apply',
      options: ['Option 1', 'Option 2', 'Option 3'],
      required: false,
    },
  },
  
};

// Helper function to create a new question with default props
export function createQuestion(type: keyof typeof QUESTION_TYPE_REGISTRY): any {
  const typeConfig = QUESTION_TYPE_REGISTRY[type];
  if (!typeConfig) {
    throw new Error(`Unknown question type: ${type}`);
  }

  return {
    id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: typeConfig.id,
    props: { ...typeConfig.defaultProps },
  };
}