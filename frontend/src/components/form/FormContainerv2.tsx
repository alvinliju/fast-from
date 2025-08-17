
"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
//building the form builder from scratch

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import FormPage from "@/app/form/page";
import { sampleQuestions } from "@/data/questions";

const colors = {
    primary: '#3B82F6',    // Blue-500
    secondary: '#8B5CF6',  // Purple-500  
    text: '#1F2937',       // Gray-800
    textLight: '#6B7280',  // Gray-500
    border: '#E5E7EB',     // Gray-200
    background: '#F9FAFB'  // Gray-50
  }

  const spacing = {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px  
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem'       // 48px
  }

//build the core strucure with following states:
// currentPages
// responses
// isSubmitted

export default function FormPlayerv2(){
    const [currentPage, setCurrentPage] = useState(0);
    const [responses, setResponses] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onBack = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    const onNext = () => {
        if (currentPage < sampleQuestions.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setIsSubmitted(true);
        }
    }
    const showBack = currentPage > 0;
    const showNext = currentPage < sampleQuestions.length - 1;
    const isLast = currentPage === sampleQuestions.length - 1;

    // Get the current page's questions
    const currentPageQuestions = sampleQuestions[currentPage]?.content || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto py-16 px-6">
            {!isSubmitted ? (
          <>
            <ProgressBar current={currentPage + 1} total={sampleQuestions.length} />
            <AnimationWrapper>
              <div className="space-y-12">
                {currentPageQuestions.map((question, questionIndex) => (
                  <FormPage 
                    key={question.id}
                    page={question} 
                  />
                ))}
              </div>
            </AnimationWrapper>
            <Navigation onBack={onBack} onNext={onNext} showBack={showBack} showNext={showNext} isLast={isLast} />
          </>
        ) : (
          <div>
            <h1>Form Submitted</h1>
            <p>Thank you for submitting the form.</p>
          </div>
        )}  
            </div>
        </div>
    )
}

//2nd component
//tally style porgress bar
//just get the amount of pages - currentpage to build it
const ProgressBar = ({ current, total }:{current:number, total:number}) => (
    <div className="mb-12">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{current} of {total}</span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
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
const FancyInput = ({ label, value, onChange, placeholder }:{label:string, value:string, onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void, placeholder:string}) => (
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
  const FancySelect = ({ label, value, onChange, options }:{label:string, value:string, onChange:(value:string)=>void, options:string[]}) => (
    <div className="mb-8">
      <label className="block text-xl font-medium text-gray-800 mb-4">
        {label}
      </label>
      <div className="space-y-3">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              value === option 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
  
  // Textarea
  const FancyTextArea = ({ label, value, onChange, placeholder }:{label:string, value:string, onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void, placeholder:string}) => (
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
  const FancyCheckbox = ({ label, checked, onChange }:{label:string, checked:boolean, onChange:(checked:boolean)=>void}) => (
    <div className="mb-8">
      <button
        onClick={() => onChange(!checked)}
        className="flex items-center space-x-4 p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all w-full text-left"
      >
        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
          checked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
        }`}>
          {checked && <Check className="w-4 h-4 text-white" />}
        </div>
        <span className="text-lg font-medium text-gray-800">{label}</span>
      </button>
    </div>
  );

//4th component
//basic naviagations
//back, next, submit buttons and logic
const Navigation = ({ onBack, onNext, showBack, showNext, isLast }:{onBack:()=>void, onNext:()=>void, showBack:boolean, showNext:boolean, isLast:boolean}) => (
    <div className="flex justify-between pt-8 border-t border-gray-200">
      <button
        onClick={onBack}
        disabled={!showBack}
        className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>
  
      <button
        onClick={onNext}
        className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <span>{isLast ? 'Submit' : 'Continue'}</span>
        {isLast ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );

//5th 
//build a animation wrapper with smooth interactions
const AnimationWrapper = ({ children }:{children:React.ReactNode}) => (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="min-h-[400px]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );