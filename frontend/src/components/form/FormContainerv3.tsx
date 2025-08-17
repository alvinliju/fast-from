"use client";

import { ArrowLeft, ArrowRight, Check, CircleCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { div } from "motion/react-client";
import { useState } from "react";
import { Button } from "../ui/button";
import RotatingCompleteButton from "./SubmitButton";

//create a simple dummy questions according to our shit from question.ts
const sampleQuestions = [
  {
    id: "1",
    type: "shortText",
    props: {
      question: "What is your name?",
      placeholder: "Enter your name",
      required: true,
    },
  },
  {
    id: "2",
    type: "email",
    props: {
      question: "What is your email?",
      placeholder: "Enter your email",
      required: true,
    },
  },
  {
    id: "3",
    type: "number",
    props: {
      question: "What is your age?",
      placeholder: "Enter your age",
      required: true,
    },
  },
  {
    id: "4",
    type: "select",
    props: {
      question: "What is your favorite color?",
      options: ["Red", "Blue", "Green", "Yellow", "Purple"],
    },
  },
];

//what is a formContainer?
//it is what handles the form/page state -> that means which page is getting rendered right now
//it also handles formData -> that means takes in the responses and stores it accordingly in questionStruct
//it also handles the navigation -> that means back and next buttons

//so now thats clear what are all the states we need to make this work?
//1. currentPage -> which page is getting rendered right now
//2. formData -> that means takes in the responses and stores it accordingly in questionStruct
//3.isSubmitted an array of type question which takes in the response

//so now we need to make a formContainer
//it will take in the sampleQuestions and then render the currentPage
//it will also take in the formData and then store it accordingly in questionStruct
//it will also take in the isSubmitted and then render the success screen

export default function FormContainer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (questionId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentPage === sampleQuestions.length - 1) {
      setIsSubmitted(true);
      console.log("Form submitted:", formData);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto ">
      {/* we need to check if isSubmitted is true/false
        if true then render the successScreen
         */}
      {isSubmitted ? (
        <SuccessScreen />
      ) : (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] p-8">
          {/* we need the progress bar first */}

          <div className="mb-8">
            <ProgressBar current={currentPage} total={sampleQuestions.length} />
          </div>
          {/* we need the question */}
          <div className="flex items-center justify-center w-full  h-full">
            <AnimationWrapper key={currentPage}>
              <div className="w-full max-w-4xl">
                <QuestionRenderer
                  question={sampleQuestions[currentPage]}
                  value={formData[sampleQuestions[currentPage].id] || ""}
                  onChange={handleChange}
                />
              </div>
            </AnimationWrapper>
          </div>

          <Navigation
            onBack={handleBack}
            onNext={handleNext}
            showBack={currentPage > 0}
            showNext={true}
            isLast={currentPage === sampleQuestions.length - 1}
          />
        </div>
      )}
    </div>
  );
}

const SuccessScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center">
          <CircleCheck className="w-10 h-10 text-green-500 mb-2" />
          <h1 className="text-2xl font-semibold">Form Submitted</h1>
          <p className="text-gray-500">Thank you for submitting the form.</p>
        </div>
      </motion.div>
    </div>
  );
};

//question renderer shit
const QuestionRenderer = ({
  question,
  value,
  onChange,
}: {
  question: any;
  value: any;
  onChange: (questionId: string, value: string) => void;
}) => {
  const { type, props } = question;
  const { question: label, placeholder, required, options } = props;
  switch (question.type) {
    case "shortText":
      return (
        <FancyInput
          label={label}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={placeholder}
        />
      );
    case "email":
      return (
        <FancyInput
          label={label}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={placeholder}
        />
      );
    case "number":
      return (
        <FancyInput
          label={label}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={placeholder}
        />
      );
    case "select":
      return (
        <FancySelect
          label={label}
          value={value}
          onChange={(selectedValue) => onChange(question.id, selectedValue)}
          options={options}
        />
      );
    case "textarea":
      return (
        <FancyTextArea
          label={label}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={placeholder}
        />
      );
    case "checkbox":
      return (
        <FancyCheckbox
          label={label}
          checked={value}
          onChange={(checked) => onChange(question.id, checked.toString())}
        />
      );
    default:
      return null;
  }
};

const ProgressBar = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => (
  <div className="fixed top-0 left-0 w-full z-10">
    <div className="flex justify-between text-sm text-gray-500">
      {/* <span>
        {current + 1} of {total}
      </span>
      <span>{Math.round(((current + 1) / total) * 100)}%</span> */}
    </div>
    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-500 ease-out rounded-full"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      />
    </div>
  </div>
);

//3rd component
//build a fancy input
//select fancy component
//text area fancy component
//checkbox fancy component
// Text Input
const FancyInput = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <div className="mb-8">
    <label className="block text-xl font-medium text-gray-800 mb-4">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full text-lg px-0 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
    />
  </div>
);

// Select (Button Style)
const FancySelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => (
  <div className="mb-8">
    <label className="block text-xl font-medium text-gray-800 mb-4">
      {label}
    </label>
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
            value === option
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

// Textarea
const FancyTextArea = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}) => (
  <div className="mb-8">
    <label className="block text-xl font-medium text-gray-800 mb-4">
      {label}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
    />
  </div>
);

// Checkbox
const FancyCheckbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="mb-8">
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center space-x-4 p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all w-full text-left"
    >
      <div
        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
          checked ? "bg-blue-500 border-blue-500" : "border-gray-300"
        }`}
      >
        {checked && <Check className="w-4 h-4 text-white" />}
      </div>
      <span className="text-lg font-medium text-gray-800">{label}</span>
    </button>
  </div>
);

//4th component
//basic naviagations
//back, next, submit buttons and logic
const Navigation = ({
  onBack,
  onNext,
  showBack,
  showNext,
  isLast,
}: {
  onBack: () => void;
  onNext: () => void;
  showBack: boolean;
  showNext: boolean;
  isLast: boolean;
}) => (
  <div className="flex justify-between pt-8 border-t border-gray-200">
    <Button variant="outline" onClick={onBack} disabled={!showBack}>
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </Button>

{isLast ? <RotatingCompleteButton onClick={()=>onNext()}/> : (
    <Button onClick={onNext}>
      <span>{isLast ? "Submit" : "Continue"}</span>
      <ArrowRight className="w-4 h-4" />
    </Button>
)}
    
  </div>
);

//5th
//build a animation wrapper with smooth interactions
const AnimationWrapper = ({ children }: { children: React.ReactNode }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-[400px] w-full"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
