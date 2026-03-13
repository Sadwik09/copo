'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  ChevronRight,
  BookOpen,
  Target,
  FileText,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { useCourseStore } from '@/store/course-store'
import { cn } from '@/lib/utils'
import type { Course } from '@/types'

// Mock courses for demo
const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Database Management Systems',
    code: 'CS401',
    credits: 4,
    semester: 4,
    department: 'Computer Science',
    description: 'Fundamentals of database design and management',
    courseOutcomes: [
      { id: '1', code: 'CO1', description: 'Understand database concepts', bloomLevel: 'Understand', poMappings: [], psoMappings: [] },
      { id: '2', code: 'CO2', description: 'Design ER diagrams', bloomLevel: 'Apply', poMappings: [], psoMappings: [] },
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20',
  },
  {
    id: '2',
    name: 'Operating Systems',
    code: 'CS402',
    credits: 4,
    semester: 4,
    department: 'Computer Science',
    description: 'Process management, memory management, file systems',
    courseOutcomes: [
      { id: '1', code: 'CO1', description: 'Understand OS concepts', bloomLevel: 'Understand', poMappings: [], psoMappings: [] },
    ],
    createdAt: '2024-01-20',
    updatedAt: '2024-02-25',
  },
  {
    id: '3',
    name: 'Computer Networks',
    code: 'CS403',
    credits: 3,
    semester: 5,
    department: 'Computer Science',
    description: 'Network protocols, TCP/IP, routing algorithms',
    courseOutcomes: [],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-28',
  },
  {
    id: '4',
    name: 'Machine Learning',
    code: 'CS501',
    credits: 4,
    semester: 6,
    department: 'Computer Science',
    description: 'Supervised and unsupervised learning algorithms',
    courseOutcomes: [
      { id: '1', code: 'CO1', description: 'Implement ML algorithms', bloomLevel: 'Apply', poMappings: [], psoMappings: [] },
      { id: '2', code: 'CO2', description: 'Evaluate model performance', bloomLevel: 'Evaluate', poMappings: [], psoMappings: [] },
      { id: '3', code: 'CO3', description: 'Design neural networks', bloomLevel: 'Create', poMappings: [], psoMappings: [] },
    ],
    createdAt: '2024-02-10',
    updatedAt: '2024-03-01',
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSemester, setSelectedSemester] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { createCourse } = useCourseStore()

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSemester = selectedSemester === 'all' || course.semester.toString() === selectedSemester
    return matchesSearch && matchesSemester
  })

  const handleDeleteCourse = async () => {
    if (!selectedCourse) return
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setCourses(courses.filter((c) => c.id !== selectedCourse.id))
    setIsDeleteDialogOpen(false)
    setSelectedCourse(null)
    setIsLoading(false)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-1">Manage your courses and track CO-PO attainment</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Course
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>
        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-40 bg-muted/50">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <SelectItem key={sem} value={sem.toString()}>
                Semester {sem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course List - Timeline Layout */}
      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed border-border">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">No courses found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery ? 'Try adjusting your search' : 'Start by adding your first course'}
            </p>
          </div>
        ) : (
          filteredCourses.map((course, index) => (
            <CourseItem
              key={course.id}
              course={course}
              index={index}
              onEdit={() => {
                setSelectedCourse(course)
                setIsCreateDialogOpen(true)
              }}
              onDelete={() => {
                setSelectedCourse(course)
                setIsDeleteDialogOpen(true)
              }}
            />
          ))
        )}
      </div>

      {/* Create/Edit Dialog */}
      <CreateCourseDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        course={selectedCourse}
        onSave={async (data) => {
          setIsLoading(true)
          await new Promise((resolve) => setTimeout(resolve, 500))
          if (selectedCourse) {
            setCourses(courses.map((c) => (c.id === selectedCourse.id ? { ...c, ...data } : c)))
          } else {
            const newCourse: Course = {
              ...data,
              id: Date.now().toString(),
              courseOutcomes: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            } as Course
            setCourses([...courses, newCourse])
          }
          setIsCreateDialogOpen(false)
          setSelectedCourse(null)
          setIsLoading(false)
        }}
        onClose={() => {
          setSelectedCourse(null)
          setIsCreateDialogOpen(false)
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{selectedCourse?.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CourseItem({
  course,
  index,
  onEdit,
  onDelete,
}: {
  course: Course
  index: number
  onEdit: () => void
  onDelete: () => void
}) {
  const coCount = course.courseOutcomes.length
  const mappedCOs = course.courseOutcomes.filter((co) => co.poMappings.length > 0).length
  const progress = coCount > 0 ? (mappedCOs / coCount) * 100 : 0

  return (
    <div className="bg-background border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all duration-200 group">
      <div className="flex items-start gap-6">
        {/* Index Badge */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <Link
                href={`/courses/${course.id}`}
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
              >
                {course.name}
              </Link>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {course.code}
                </span>
                <span className="text-sm text-muted-foreground">Semester {course.semester}</span>
                <span className="text-sm text-muted-foreground">{course.credits} Credits</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/courses/${course.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Course
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {course.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-1">{course.description}</p>
          )}

          {/* Progress Indicators */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {coCount} Course Outcome{coCount !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">
                {course.syllabus ? 'Syllabus uploaded' : 'No syllabus'}
              </span>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">CO-PO Mapping</span>
                <span className="font-medium text-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-2 shrink-0">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/courses/${course.id}/syllabus`}>
              Syllabus
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/courses/${course.id}/generate-co`}>
              Generate CO
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function CreateCourseDialog({
  open,
  onOpenChange,
  course,
  onSave,
  onClose,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: Course | null
  onSave: (data: Partial<Course>) => Promise<void>
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: 3,
    semester: 1,
    department: 'Computer Science',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        code: course.code,
        credits: course.credits,
        semester: course.semester,
        department: course.department,
        description: course.description || '',
      })
    } else {
      setFormData({
        name: '',
        code: '',
        credits: 3,
        semester: 1,
        department: 'Computer Science',
        description: '',
      })
    }
  }, [course, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onSave(formData)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{course ? 'Edit Course' : 'Create New Course'}</DialogTitle>
          <DialogDescription>
            {course ? 'Update the course details below.' : 'Fill in the details to create a new course.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Database Management Systems"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., CS401"
                required
              />
            </div>
            <div className="w-24 space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Select
                value={formData.credits.toString()}
                onValueChange={(value) => setFormData({ ...formData, credits: parseInt(value) })}
              >
                <SelectTrigger id="credits">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((c) => (
                    <SelectItem key={c} value={c.toString()}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={formData.semester.toString()}
                onValueChange={(value) => setFormData({ ...formData, semester: parseInt(value) })}
              >
                <SelectTrigger id="semester">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <SelectItem key={s} value={s.toString()}>
                      Semester {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger id="department">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the course..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
