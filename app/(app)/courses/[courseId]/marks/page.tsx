'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Upload,
  FileUp,
  FileSpreadsheet,
  Download,
  Check,
  X,
  Save,
  ChevronRight,
  Users,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface StudentMark {
  rollNumber: string
  name: string
  marks: Record<string, number>
  total: number
  percentage: number
}

const mockStudents: StudentMark[] = [
  { rollNumber: 'CS001', name: 'Alice Johnson', marks: { Q1: 4, Q2: 8, Q3: 5 }, total: 17, percentage: 85 },
  { rollNumber: 'CS002', name: 'Bob Smith', marks: { Q1: 5, Q2: 7, Q3: 4 }, total: 16, percentage: 80 },
  { rollNumber: 'CS003', name: 'Carol Williams', marks: { Q1: 3, Q2: 9, Q3: 5 }, total: 17, percentage: 85 },
  { rollNumber: 'CS004', name: 'David Brown', marks: { Q1: 4, Q2: 6, Q3: 3 }, total: 13, percentage: 65 },
  { rollNumber: 'CS005', name: 'Eva Martinez', marks: { Q1: 5, Q2: 10, Q3: 5 }, total: 20, percentage: 100 },
]

const questions = [
  { id: 'Q1', maxMarks: 5 },
  { id: 'Q2', maxMarks: 10 },
  { id: 'Q3', maxMarks: 5 },
]

