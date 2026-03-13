'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Sparkles, Save, Check, Info, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// Mock data
const mockCOs = [
  { code: 'CO1', description: 'Understand fundamental database concepts and DBMS architecture' },
  { code: 'CO2', description: 'Design and construct Entity-Relationship diagrams' },
  { code: 'CO3', description: 'Apply relational algebra and SQL for querying databases' },
  { code: 'CO4', description: 'Analyze functional dependencies and apply normalization' },
  { code: 'CO5', description: 'Evaluate database design methodologies' },
]

const mockPOs = [
  { code: 'PO1', description: 'Engineering Knowledge' },
  { code: 'PO2', description: 'Problem Analysis' },
  { code: 'PO3', description: 'Design/Development of Solutions' },
  { code: 'PO4', description: 'Conduct Investigations' },
  { code: 'PO5', description: 'Modern Tool Usage' },
  { code: 'PO6', description: 'The Engineer and Society' },
  { code: 'PO7', description: 'Environment and Sustainability' },
  { code: 'PO8', description: 'Ethics' },
  { code: 'PO9', description: 'Individual and Team Work' },
  { code: 'PO10', description: 'Communication' },
  { code: 'PO11', description: 'Project Management' },
  { code: 'PO12', description: 'Life-long Learning' },
]

const mockPSOs = [
  { code: 'PSO1', description: 'Apply software engineering principles' },
  { code: 'PSO2', description: 'Design and develop computing systems' },
  { code: 'PSO3', description: 'Demonstrate professional skills' },
]

type MappingStrength = 0 | 1 | 2 | 3

interface MappingValue {
  strength: MappingStrength
  aiSuggested?: boolean
}

type MappingMatrix = Record<string, Record<string, MappingValue>>

// Initialize with AI suggestions
const initializeMappings = (): MappingMatrix => {
  const matrix: MappingMatrix = {}
  mockCOs.forEach((co) => {
    matrix[co.code] = {}
    ;[...mockPOs, ...mockPSOs].forEach((po) => {
      // Random AI suggestions for demo
      const aiSuggested = Math.random() > 0.7
      matrix[co.code][po.code] = {
        strength: aiSuggested ? (Math.floor(Math.random() * 3) + 1) as MappingStrength : 0,
        aiSuggested,
      }
    })
  })
  return matrix
}

export default function MappingPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  const [mappings, setMappings] = useState<MappingMatrix>(initializeMappings)
  const [showPSOs, setShowPSOs] = useState(true)
  const [isApplyingAI, setIsApplyingAI] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedCO, setSelectedCO] = useState<string | null>(null)

  const handleCellClick = (coCode: string, poCode: string) => {
    setMappings((prev) => {
      const current = prev[coCode][poCode].strength
      const next = ((current + 1) % 4) as MappingStrength
      return {
        ...prev,
        [coCode]: {
          ...prev[coCode],
          [poCode]: { strength: next, aiSuggested: false },
        },
      }
    })
  }

  const handleApplyAISuggestions = async () => {
    setIsApplyingAI(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setMappings((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((co) => {
        Object.keys(updated[co]).forEach((po) => {
          if (updated[co][po].aiSuggested) {
            updated[co][po] = { ...updated[co][po], aiSuggested: false }
          }
        })
      })
      return updated
    })

    setIsApplyingAI(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    router.push(`/courses/${courseId}/exams`)
  }

  const strengthColors: Record<MappingStrength, string> = {
    0: 'bg-muted/30 text-muted-foreground hover:bg-muted/50',
    1: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200',
    2: 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200',
    3: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200',
  }

  const activeOutcomes = showPSOs ? [...mockPOs, ...mockPSOs] : mockPOs

  return (
    <TooltipProvider>
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
            <h1 className="text-2xl font-bold text-foreground">CO-PO-PSO Mapping</h1>
            <p className="text-muted-foreground mt-1">
              Map course outcomes to program outcomes and program specific outcomes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleApplyAISuggestions} disabled={isApplyingAI}>
              {isApplyingAI ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2" />
                  Applying...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Apply AI Suggestions
                </>
              )}
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Mapping
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-xl">
          <span className="text-sm font-medium text-foreground">Strength Level:</span>
          <div className="flex items-center gap-4">
            <LegendItem value={0} label="No Mapping" />
            <LegendItem value={1} label="Low (1)" />
            <LegendItem value={2} label="Medium (2)" />
            <LegendItem value={3} label="High (3)" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showPSOs}
                onChange={(e) => setShowPSOs(e.target.checked)}
                className="rounded border-border"
              />
              Show PSOs
            </label>
          </div>
        </div>

        {/* Mapping Matrix */}
        <div className="bg-background border border-border/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-muted p-4 text-left font-semibold text-foreground border-b border-r border-border/50 min-w-[200px]">
                    Course Outcomes
                  </th>
                  {activeOutcomes.map((po) => (
                    <th
                      key={po.code}
                      className="p-2 text-center border-b border-border/50 min-w-[60px]"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className={cn(
                              'text-sm font-semibold cursor-help',
                              po.code.startsWith('PSO') ? 'text-accent' : 'text-primary'
                            )}
                          >
                            {po.code}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p className="font-medium">{po.code}</p>
                          <p className="text-xs text-muted-foreground">{po.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockCOs.map((co, index) => (
                  <tr
                    key={co.code}
                    className={cn(
                      'transition-colors',
                      selectedCO === co.code && 'bg-primary/5',
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                    )}
                    onMouseEnter={() => setSelectedCO(co.code)}
                    onMouseLeave={() => setSelectedCO(null)}
                  >
                    <td className="sticky left-0 z-10 bg-inherit p-4 border-r border-border/50">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="shrink-0 font-semibold">
                          {co.code}
                        </Badge>
                        <span className="text-sm text-foreground line-clamp-2">{co.description}</span>
                      </div>
                    </td>
                    {activeOutcomes.map((po) => {
                      const mapping = mappings[co.code]?.[po.code]
                      return (
                        <td key={po.code} className="p-1 text-center">
                          <button
                            onClick={() => handleCellClick(co.code, po.code)}
                            className={cn(
                              'w-12 h-12 rounded-lg border text-sm font-semibold transition-all',
                              strengthColors[mapping?.strength ?? 0],
                              mapping?.aiSuggested && 'ring-2 ring-primary ring-offset-2'
                            )}
                          >
                            {mapping?.strength || '-'}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            Click on cells to cycle through mapping strengths (0 → 1 → 2 → 3 → 0)
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            Continue to Exam Configuration
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}

function LegendItem({ value, label }: { value: MappingStrength; label: string }) {
  const colors: Record<MappingStrength, string> = {
    0: 'bg-muted/50 border-border',
    1: 'bg-blue-100 border-blue-200',
    2: 'bg-amber-100 border-amber-200',
    3: 'bg-emerald-100 border-emerald-200',
  }

  return (
    <div className="flex items-center gap-2">
      <div className={cn('w-6 h-6 rounded border flex items-center justify-center text-xs font-semibold', colors[value])}>
        {value || '-'}
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
