interface Question {
    id:string,
    type:string,
    title:string,
    placeholder?:string,
    options?:string[],
    required:boolean,
}

interface FormConfig{
    id:string,
    title:string,
    questions:Question[],
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



export const sampleQuestions: Question[] = [
    {
        id: "q1",
        type: "email",
        title: "What is your email address?",
        placeholder: "example@email.com",
        required: true
    },
    {
        id: "q2",
        type: "select",
        title: "What is your current role?",
        options: ["Student", "Developer", "Designer", "Manager", "Other"],
        required: true
    },
    {
        id: "q3",
        type: "select",
        title: "What is your experience level?",
        options: ["Beginner", "Intermediate", "Advanced", "Expert"],
        required: true
    },
    {
        id: "q4",
        type: "number",
        title: "How many years of experience do you have?",
        placeholder: "Enter number of years",
        required: true
    },
    {
        id: "q5",
        type: "text",
        title: "Tell us about your experience and goals",
        placeholder: "Share your background and what you hope to achieve...",
        required: false
    },
    {
        id: "q6",
        type: "select",
        title: "Which programming language do you primarily use?",
        options: ["JavaScript", "Python", "Java", "C++", "Swift", "Go", "Rust", "Other"],
        required: true
    },
    {
        id: "q7",
        type: "email",
        title: "What is your company email?",
        placeholder: "work@company.com",
        required: false
    },
    {
        id: "q8",
        type: "number",
        title: "What is your expected salary (in thousands)?",
        placeholder: "e.g., 80",
        required: false
    },
    {
        id: "q9",
        type: "text",
        title: "Why are you interested in this position?",
        placeholder: "Describe your motivation and interest...",
        required: true
    },
    {
        id: "q10",
        type: "select",
        title: "Preferred work arrangement",
        options: ["Remote", "On-site", "Hybrid", "Flexible"],
        required: true
    }
];

export const getQuestionTypeByID = (type:string) => {
    return questionTypes.find((question) => question.id === type)
}


export type { Question, FormConfig };