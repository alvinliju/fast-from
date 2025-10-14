export interface BaseQuestion {
    question: string;
    placeholder?: string;
    required: boolean;
    description?: string;
}

export interface OptionQuestionProps extends BaseQuestion {
    options: string[];
}

export interface QuestionTypeConfig{
    shortText: BaseQuestion;
    longText: BaseQuestion;
    email: BaseQuestion;
    number: BaseQuestion;
    select: OptionQuestionProps;
    multipleChoice: OptionQuestionProps;
    checkbox: OptionQuestionProps;
}

export type QuestionType = keyof QuestionTypeConfig;

export type FormQuestion<T extends QuestionType = QuestionType> = {
    id: string;
    type: T;
    props: QuestionTypeConfig[T];
};

export interface QuestionTypeMeta {
    id: QuestionType;
    label: string;
    icon: string;
    category: 'text' | 'choice' | 'contact';
    defaultProps: QuestionTypeConfig[QuestionType];
}
