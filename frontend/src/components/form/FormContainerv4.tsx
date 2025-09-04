"use client"

import type React from "react"
import { ArrowLeft, ArrowRight, Check, CircleCheck } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import RotatingCompleteButton from "./SubmitButton"

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
  {
    id: "5",
    type: "multipleChoice",
    props: {
      question: "What is your favorite color?",
      options: ["Red", "Blue", "Green", "Yellow", "Purple"],
      required: true,
    },
  },
]

export default function FormContainer({ formId }: { formId: string }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [formContent, setFormContent] = useState<{
    title: string
    description: string
    questions: any[]
  } | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleNext()
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      handleBack()
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      handleNext()
    }
  }

  //this function converts the block note content to questions
  function convertBlockNoteToQuestions(blockNoteContent: any): any {
    const questions: any = []

    blockNoteContent?.forEach((page: any) => {
      console.log("processing page")

      if (page.content && Array.isArray(page.content)) {
        page.content.forEach((block: any) => {
          if (
            ["shortText", "longText", "email", "number", "multipleChoice", "checkbox", "select"].includes(block.type)
          ) {
            questions.push({
              id: block.id,
              type: block.type,
              props: block.props,
            })
          }
        })
      }
    })

    console.log("Question prop:", questions)
    return questions
  }

  const fetchForms = async (formIdAsString: string) => {
    try {
      console.log("formId as string", formIdAsString)
      const response = await fetch(`http://localhost:3001/api/forms/${formIdAsString}`)
      console.log("response from server", response)
      if (response.ok) {
        const formData = await response.json()
        const questions = convertBlockNoteToQuestions(formData.content)
        console.log(questions)
        return {
          title: formData.title,
          description: formData.description,
          questions: questions,
        }
      } else {
        throw new Error("Form not found")
      }
    } catch (error) {
      console.error("Error fetching form:", error)
      return null
    }
  }

  useEffect(() => {
    const loadForm = async () => {
      if (!formId) return

      if (formId === "sample-form") {
        setFormContent({
          title: "Sample Form",
          description: "A demonstration form with various question types",
          questions: sampleQuestions,
        })
        return
      }

      const data = await fetchForms(formId)
      try {
        if (data) {
          setFormContent(data)
        } else {
          console.log("Form not found, using sample questions")
          setFormContent({
            title: "Sample Form",
            description: "A demonstration form with various question types",
            questions: sampleQuestions,
          })
        }
      } catch (error) {
        console.log("Form not found, using sample questions")
        setFormContent({
          title: "Sample Form",
          description: "A demonstration form with various question types",
          questions: sampleQuestions,
        })
      }
    }

    loadForm()
  }, [formId])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [currentPage, isSubmitted])

  const handleChange = (questionId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async () => {
    try {
      if (formId === "sample-form") {
        // For demo purposes, just simulate submission
        console.log("Sample form submitted:", formData)
        setIsSubmitted(true)
        return
      }

      const response = await fetch(`http://localhost:3001/api/responses/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Submission failed:", error)
      setIsSubmitted(true)
    }
  }

  const handleNext = () => {
    if (currentPage < formContent?.questions?.length - 1) {
      console.log("current page", currentPage)
      setCurrentPage((prev) => prev + 1)
    } else {
      handleSubmit()
      setIsSubmitted(true)
      console.log("Form submitted:", formData)
    }
  }

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto ">
      {isSubmitted ? (
        <SuccessScreen />
      ) : (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] p-8">
          <div className="mb-4 md:mb-8">
            <ProgressBar current={currentPage} total={formContent?.questions.length} />
          </div>
          <div className="flex items-center justify-center w-full  h-full">
            <AnimationWrapper key={currentPage}>
              <div className="w-full max-w-4xl">
                <QuestionRenderer
                  question={formContent?.questions[currentPage]}
                  value={formData[formContent?.questions[currentPage].id] || ""}
                  onChange={handleChange}
                />
              </div>
            </AnimationWrapper>
          </div>

          <div className="md:pt-8">
            <Navigation
              onBack={handleBack}
              onNext={handleNext}
              showBack={currentPage > 0}
              showNext={true}
              isLast={currentPage >= formContent?.questions.length - 1}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const SuccessScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md mx-auto px-8"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center"
          >
            <CircleCheck className="w-8 h-8 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl font-medium text-gray-900 mb-3"
          >
            Thank you!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-600 leading-relaxed"
          >
            Your response has been recorded. We appreciate you taking the time to share your thoughts with us.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-xs text-gray-400 font-mono"
        >
          Form completed at {new Date().toLocaleTimeString()}
        </motion.div>
      </motion.div>
    </div>
  )
}

const QuestionRenderer = ({
  question,
  value,
  onChange,
}: {
  question: any
  value: any
  onChange: (questionId: string, value: string) => void
}) => {
  if (!question) {
    return <div>Loading question...</div>
  }
  const { type, props } = question
  const { question: label, placeholder, required, options } = props

  switch (question.type) {
    case "shortText":
      return (
        <FancyInput
          label={label}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={placeholder}
        />
      )
    case "email":
      return (
        <FancyInput
          label={label}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={placeholder}
        />
      )
    case "number":
      return (
        <FancyInput
          label={label}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={placeholder}
        />
      )
    case "multipleChoice":
      const getOptionsArrayMultipleChoice = () => {
        return typeof props.options === "string"
          ? props.options
              .split(",")
              .map((opt) => opt.trim())
              .filter((opt) => opt)
          : ["Option 1", "Option 2"]
      }

      const optionsArrayMultipleChoice = getOptionsArrayMultipleChoice()

      return (
        <FancySelect
          label={label}
          value={value}
          onChange={(selectedValue) => onChange(question.id, selectedValue)}
          options={optionsArrayMultipleChoice}
        />
      )
    case "select":
      return (
        <FancySelect
          label={label}
          value={value}
          onChange={(selectedValue) => onChange(question.id, selectedValue)}
          options={options}
        />
      )
    case "textarea":
      return (
        <FancyTextArea
          label={label}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={placeholder}
        />
      )
    case "longText":
      return (
        <FancyTextArea
          label={label}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={placeholder}
        />
      )
    case "checkbox":
      // Convert string options to array
      const checkboxOptionsArray =
        typeof options === "string"
          ? options
              .split(",")
              .map((opt) => opt.trim())
              .filter((opt) => opt)
          : options || []

      // Parse current value as array
      const currentCheckboxValue = value
        ? typeof value === "string"
          ? value.split(",").map((v) => v.trim())
          : value
        : []

      return (
        <FancyCheckbox
          label={label}
          value={currentCheckboxValue}
          onChange={(selectedValues) => onChange(question.id, selectedValues.join(","))}
          options={checkboxOptionsArray}
        />
      )
    default:
      return null
  }
}

const ProgressBar = ({
  current,
  total,
}: {
  current: number
  total: number
}) => (
  <div className="fixed top-0 left-0 w-full z-10 bg-white/80 backdrop-blur-sm">
    <div className="h-1 bg-gray-100 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </div>
)

// Text Input
const FancyInput = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="mb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <label className="block text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-balance leading-tight">
          {label}
          <motion.span animate={{ opacity: isFocused ? 1 : 0.6 }} className="text-purple-500 ml-2">
            *
          </motion.span>
        </label>

        <div className="relative">
          <motion.input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full text-xl px-0 py-4 bg-transparent border-0 border-b-3 border-gray-200 focus:border-purple-500 focus:outline-none transition-all duration-300 placeholder:text-gray-400"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: isFocused ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// Select (Button Style)
const FancySelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) => (
  <div className="mb-12">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <label className="block text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-balance leading-tight">
        {label}
      </label>
      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={option}
            onClick={() => onChange(option)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02, x: 8 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 text-lg font-medium ${
              value === option
                ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg shadow-purple-100"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-25 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {value === option && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  </div>
)

// Textarea
const FancyTextArea = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="mb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <label className="block text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-balance leading-tight">
          {label}
          <motion.span animate={{ opacity: isFocused ? 1 : 0.6 }} className="text-purple-500 ml-2">
            *
          </motion.span>
        </label>

        <div className="relative">
          <motion.textarea
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={4}
            className="w-full text-xl p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none placeholder:text-gray-400 bg-white"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{
              boxShadow: isFocused ? "0 0 0 3px rgba(168, 85, 247, 0.1)" : "0 0 0 0px rgba(168, 85, 247, 0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// Checkbox
const FancyCheckbox = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string[]
  onChange: (selectedValues: string[]) => void
  options: string[]
}) => {
  const selectedValues = Array.isArray(value)
    ? value
    : typeof value === "string" && value
      ? value.split(",").map((v) => v.trim())
      : []

  const handleCheckboxChange = (option: string, isChecked: boolean) => {
    let newSelectedValues
    if (isChecked) {
      newSelectedValues = [...selectedValues, option]
    } else {
      newSelectedValues = selectedValues.filter((val) => val !== option)
    }
    onChange(newSelectedValues)
  }

  return (
    <div className="mb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <label className="block text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-balance leading-tight">
          {label}
        </label>
        <div className="space-y-3">
          {options.map((option, index) => {
            const isChecked = selectedValues.includes(option)
            return (
              <motion.button
                key={option}
                onClick={() => handleCheckboxChange(option, !isChecked)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, x: 8 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 w-full text-left ${
                  isChecked
                    ? "border-purple-500 bg-purple-50 shadow-lg shadow-purple-100"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-25 hover:shadow-md"
                }`}
              >
                <motion.div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                    isChecked ? "bg-purple-500 border-purple-500" : "border-gray-300 bg-white"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: isChecked ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                </motion.div>
                <span className={`text-lg font-medium ${isChecked ? "text-purple-700" : "text-gray-900"}`}>
                  {option}
                </span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

const Navigation = ({
  onBack,
  onNext,
  showBack,
  showNext,
  isLast,
}: {
  onBack: () => void
  onNext: () => void
  showBack: boolean
  showNext: boolean
  isLast: boolean
}) => (
  <div className="flex justify-between pt-8 border-t border-gray-100">
    <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        onClick={onBack}
        disabled={!showBack}
        className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Back</span>
      </Button>
    </motion.div>

    {isLast ? (
      <RotatingCompleteButton onClick={() => onNext()} />
    ) : (
      <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onNext}
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    )}
  </div>
)

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
)
