'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Target,
  Brain,
  ClipboardList,
  FileQuestion,
  Users,
  BarChart3,
  ChevronRight,
  Edit,
  Calendar,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Mock course data
const mockCourse = {
  id: '1',
  name: 'Database Management Systems',
  code: 'CS401',
  credits: 4,
  semester: 4,
  department: 'Computer Science',
  description:
    'This course covers the fundamentals of database design, implementation, and management. Topics include ER modeling, relational algebra, SQL, normalization, transaction processing, and database administration.',
  syllabus: `Unit 1: Introduction to DBMS
- Database concepts and architecture
- Data models and schemas
- Database users and administrators

Unit 2: ER Modeling
- Entity-Relationship diagrams
- Cardinality and participation
- Enhanced ER concepts

Unit 3: Relational Model
- Relational algebra
- SQL fundamentals
- Advanced SQL queries`,
  courseOutcomes: [
    {
      id: '1',
      code: 'CO1',
      description: 'Understand fundamental database concepts and DBMS architecture',
      bloomLevel: 'Understand',
      poMappings: [
        { poCode: 'PO1', strength: 3 },
        { poCode: 'PO2', strength: 2 },
      ],
    },
    {
      id: '2',
      code: 'CO2',
      description: 'Design and implement ER diagrams for real-world problems',
      bloomLevel: 'Apply',
      poMappings: [
        { poCode: 'PO1', strength: 2 },
        { poCode: 'PO3', strength: 3 },
      ],
    },
    {
      id: '3',
      code: 'CO3',
      description: 'Write complex SQL queries for data manipulation',
      bloomLevel: 'Apply',
      poMappings: [{ poCode: 'PO3', strength: 3 }],
    },
    {
      id: '4',
      code: 'CO4',
      description: 'Apply normalization techniques to optimize database design',
      bloomLevel: 'Analyze',
      poMappings: [],
    },
  ],
  createdAt: '2024-01-15',
  updatedAt: '2024-02-20',
}

const workflowSteps = [
  {
    id: 'syllabus',
    title: 'Upload Syllabus',
    description: 'Add course syllabus content',
    icon: FileText,
    href: '/syllabus',
    status: 'completed',
  },
  {
    id: 'generate-co',
    title: 'Generate COs',
    description: 'AI-powered outcome generation',
    icon: Brain,
    href: '/generate-co',
    status: 'completed',
  },
  {
    id: 'mapping',
    title: 'CO-PO Mapping',
    description: 'Map outcomes to program objectives',
    icon: Target,
    href: '/mapping',
    status: 'in-progress',
  },
  {
    id: 'exams',
    title: 'Configure Exams',
    description: 'Set up examination structure',
    icon: ClipboardList,
    href: '/exams',
    status: 'pending',
  },
  {
    id: 'questions',
    title: 'Add Questions',
    description: 'Upload or enter questions',
    icon: FileQuestion,
    href: '/questions',
    status: 'pending',
  },
  {
    id: 'marks',
    title: 'Enter Marks',
    description: 'Upload student marks',
    icon: Users,
    href: '/marks',
    status: 'pending',
  },
  {
    id: 'attainment',
    title: 'View Attainment',
    description: 'Calculate and analyze attainment',
    icon: BarChart3,
    href: '/co-attainment',
    status: 'pending',
  },
]

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.courseId as string

  const completedSteps = workflowSteps.filter((s) => s.status === 'completed').length
  const progress = (completedSteps / workflowSteps.length) * 100

  return (
    <div className="p-8 space-y-8">
      {/* Back Link */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      {/* Course Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{mockCourse.name}</h1>
              <Badge variant="secondary">{mockCourse.code}</Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Semester {mockCourse.semester}
              </span>
              <span>{mockCourse.credits} Credits</span>
              <span>{mockCourse.department}</span>
            </div>
            <p className="text-muted-foreground mt-3 max-w-2xl">{mockCourse.description}</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Course
        </Button>
      </div>

      {/* Overall Progress */}
      <div className="bg-background border border-border/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Course Setup Progress</h2>
            <p className="text-sm text-muted-foreground">
              {completedSteps} of {workflowSteps.length} steps completed
            </p>
          </div>
          <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Workflow Steps - Stepper Layout */}
      <div className="bg-background border border-border/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Workflow Steps</h2>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = step.status === 'completed'
              const isInProgress = step.status === 'in-progress'
              const isPending = step.status === 'pending'

              return (
                <div key={step.id} className="relative flex items-start gap-6">
                  {/* Step Indicator */}
                  <div
                    className={cn(
                      'relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all',
                      isCompleted && 'bg-accent text-accent-foreground',
                      isInProgress && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                      isPending && 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className={cn(
                            'font-semibold',
                            isCompleted && 'text-accent',
                            isInProgress && 'text-primary',
                            isPending && 'text-muted-foreground'
                          )}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                      </div>
                      <Button
                        variant={isInProgress ? 'default' : 'outline'}
                        size="sm"
                        asChild
                        disabled={isPending && index > completedSteps}
                      >
                        <Link href={`/courses/${courseId}${step.href}`}>
                          {isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Course Outcomes Summary */}
      <div className="flex gap-6">
        <div className="flex-1 bg-background border border-border/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Course Outcomes</h2>
              <p className="text-sm text-muted-foreground">{mockCourse.courseOutcomes.length} outcomes defined</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/courses/${courseId}/generate-co`}>
                Manage COs
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {mockCourse.courseOutcomes.map((co) => (
              <div key={co.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded shrink-0">
                  {co.code}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{co.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {co.bloomLevel}
                    </Badge>
                    {co.poMappings.length > 0 ? (
                      <span className="text-xs text-muted-foreground">
                        Mapped to: {co.poMappings.map((m) => m.poCode).join(', ')}
                      </span>
                    ) : (
                      <span className="text-xs text-amber-500">Not mapped</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="w-80 space-y-4">
          <div className="bg-background border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockCourse.courseOutcomes.length}</p>
                <p className="text-sm text-muted-foreground">Course Outcomes</p>
              </div>
            </div>
          </div>
          <div className="bg-background border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockCourse.courseOutcomes.filter((co) => co.poMappings.length > 0).length}/
                  {mockCourse.courseOutcomes.length}
                </p>
                <p className="text-sm text-muted-foreground">COs Mapped</p>
              </div>
            </div>
          </div>
          <div className="bg-background border border-border/50 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(mockCourse.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
