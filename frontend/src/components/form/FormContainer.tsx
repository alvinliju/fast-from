"use client";
import { useState } from "react";
import { FormConfig, sampleQuestions } from "../../data/questions";
import { Question } from "../../data/questions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { div } from "motion/react-client";

const formConfig: FormConfig = {
  id: "1",
  title: "Developer Application Form",
  questions: sampleQuestions,
};

export default function FormContainer() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1>{formConfig.title}</h1>
        <div>
          {isSubmitted ? (
            <div>
              <h2>Form Submitted</h2>
              <p>Thank you for submitting the form.</p>
            </div>
          ) : (
            
            <div>
<QuestionRenderer
                question={formConfig.questions[currentQuestion]}
                formData={formData}
                handleChange={handleChange}
              />
              {currentQuestion > 0 && (
                <Button onClick={handlePrevious}>Previous</Button>
              )}
              {currentQuestion < formConfig.questions.length - 1 && (
                <Button onClick={handleNext}>Next</Button>
              )}
              {currentQuestion == formConfig.questions.length - 1 && (
                <Button onClick={handleSubmit}>Submit</Button>
              )}

            </div>
           

 
          )}
        </div>
      </div>
    </div>
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
