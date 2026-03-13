'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Sparkles,
  Check,
  Edit2,
  Trash2,
  Plus,
  Save,
  ChevronRight,
  Brain,
  FileText,
  Target,
  Lightbulb,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { BloomLevel, AIGeneratedCO } from '@/types'

const bloomLevels: BloomLevel[] = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create']

const bloomColors: Record<BloomLevel, string> = {
  Remember: 'bg-slate-100 text-slate-700 border-slate-200',
  Understand: 'bg-blue-100 text-blue-700 border-blue-200',
  Apply: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Analyze: 'bg-amber-100 text-amber-700 border-amber-200',
  Evaluate: 'bg-purple-100 text-purple-700 border-purple-200',
  Create: 'bg-rose-100 text-rose-700 border-rose-200',
}

// Mock syllabus for display
const mockSyllabus = `Unit 1: Introduction to Database Systems
- Database concepts and characteristics
- DBMS architecture and data independence
- Database users and administrators

Unit 2: Data Modeling
- Entity-Relationship model
- Enhanced ER features
- Object-based data models

Unit 3: Relational Model
- Relational algebra
- Relational calculus
- SQL fundamentals

Unit 4: Database Design
- Functional dependencies
- Normalization (1NF, 2NF, 3NF, BCNF)
- Database design methodology`