export default function MarksPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const courseId = params.courseId as string
  const examId = searchParams.get('exam')

  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload')
  const [students, setStudents] = useState<StudentMark[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isParsed, setIsParsed] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingCell, setEditingCell] = useState<{ roll: string; question: string } | null>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
      setUploadedFile(file)
      processFile(file)
    }
  }, [])

  const processFile = async (file: File) => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStudents(mockStudents)
    setIsProcessing(false)
    setIsParsed(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleMarkChange = (rollNumber: string, questionId: string, value: number) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.rollNumber === rollNumber) {
          const newMarks = { ...student.marks, [questionId]: value }
          const total = Object.values(newMarks).reduce((a, b) => a + b, 0)
          const maxTotal = questions.reduce((a, q) => a + q.maxMarks, 0)
          return {
            ...student,
            marks: newMarks,
            total,
            percentage: Math.round((total / maxTotal) * 100),
          }
        }
        return student
      })
    )
  }

  const totalStudents = students.length
  const passedStudents = students.filter((s) => s.percentage >= 40).length
  const averageScore = students.length
    ? Math.round(students.reduce((a, s) => a + s.percentage, 0) / students.length)
    : 0

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
          <h1 className="text-2xl font-bold text-foreground">Student Marks Entry</h1>
          <p className="text-muted-foreground mt-1">Upload or enter student marks for attainment calculation</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
          {students.length > 0 && (
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Marks
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      {students.length > 0 && (
        <div className="flex gap-4">
          <div className="flex-1 bg-background border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-background border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {passedStudents}/{totalStudents}
                </p>
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-background border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{averageScore}%</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Average Score</p>
                <Progress value={averageScore} className="h-1.5 w-20 mt-1" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Data Entry / Table */}
        <div className="flex-1">
          {students.length === 0 ? (
            <div className="bg-background border border-border/50 rounded-xl p-6">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upload' | 'manual')}>
                <TabsList className="mb-6">
                  <TabsTrigger value="upload" className="gap-2">
                    <Upload className="w-4 h-4" />
                    File Upload
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="gap-2">
                    <Users className="w-4 h-4" />
                    Manual Entry
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload">
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
                        'border-2 border-dashed rounded-xl p-16 text-center transition-all',
                        isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      )}
                    >
                      <input
                        type="file"
                        id="marks-upload"
                        className="hidden"
                        accept=".xlsx,.csv"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setUploadedFile(file)
                            processFile(file)
                          }
                        }}
                      />
                      <label htmlFor="marks-upload" className="cursor-pointer">
                        <FileSpreadsheet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground">Drop your marks file here</h3>
                        <p className="text-muted-foreground mt-1">or click to browse</p>
                        <p className="text-sm text-muted-foreground mt-4">
                          Supports Excel (.xlsx) and CSV files
                        </p>
                      </label>
                    </div>
                  ) : isProcessing ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <FileSpreadsheet className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">Processing file...</h3>
                      <p className="text-muted-foreground mt-1">Parsing student marks data</p>
                      <Progress value={66} className="h-2 max-w-xs mx-auto mt-4" />
                    </div>
                  ) : null}
                </TabsContent>

                <TabsContent value="manual">
                  <div className="text-center py-16">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground">Manual Entry Coming Soon</h3>
                    <p className="text-muted-foreground mt-1">
                      Use file upload for now, or download the template to fill in marks
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="bg-background border border-border/50 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{uploadedFile?.name}</span>
                  <Badge variant="secondary">{students.length} students</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setUploadedFile(null)
                    setStudents([])
                    setIsParsed(false)
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="p-3 text-left text-sm font-medium text-foreground sticky left-0 bg-muted/30 z-10">
                        Roll No.
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-foreground">Name</th>
                      {questions.map((q) => (
                        <th key={q.id} className="p-3 text-center text-sm font-medium text-foreground">
                          {q.id}
                          <span className="text-xs text-muted-foreground block">({q.maxMarks})</span>
                        </th>
                      ))}
                      <th className="p-3 text-center text-sm font-medium text-foreground">Total</th>
                      <th className="p-3 text-center text-sm font-medium text-foreground">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr
                        key={student.rollNumber}
                        className={cn(
                          'border-t border-border/30',
                          index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                        )}
                      >
                        <td className="p-3 text-sm font-medium text-foreground sticky left-0 bg-inherit z-10">
                          {student.rollNumber}
                        </td>
                        <td className="p-3 text-sm text-foreground">{student.name}</td>
                        {questions.map((q) => (
                          <td key={q.id} className="p-2 text-center">
                            {editingCell?.roll === student.rollNumber &&
                            editingCell?.question === q.id ? (
                              <Input
                                type="number"
                                value={student.marks[q.id]}
                                onChange={(e) =>
                                  handleMarkChange(student.rollNumber, q.id, parseInt(e.target.value) || 0)
                                }
                                onBlur={() => setEditingCell(null)}
                                className="w-16 h-8 text-center"
                                min={0}
                                max={q.maxMarks}
                                autoFocus
                              />
                            ) : (
                              <button
                                onClick={() =>
                                  setEditingCell({ roll: student.rollNumber, question: q.id })
                                }
                                className={cn(
                                  'w-12 h-8 rounded text-sm font-medium transition-colors',
                                  student.marks[q.id] >= q.maxMarks * 0.6
                                    ? 'bg-accent/10 text-accent'
                                    : student.marks[q.id] >= q.maxMarks * 0.4
                                    ? 'bg-muted text-foreground'
                                    : 'bg-destructive/10 text-destructive'
                                )}
                              >
                                {student.marks[q.id]}
                              </button>
                            )}
                          </td>
                        ))}
                        <td className="p-3 text-center text-sm font-semibold text-foreground">
                          {student.total}
                        </td>
                        <td className="p-3 text-center">
                          <Badge
                            variant={student.percentage >= 40 ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {student.percentage}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {students.length > 0 && (
          <div className="w-80 space-y-4">
            <div className="bg-background border border-border/50 rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href={`/courses/${courseId}/co-attainment`}>
                    Calculate CO Attainment
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href={`/courses/${courseId}/po-attainment`}>
                    View PO Attainment
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Warnings */}
            {students.filter((s) => s.percentage < 40).length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-center gap-2 text-amber-700 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-semibold">Low Performance Alert</h3>
                </div>
                <p className="text-sm text-amber-600">
                  {students.filter((s) => s.percentage < 40).length} students have scored below passing marks.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
