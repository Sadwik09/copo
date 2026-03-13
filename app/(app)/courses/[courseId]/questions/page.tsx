'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Plus,
  Upload,
  FileUp,
  FileText,
  Sparkles,
  Edit2,
  Trash2,
  ChevronRight,
  Check,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { Question, BloomLevel } from '@/types'

const bloomLevels: BloomLevel[] = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create']
const mockCOs = ['CO1', 'CO2', 'CO3', 'CO4', 'CO5']

const mockQuestions: Question[] = [
  {
    id: '1',
    examId: '1',
    questionNumber: '1',
    text: 'Define database and explain the characteristics of a database management system.',
    maxMarks: 5,
    coMapping: ['CO1'],
    bloomLevel: 'Understand',
  },
  {
    id: '2',
    examId: '1',
    questionNumber: '2',
    text: 'Design an ER diagram for a university library management system with entities: Books, Students, Borrowings.',
    maxMarks: 10,
    coMapping: ['CO2'],
    bloomLevel: 'Apply',
  },
  {
    id: '3',
    examId: '1',
    questionNumber: '3',
    text: 'Write SQL queries to: a) Find all students who borrowed more than 3 books, b) List books never borrowed',
    maxMarks: 5,
    coMapping: ['CO3'],
    bloomLevel: 'Apply',
  },
]