export default function GenerateCOPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCOs, setGeneratedCOs] = useState<AIGeneratedCO[]>([])
  const [editingCO, setEditingCO] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setStep(2)

    // Simulate AI generation with progressive reveal
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockCOs: AIGeneratedCO[] = [
      {
        code: 'CO1',
        description: 'Understand fundamental database concepts, DBMS architecture, and data independence principles',
        bloomLevel: 'Understand',
        confidence: 95,
        suggestedPOMappings: [
          { poCode: 'PO1', strength: 3 },
          { poCode: 'PO2', strength: 2 },
        ],
      },
      {
        code: 'CO2',
        description: 'Design and construct Entity-Relationship diagrams for real-world database applications',
        bloomLevel: 'Apply',
        confidence: 92,
        suggestedPOMappings: [
          { poCode: 'PO1', strength: 2 },
          { poCode: 'PO3', strength: 3 },
        ],
      },
      {
        code: 'CO3',
        description: 'Apply relational algebra and SQL for querying and manipulating database systems',
        bloomLevel: 'Apply',
        confidence: 88,
        suggestedPOMappings: [
          { poCode: 'PO3', strength: 3 },
          { poCode: 'PO5', strength: 2 },
        ],
      },
      {
        code: 'CO4',
        description: 'Analyze functional dependencies and apply normalization techniques to optimize database schemas',
        bloomLevel: 'Analyze',
        confidence: 90,
        suggestedPOMappings: [
          { poCode: 'PO2', strength: 3 },
          { poCode: 'PO4', strength: 2 },
        ],
      },
      {
        code: 'CO5',
        description: 'Evaluate database design methodologies and select appropriate approaches for given requirements',
        bloomLevel: 'Evaluate',
        confidence: 85,
        suggestedPOMappings: [
          { poCode: 'PO4', strength: 3 },
          { poCode: 'PO6', strength: 2 },
        ],
      },
    ]

    setGeneratedCOs(mockCOs)
    setIsGenerating(false)
    setStep(3)
  }

  const handleUpdateCO = (code: string, field: keyof AIGeneratedCO, value: string | BloomLevel) => {
    setGeneratedCOs((cos) =>
      cos.map((co) => (co.code === code ? { ...co, [field]: value } : co))
    )
  }

  const handleDeleteCO = (code: string) => {
    setGeneratedCOs((cos) => cos.filter((co) => co.code !== code))
  }

  const handleAddCO = () => {
    const newCode = `CO${generatedCOs.length + 1}`
    setGeneratedCOs([
      ...generatedCOs,
      {
        code: newCode,
        description: '',
        bloomLevel: 'Understand',
        confidence: 100,
        suggestedPOMappings: [],
      },
    ])
    setEditingCO(newCode)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setStep(4)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    // After save, redirect to mapping
    setTimeout(() => {
      router.push(`/courses/${courseId}/mapping`)
    }, 1000)
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Course Outcome Generation</h1>
        <p className="text-muted-foreground mt-1">
          Generate course outcomes from your syllabus using AI assistance
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="bg-background border border-border/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, title: 'Review Syllabus', icon: FileText },
            { num: 2, title: 'AI Generation', icon: Brain },
            { num: 3, title: 'Edit & Refine', icon: Edit2 },
            { num: 4, title: 'Save COs', icon: Save },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
                    step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                    step === s.num && 'ring-4 ring-primary/20'
                  )}
                >
                  {step > s.num ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span
                  className={cn(
                    'text-sm font-medium mt-2',
                    step >= s.num ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {s.title}
                </span>
              </div>
              {index < 3 && (
                <div
                  className={cn('w-24 h-0.5 mx-4', step > s.num ? 'bg-primary' : 'bg-border')}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Step 1: Syllabus Review */}
          {step === 1 && (
            <div className="bg-background border border-border/50 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Course Syllabus</h2>
                  <p className="text-sm text-muted-foreground">Review the syllabus before generating COs</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/courses/${courseId}/syllabus`}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Syllabus
                  </Link>
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                  {mockSyllabus}
                </pre>
              </div>

              <Button onClick={handleGenerate} className="w-full" size="lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Course Outcomes with AI
              </Button>
            </div>
          )}

          {/* Step 2: Generating */}
          {step === 2 && isGenerating && (
            <div className="bg-background border border-border/50 rounded-xl p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Analyzing Syllabus...</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Our AI is analyzing your syllabus content and generating appropriate course outcomes based on
                Bloom&apos;s taxonomy.
              </p>
              <div className="max-w-xs mx-auto mt-6">
                <Progress value={66} className="h-2" />
              </div>
            </div>
          )}

          {/* Step 3: Edit COs */}
          {(step === 3 || (step === 2 && !isGenerating)) && generatedCOs.length > 0 && (
            <div className="bg-background border border-border/50 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Generated Course Outcomes</h2>
                  <p className="text-sm text-muted-foreground">
                    Review, edit, or add course outcomes as needed
                  </p>
                </div>
                <Button variant="outline" onClick={handleAddCO}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add CO
                </Button>
              </div>

              <div className="space-y-4">
                {generatedCOs.map((co) => (
                  <COEditItem
                    key={co.code}
                    co={co}
                    isEditing={editingCO === co.code}
                    onEdit={() => setEditingCO(co.code)}
                    onSave={() => setEditingCO(null)}
                    onUpdate={(field, value) => handleUpdateCO(co.code, field, value)}
                    onDelete={() => handleDeleteCO(co.code)}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Syllabus
                </Button>
                <Button onClick={handleSave} size="lg">
                  Save Course Outcomes
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Saving */}
          {step === 4 && (
            <div className="bg-background border border-border/50 rounded-xl p-12 text-center">
              {isSaving ? (
                <>
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Save className="w-10 h-10 text-primary animate-pulse" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Saving Course Outcomes...</h2>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Course Outcomes Saved!</h2>
                  <p className="text-muted-foreground mt-2">
                    Redirecting to CO-PO Mapping...
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Tips */}
        <div className="w-80 space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Writing Good COs</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Start with action verbs
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Be specific and measurable
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Align with Bloom&apos;s taxonomy
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Keep 5-8 COs per course
              </li>
            </ul>
          </div>

          <div className="bg-background border border-border/50 rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-3">Bloom&apos;s Taxonomy</h3>
            <div className="space-y-2">
              {bloomLevels.map((level) => (
                <div
                  key={level}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium border',
                    bloomColors[level]
                  )}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function COEditItem({
  co,
  isEditing,
  onEdit,
  onSave,
  onUpdate,
  onDelete,
}: {
  co: AIGeneratedCO
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  onUpdate: (field: keyof AIGeneratedCO, value: string | BloomLevel) => void
  onDelete: () => void
}) {
  if (isEditing) {
    return (
      <div className="p-4 rounded-xl border-2 border-primary bg-primary/5 space-y-4">
        <div className="flex items-center gap-3">
          <Input
            value={co.code}
            onChange={(e) => onUpdate('code', e.target.value)}
            className="w-20 font-semibold"
          />
          <Select
            value={co.bloomLevel}
            onValueChange={(value) => onUpdate('bloomLevel', value as BloomLevel)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bloomLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
        <Textarea
          value={co.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="Enter course outcome description..."
          rows={2}
        />
        <div className="flex justify-end">
          <Button onClick={onSave}>
            <Check className="w-4 h-4 mr-2" />
            Done
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all group">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <span className="text-lg font-bold text-primary">{co.code}</span>
        </div>
        <div className="flex-1">
          <p className="text-foreground">{co.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant="outline" className={cn('text-xs', bloomColors[co.bloomLevel])}>
              {co.bloomLevel}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Confidence: {co.confidence}%
            </span>
            {co.suggestedPOMappings.length > 0 && (
              <span className="text-xs text-muted-foreground">
                Suggested: {co.suggestedPOMappings.map((m) => m.poCode).join(', ')}
              </span>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onEdit}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
