"use client"

import { useState, useEffect, use } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Search, Calendar, User, Mail } from "lucide-react"
import { useParams } from "next/navigation"

interface Question {
  id: string
  type: string
  props: {
    question: string
    options?: string[]
  }
}

interface Submission {
  id: string
  submittedAt: string
  responses: Record<string, string>
}

export default function SubmissionPage({params}: {params: Promise<{id: string}>}) {

  const { id } = use(params)

  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const extractQuestionsFromForm = (formData: any): Question[] => {
    const questions: Question[] = []
    
    // Your form structure: formData.content is an array of pages
    // Each page has a content array with question blocks
    formData.content?.forEach((page: any) => {
      page.content?.forEach((block: any) => {
        // Check if it's a question block
        if (['shortText', 'longText', 'email', 'number', 'multipleChoice', 'checkbox'].includes(block.type)) {
          questions.push({
            id: block.id, // This matches your response data keys!
            type: block.type,
            props: {
              question: block.props.question || 'Untitled Question',
              options: block.props.options || []
            }
          })
        }
      })
    })
    
    return questions
  }

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      
      const formId = id
      
      // Fetch both form structure and responses
      const [formResponse, responsesResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/forms/${formId}`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/responses/${formId}`)
      ])
      
      const formData = await formResponse.json()
      const apiResponses = await responsesResponse.json()
      
      console.log('Form data:', formData)
      console.log('API responses:', apiResponses)
      
      // Extract questions from form structure
      const extractedQuestions = extractQuestionsFromForm(formData)
      setQuestions(extractedQuestions)
      
      // Transform your API data to dashboard format
      const transformedSubmissions = apiResponses
        .filter(response => response.data && Object.keys(response.data).length > 0)
        .map(response => ({
          id: response.id,
          submittedAt: response.created_at,
          responses: response.data // Perfect! Already in the right format
        }))
      
      console.log('Extracted questions:', extractedQuestions)
      console.log('Transformed submissions:', transformedSubmissions)
      
      setSubmissions(transformedSubmissions)
      
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSubmissions = submissions.filter((submission) =>
    Object.values(submission.responses).some((response) => response.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const exportToCSV = () => {
    const headers = ["Submission ID", "Submitted At", ...questions.map((q) => q.props.question)]
    const rows = filteredSubmissions.map((submission) => [
      submission.id,
      formatDate(submission.submittedAt),
      ...questions.map((q) => submission.responses[q.id] || ""),
    ])

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "form-submissions.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {filteredSubmissions.length} submissions
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
            />
          </div>
          <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Submissions Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 font-medium text-gray-700 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Submitted
                    </div>
                  </th>
                  {questions.map((question) => (
                    <th key={question.id} className="text-left p-4 font-medium text-gray-700 bg-gray-50 min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm">{question.props.question}</span>
                        <Badge variant="outline" className="text-xs w-fit">
                          {question.type}
                        </Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission, index) => (
                  <tr
                    key={submission.id}
                    className={`border-b border-gray-50 hover:bg-gray-25 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4 text-sm text-gray-600 font-mono">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">{submission.id}</span>
                        <span>{formatDate(submission.submittedAt)}</span>
                      </div>
                    </td>
                    {questions.map((question) => (
                      <td key={question.id} className="p-4 text-sm text-gray-900">
                        <div className="max-w-xs">
                          {question.type === "email" ? (
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span className="truncate">{submission.responses[question.id] || "-"}</span>
                            </div>
                          ) : question.type === "multipleChoice" || question.type === "checkbox" ? (
                            <div className="flex flex-wrap gap-1">
                              {(submission.responses[question.id] || "")
                                .split(",")
                                .filter(Boolean)
                                .map((option, optionIndex) => (
                                  <Badge key={optionIndex} variant="secondary" className="text-xs">
                                    {option.trim()}
                                  </Badge>
                                ))}
                            </div>
                          ) : question.type === "longText" ? (
                            <div className="max-w-xs">
                              <p className="text-sm text-gray-900 line-clamp-2">
                                {submission.responses[question.id] || "-"}
                              </p>
                            </div>
                          ) : (
                            <span className="truncate block">{submission.responses[question.id] || "-"}</span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try adjusting your search terms" : "No form submissions have been received yet"}
          </p>
        </div>
      )}
    </div>
  )
}