export default function QuestionsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const courseId = params.courseId as string
  const examId = searchParams.get('exam')

  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [activeTab, setActiveTab] = useState<'manual' | 'upload'>('manual')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<Question[] | null>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setUploadedFile(file)
      handleAnalyze(file)
    }
  }, [])

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock extraction results
    setAnalysisResults([
      {
        id: 'new-1',
        examId: examId || '1',
        questionNumber: '4',
        text: 'Explain the concept of normalization and describe the various normal forms with examples.',
        maxMarks: 10,
        coMapping: ['CO4'],
        bloomLevel: 'Analyze',
      },
      {
        id: 'new-2',
        examId: examId || '1',
        questionNumber: '5',
        text: 'Compare and contrast different indexing techniques used in database systems.',
        maxMarks: 8,
        coMapping: ['CO4', 'CO5'],
        bloomLevel: 'Evaluate',
      },
    ])
    setIsAnalyzing(false)
  }

  const handleAddExtractedQuestions = () => {
    if (analysisResults) {
      setQuestions([...questions, ...analysisResults])
      setAnalysisResults(null)
      setUploadedFile(null)
    }
  }

  const handleDelete = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  return (
    <div className="p-8 space-y-6">
      {/* Back Link */}
      <Link
        href={`/courses/${courseId}/exams`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Exams
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Question Management</h1>
          <p className="text-muted-foreground mt-1">Add questions and map them to course outcomes</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Questions List */}
        <div className="flex-1 space-y-4">
          <div className="bg-background border border-border/50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Questions ({questions.length})
            </h2>
            {questions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No questions added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    index={index}
                    onEdit={() => {
                      setSelectedQuestion(question)
                      setIsDialogOpen(true)
                    }}
                    onDelete={() => handleDelete(question.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upload Panel */}
        <div className="w-96 space-y-4">
          <div className="bg-background border border-border/50 rounded-xl p-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'manual' | 'upload')}>
              <TabsList className="w-full">
                <TabsTrigger value="manual" className="flex-1">Manual</TabsTrigger>
                <TabsTrigger value="upload" className="flex-1">Upload</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Click &quot;Add Question&quot; to manually enter questions one by one.
                </p>
                <Button onClick={() => setIsDialogOpen(true)} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </TabsContent>

              <TabsContent value="upload" className="mt-4">
                {!uploadedFile ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsDragging(true)
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault()
                      setIsDragging(false)
                    }}
                    onDrop={handleDrop}
                    className={cn(
                      'border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer',
                      isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    )}
                  >
                    <input
                      type="file"
                      id="question-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setUploadedFile(file)
                          handleAnalyze(file)
                        }
                      }}
                    />
                    <label htmlFor="question-upload" className="cursor-pointer">
                      <FileUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground">Drop question paper here</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF or Word document</p>
                    </label>
                  </div>
                ) : isAnalyzing ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Analyzing questions...</p>
                    <p className="text-xs text-muted-foreground mt-1">Extracting and mapping to COs</p>
                  </div>
                ) : analysisResults ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-accent">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {analysisResults.length} questions extracted
                      </span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {analysisResults.map((q) => (
                        <div key={q.id} className="p-3 rounded-lg bg-muted/30 text-sm">
                          <span className="font-medium">Q{q.questionNumber}:</span> {q.text.slice(0, 60)}...
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setUploadedFile(null)
                          setAnalysisResults(null)
                        }}
                      >
                        Cancel
                      </Button>
                      <Button className="flex-1" onClick={handleAddExtractedQuestions}>
                        Add All
                      </Button>
                    </div>
                  </div>
                ) : null}
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Analysis */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">AI Question Analysis</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Automatically detect CO mapping and Bloom&apos;s taxonomy levels for your questions.
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/courses/${courseId}/question-analysis`}>
                Analyze Questions
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Question Dialog */}
      <QuestionDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setSelectedQuestion(null)
        }}
        question={selectedQuestion}
        onSave={async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 300))
          if (selectedQuestion) {
            setQuestions(questions.map((q) => (q.id === selectedQuestion.id ? { ...q, ...data } : q)))
          } else {
            const newQuestion: Question = {
              ...data,
              id: Date.now().toString(),
              examId: examId || '1',
            } as Question
            setQuestions([...questions, newQuestion])
          }
          setIsDialogOpen(false)
          setSelectedQuestion(null)
        }}
      />
    </div>
  )
}

function QuestionItem({
  question,
  index,
  onEdit,
  onDelete,
}: {
  question: Question
  index: number
  onEdit: () => void
  onDelete: () => void
}) {
  const bloomColors: Record<BloomLevel, string> = {
    Remember: 'bg-slate-100 text-slate-700',
    Understand: 'bg-blue-100 text-blue-700',
    Apply: 'bg-emerald-100 text-emerald-700',
    Analyze: 'bg-amber-100 text-amber-700',
    Evaluate: 'bg-purple-100 text-purple-700',
    Create: 'bg-rose-100 text-rose-700',
  }

  return (
    <div className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all group">
      <div className="flex items-start gap-4">
        <span className="text-lg font-bold text-primary shrink-0">Q{question.questionNumber}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground">{question.text}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="outline">{question.maxMarks} marks</Badge>
            {question.coMapping.map((co) => (
              <Badge key={co} variant="secondary">{co}</Badge>
            ))}
            <Badge className={cn('text-xs', bloomColors[question.bloomLevel])}>
              {question.bloomLevel}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function QuestionDialog({
  open,
  onOpenChange,
  question,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  question: Question | null
  onSave: (data: Partial<Question>) => Promise<void>
}) {
  const [formData, setFormData] = useState({
    questionNumber: question?.questionNumber || '',
    text: question?.text || '',
    maxMarks: question?.maxMarks || 5,
    coMapping: question?.coMapping || [],
    bloomLevel: question?.bloomLevel || 'Understand' as BloomLevel,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onSave(formData)
    setIsSubmitting(false)
  }

  const toggleCO = (co: string) => {
    setFormData((prev) => ({
      ...prev,
      coMapping: prev.coMapping.includes(co)
        ? prev.coMapping.filter((c) => c !== co)
        : [...prev.coMapping, co],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{question ? 'Edit Question' : 'Add Question'}</DialogTitle>
          <DialogDescription>Enter the question details and map to course outcomes</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-20 space-y-2">
              <Label htmlFor="qnum">Q No.</Label>
              <Input
                id="qnum"
                value={formData.questionNumber}
                onChange={(e) => setFormData({ ...formData, questionNumber: e.target.value })}
                placeholder="1"
                required
              />
            </div>
            <div className="w-24 space-y-2">
              <Label htmlFor="marks">Marks</Label>
              <Input
                id="marks"
                type="number"
                value={formData.maxMarks}
                onChange={(e) => setFormData({ ...formData, maxMarks: parseInt(e.target.value) })}
                min={1}
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="bloom">Bloom Level</Label>
              <Select
                value={formData.bloomLevel}
                onValueChange={(value) => setFormData({ ...formData, bloomLevel: value as BloomLevel })}
              >
                <SelectTrigger id="bloom">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bloomLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text">Question Text</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="Enter the question..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>CO Mapping</Label>
            <div className="flex flex-wrap gap-2">
              {mockCOs.map((co) => (
                <button
                  key={co}
                  type="button"
                  onClick={() => toggleCO(co)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    formData.coMapping.includes(co)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {co}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : question ? 'Update' : 'Add Question'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
