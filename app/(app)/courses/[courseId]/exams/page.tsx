'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Plus,
  ClipboardList,
  Calendar,
  Edit,
  Trash2,
  MoreHorizontal,
  FileQuestion,
  Users,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { Examination } from '@/types'

const mockExams: Examination[] = [
  {
    id: '1',
    courseId: '1',
    name: 'Internal Assessment 1',
    type: 'internal',
    totalMarks: 20,
    passingMarks: 8,
    date: '2024-02-15',
    questions: [],
  },
  {
    id: '2',
    courseId: '1',
    name: 'Internal Assessment 2',
    type: 'internal',
    totalMarks: 20,
    passingMarks: 8,
    date: '2024-03-20',
    questions: [],
  },
  {
    id: '3',
    courseId: '1',
    name: 'End Semester Examination',
    type: 'external',
    totalMarks: 60,
    passingMarks: 24,
    date: '2024-05-10',
    questions: [],
  },
]

const examTypes = [
  { value: 'internal', label: 'Internal Assessment', color: 'bg-blue-100 text-blue-700' },
  { value: 'external', label: 'External/End Sem', color: 'bg-purple-100 text-purple-700' },
  { value: 'assignment', label: 'Assignment', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'lab', label: 'Lab Exam', color: 'bg-amber-100 text-amber-700' },
]

export default function ExamsPage() {
  const params = useParams()
  const courseId = params.courseId as string

  const [exams, setExams] = useState<Examination[]>(mockExams)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState<Examination | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (examId: string) => {
    setIsDeleting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setExams(exams.filter((e) => e.id !== examId))
    setIsDeleting(false)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Back Link */}
      <Link
        href={`/courses/${courseId}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Course
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Examination Configuration</h1>
          <p className="text-muted-foreground mt-1">Configure exams, set marks distribution, and question structure</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Examination
        </Button>
      </div>

      {/* Exam List */}
      <div className="space-y-4">
        {exams.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed border-border">
            <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">No exams configured</h3>
            <p className="text-muted-foreground mt-1">Start by adding your first examination</p>
            <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Examination
            </Button>
          </div>
        ) : (
          exams.map((exam, index) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              index={index}
              courseId={courseId}
              onEdit={() => {
                setSelectedExam(exam)
                setIsDialogOpen(true)
              }}
              onDelete={() => handleDelete(exam.id)}
            />
          ))
        )}
      </div>

      {/* Create/Edit Dialog */}
      <ExamDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setSelectedExam(null)
        }}
        exam={selectedExam}
        onSave={async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 500))
          if (selectedExam) {
            setExams(exams.map((e) => (e.id === selectedExam.id ? { ...e, ...data } : e)))
          } else {
            const newExam: Examination = {
              ...data,
              id: Date.now().toString(),
              courseId,
              questions: [],
            } as Examination
            setExams([...exams, newExam])
          }
          setIsDialogOpen(false)
          setSelectedExam(null)
        }}
      />
    </div>
  )
}

function ExamCard({
  exam,
  index,
  courseId,
  onEdit,
  onDelete,
}: {
  exam: Examination
  index: number
  courseId: string
  onEdit: () => void
  onDelete: () => void
}) {
  const typeConfig = examTypes.find((t) => t.value === exam.type)

  return (
    <div className="bg-background border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all group">
      <div className="flex items-start gap-6">
        {/* Index */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-foreground">{exam.name}</h3>
            <Badge variant="outline" className={cn('text-xs', typeConfig?.color)}>
              {typeConfig?.label}
            </Badge>
          </div>

          <div className="flex items-center gap-6 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4" />
              {exam.totalMarks} Marks
            </span>
            <span>Pass: {exam.passingMarks} Marks</span>
            {exam.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(exam.date).toLocaleDateString()}
              </span>
            )}
            <span>{exam.questions.length} Questions</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/courses/${courseId}/questions?exam=${exam.id}`}>
              <FileQuestion className="w-4 h-4 mr-2" />
              Questions
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/courses/${courseId}/marks?exam=${exam.id}`}>
              <Users className="w-4 h-4 mr-2" />
              Marks
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Exam
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

function ExamDialog({
  open,
  onOpenChange,
  exam,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  exam: Examination | null
  onSave: (data: Partial<Examination>) => Promise<void>
}) {
  const [formData, setFormData] = useState({
    name: exam?.name || '',
    type: exam?.type || 'internal',
    totalMarks: exam?.totalMarks || 20,
    passingMarks: exam?.passingMarks || 8,
    date: exam?.date || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onSave(formData)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{exam ? 'Edit Examination' : 'Add Examination'}</DialogTitle>
          <DialogDescription>
            Configure the examination details and marks distribution
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Examination Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Internal Assessment 1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Examination Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as Examination['type'] })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                value={formData.totalMarks}
                onChange={(e) => setFormData({ ...formData, totalMarks: parseInt(e.target.value) })}
                min={1}
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="passingMarks">Passing Marks</Label>
              <Input
                id="passingMarks"
                type="number"
                value={formData.passingMarks}
                onChange={(e) => setFormData({ ...formData, passingMarks: parseInt(e.target.value) })}
                min={1}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date (Optional)</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : exam ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
