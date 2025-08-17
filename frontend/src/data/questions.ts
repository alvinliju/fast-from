interface Question {
    id:string,
    type:string,
    props:{
        question:string,
        placeholder?:string,
        options?:string[],
        required:boolean,
    }
    
}

interface Page{
    id:string,
    type:string,
    content:Question[],
    props:any,
}

interface FormConfig{
    id:string,
    title:string,
    pages:Page[],
}

export const questionTypes = [
    {
        id: "email",
        label: "Email",
        icon: "email"
    },
    {
        id: "number",
        label: "Number",
        icon: "number"
    },
    {
        id: "text",
        label: "Text",
        icon: "text"
    },
    {
        id: "select",
        label: "Select",
        icon: "select"
    },
]



export const sampleQuestions: Page[] = [
    {
        id: "page-1",
        type: "pageBreak",
        content: [
            {
                id: "q1",
                type: "shortText",
                props: {
                    question: "What is your full name?",
                    placeholder: "Enter your full name",
                    required: true
                }
            },
            {
                id: "q2",
                type: "email",
                props: {
                    question: "What is your email address?",
                    placeholder: "your.email@example.com",
                    required: true
                }
            },
            {
                id: "q3",
                type: "number",
                props: {
                    question: "What is your age?",
                    placeholder: "Enter your age",
                    required: true
                }
            }
        ],
        props: {}
    },
    {
        id: "page-2",
        type: "pageBreak",
        content: [
            {
                id: "q4",
                type: "longText",
                props: {
                    question: "Tell us about your background and experience",
                    placeholder: "Share your professional background, skills, and relevant experience...",
                    required: false
                }
            },
            {
                id: "q5",
                type: "select",
                props: {
                    question: "What is your current role?",
                    options: ["Student", "Junior Developer", "Mid-level Developer", "Senior Developer", "Team Lead", "Manager", "Other"],
                    required: true
                }
            }
        ],
        props: {}
    },
    {
        id: "page-3",
        type: "pageBreak",
        content: [
            {
                id: "q6",
                type: "select",
                props: {
                    question: "Which programming languages are you most proficient in?",
                    options: ["JavaScript/TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Other"],
                    required: true
                }
            },
            {
                id: "q7",
                type: "number",
                props: {
                    question: "How many years of professional experience do you have?",
                    placeholder: "Enter number of years",
                    required: true
                }
            }
        ],
        props: {}
    },
    {
        id: "page-4",
        type: "pageBreak",
        content: [
            {
                id: "q8",
                type: "longText",
                props: {
                    question: "What are your career goals for the next 2-3 years?",
                    placeholder: "Describe your professional aspirations and what you hope to achieve...",
                    required: false
                }
            },
            {
                id: "q9",
                type: "select",
                props: {
                    question: "What type of work environment do you prefer?",
                    options: ["Remote", "On-site", "Hybrid", "Flexible"],
                    required: true
                }
            },
            {
                id: "q10",
                type: "number",
                props: {
                    question: "What is your expected salary range (in thousands)?",
                    placeholder: "e.g., 80",
                    required: false
                }
            }
        ],
        props: {}
    }
];

// Also update the FormConfig to use pages:
const formConfig: FormConfig = {
    id: "1",
    title: "Developer Application Form",
    pages: sampleQuestions,
};

export const getQuestionTypeByID = (type:string) => {
    return questionTypes.find((question) => question.id === type)
}


export type { Question, FormConfig, Page };