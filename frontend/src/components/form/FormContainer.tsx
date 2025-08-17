//@ts-nocheck
"use client";
import { useState } from "react";
import { FormConfig, sampleQuestions } from "../../data/questions";
import { Question } from "../../data/questions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { div } from "motion/react-client";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Textarea } from "../ui/textarea";

const formConfig: FormConfig = {
  id: "1",
  title: "Developer Application Form",
  questions: sampleQuestions,
};

// export default function FormContainer() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [formData, setFormData] = useState<Record<string, string>>({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [direction, setDirection] = useState(1);

//   const handleNext = () => {
//     if (currentQuestion == formConfig.questions.length - 1) {
//       handleSubmit();
//     } else {
//       setDirection(1);
//       setCurrentQuestion((prev) => prev + 1);
//     }
//   };
//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setDirection(-1);
//       setCurrentQuestion((prev) => prev - 1);
//     }
//   };

//   const handleSubmit = () => {
//     setIsSubmitted(true);
//     console.log(formData);
//   };
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <div>
//         <h1>{formConfig.title}</h1>
//         <div>
//           {isSubmitted ? (
//             <div>
//               <h2>Form Submitted</h2>
//               <p>Thank you for submitting the form.</p>
//             </div>
//           ) : (
//             <div>
//               <QuestionRenderer
//                 question={formConfig.questions[currentQuestion]}
//                 formData={formData}
//                 handleChange={handleChange}
//               />
//               {currentQuestion > 0 && (
//                 <Button onClick={handlePrevious}>Previous</Button>
//               )}
//               {currentQuestion < formConfig.questions.length - 1 && (
//                 <Button onClick={handleNext}>Next</Button>
//               )}
//               {currentQuestion == formConfig.questions.length - 1 && (
//                 <Button onClick={handleSubmit}>Submit</Button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function FormContainer() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const current
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    if (currentQuestion == formConfig.questions.length - 1) {
      handleSubmit();
    } else {
      setDirection(1);
      setCurrentQuestion((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log(formData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (id:string, value:string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <NotionContainer>
      <div>
        <div>
          {isSubmitted ? (
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">Thank you!</h2>
            <p className="text-gray-600">Your response has been recorded.</p>
          </motion.div>
          ) : (
            <div>
              
              {/* render the form title just once */}
              {currentQuestion == 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-3xl font-medium text-gray-900 mb-2">
                {formConfig.title}
              </h1>
              <p className="text-gray-600">Let's get started</p>
            </motion.div>
          )}

          {/* render the questions */}
          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentQuestion}
                custom={direction}
                initial={(direction) => ({
                  x: direction > 0 ? 100 : -100,
                  opacity: 0
                })}
                animate={{ x: 0, opacity: 1 }}
                exit={(direction) => ({
                  x: direction > 0 ? -100 : 100,
                  opacity: 0
                })}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <NotionQuestionRenderer
                  handleTextAreaChange={handleTextAreaChange}
                  question={formConfig.questions[currentQuestion]}
                  formData={formData}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                  questionNumber={currentQuestion + 1}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* naviagation shit */}
          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              {currentQuestion === formConfig.questions.length - 1 ? (
                <>Submit <Check className="w-4 h-4" /></>
              ) : (
                <>Continue <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
          </div>
          )}
        </div>
      </div>
    </NotionContainer>

  );
}

function QuestionRenderer({
  question,
  handleChange,
  formData,
}: {
  question: Question;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: Record<string, string>;
}) {
  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-4">{question.title}</h2>
      {question.type === "text" && (
        <input
          type="text"
          value={formData[question.id] || ""}
          name={question.id}
          placeholder={question.placeholder}
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
        />
      )}
      {question.type == "email" && (
        <input
          type="email"
          value={formData[question.id] || ""}
          name={question.id}
          placeholder={question.placeholder}
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
        />
      )}

      {question.type == "number" && (
        <Input
          type="number"
          value={formData[question.id] || ""}
          name={question.id}
          placeholder={question.placeholder}
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
        />
      )}

      {question.type == "select" && (
        <Select
          name={question.id}
          value={formData[question.id] || ""}
          onValueChange={(value) =>
            handleChange({
              target: { name: question.id, value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {question.options &&
              question.options.map((option, index) => (
                <SelectItem value={option} key={index}>
                  {option}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

const NotionContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen bg-white font-inter">
    <div className="max-w-3xl mx-auto px-6 py-16">
      {children}
    </div>
  </div>;
};

//notion style input shit
const NotionInput = ({type, value, placeholder, name, onChange}:{type:string, value:string, placeholder:string, name:string, onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void}) => {
  return (
    <div className="group">
      <input 
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      className="w-full text-base px-0 py-3 bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none transition-colors placeholder-gray-400 group-hover:border-gray-300"
      />
    </div>
  )
}

const NotionQuestion = ({ number, title }:{number:string, title:string}) => (
  <div className="mb-8">
    <div className="flex items-start gap-3 mb-6">
      <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded text-sm font-medium flex items-center justify-center text-gray-600">
        {number}
      </span>
      <h2 className="text-xl font-medium text-gray-900 leading-relaxed">
        {title}
      </h2>
    </div>
  </div>
);

function NotionQuestionRenderer({question, handleChange, handleSelectChange, handleTextAreaChange, formData, questionNumber}: {
    question: Question, 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    handleSelectChange: (id: string, value: string) => void, 
    handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, 
    formData: Record<string, string>, 
    questionNumber: number
}) {
  return (
    <div className="mb-8">
      <NotionQuestion number={questionNumber.toString()} title={question.props.question} />
      {question.type === "shortText" && (
        <NotionInput type="text" value={formData[question.id] || ""} placeholder={question.props.placeholder} name={question.id} onChange={handleChange} />
      )}
      {question.type === "longText" && (
        <NotionTextArea value={formData[question.id] || ""} placeholder={question.props.placeholder} name={question.id} onChange={handleTextAreaChange} />
      )}
      {question.type === "email" && (
        <NotionInput type="email" value={formData[question.id] || ""} placeholder={question.props.placeholder} name={question.id} onChange={handleChange} />
      )}
      {question.type === "number" && (
        <NotionInput type="number" value={formData[question.id] || ""} placeholder={question.props.placeholder} name={question.id} onChange={handleChange} />
      )}
      {question.type === "select" && (
        <NotionSelect value={formData[question.id] || ""} onValueChange={(value) => handleSelectChange(question.id, value)} options={question.props.options || []} placeholder={question.props.question} />
      )}
    </div>
  )
}

const NotionSelect = ({
  value,
  onValueChange,
  options,
  placeholder,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full text-lg px-0 py-4 bg-transparent  focus:border-gray-600 focus:outline-none transition-all duration-200 hover:border-gray-300 p-4">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border border-gray-200 rounded-lg shadow-lg">
        {options.map((option, index) => (
          <SelectItem key={index} value={option} className="py-3 text-base hover:bg-gray-50">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const NotionTextArea = ({value, placeholder, name, onChange}:{value:string, placeholder:string, name:string, onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void}) => {
  return (
    <div className="group">
    <Textarea 
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      className="w-full text-base  bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none transition-colors placeholder-gray-400 group-hover:border-gray-300 resize-none"
    ></Textarea>
  </div>
  )
}