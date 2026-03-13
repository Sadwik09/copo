"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ChevronRight, 
  Play,
  Zap,
  CheckCircle2,
  Circle,
  Loader2,
  ArrowRight,
  FileText,
  Target,
  BarChart3,
  PieChart,
  Download
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PipelineStep {
  id: string
  name: string
  description: string
  status: "pending" | "running" | "completed" | "error"
  icon: React.ReactNode
  result?: {
    label: string
    value: string
  }
}

const initialSteps: PipelineStep[] = [
  {
    id: "1",
    name: "Fetch Course Data",
    description: "Loading course outcomes, exams, and student marks",
    status: "pending",
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: "2",
    name: "Calculate CO Attainment",
    description: "Computing Course Outcome attainment using threshold algorithm",
    status: "pending",
    icon: <Target className="h-5 w-5" />
  },
  {
    id: "3",
    name: "Map CO to PO",
    description: "Applying CO-PO correlation matrix for PO calculation",
    status: "pending",
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    id: "4",
    name: "Calculate PO Attainment",
    description: "Computing Program Outcome attainment from CO mappings",
    status: "pending",
    icon: <Target className="h-5 w-5" />
  },
  {
    id: "5",
    name: "Map CO to PSO",
    description: "Applying CO-PSO correlation matrix for PSO calculation",
    status: "pending",
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    id: "6",
    name: "Calculate PSO Attainment",
    description: "Computing Program Specific Outcome attainment",
    status: "pending",
    icon: <Target className="h-5 w-5" />
  },
  {
    id: "7",
    name: "Generate Summary",
    description: "Creating comprehensive attainment report",
    status: "pending",
    icon: <PieChart className="h-5 w-5" />
  },
]

export default function PipelinePage() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps)
  const [pipelineComplete, setPipelineComplete] = useState(false)

  const mockCourses = [
    { id: "1", name: "CS301 - Data Structures and Algorithms" },
    { id: "2", name: "CS302 - Database Management Systems" },
    { id: "3", name: "CS303 - Operating Systems" },
  ]

  const results = {
    coAttainment: 77.18,
    poAttainment: 72.45,
    psoAttainment: 74.16,
    totalStudents: 55,
    examsProcessed: 3,
    cosAnalyzed: 6,
    posComputed: 12,
    psosComputed: 3
  }

  const runPipeline = async () => {
    if (!selectedCourse) return

    setIsRunning(true)
    setPipelineComplete(false)
    setSteps(initialSteps)

    const mockResults = [
      { label: "Data fetched", value: "55 students, 3 exams" },
      { label: "CO Attainment", value: "77.18%" },
      { label: "Mappings applied", value: "6 COs → 12 POs" },
      { label: "PO Attainment", value: "72.45%" },
      { label: "Mappings applied", value: "6 COs → 3 PSOs" },
      { label: "PSO Attainment", value: "74.16%" },
      { label: "Report generated", value: "Complete" },
    ]

    for (let i = 0; i < steps.length; i++) {
      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: "running" } : step
      ))

      await new Promise(resolve => setTimeout(resolve, 1200))

      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: "completed", result: mockResults[i] } : step
      ))
    }

    setIsRunning(false)
    setPipelineComplete(true)
  }

  const resetPipeline = () => {
    setSteps(initialSteps)
    setPipelineComplete(false)
  }

  const getStepIcon = (step: PipelineStep) => {
    switch (step.status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-emerald-500" />
      case "running":
        return <Loader2 className="h-6 w-6 text-primary animate-spin" />
      case "error":
        return <Circle className="h-6 w-6 text-red-500" />
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative px-6 py-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/attainment" className="hover:text-primary transition-colors">Attainment</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Full OBE Pipeline</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Full OBE Attainment Pipeline</h1>
            <p className="text-muted-foreground max-w-2xl">
              Run the complete Outcome Based Education attainment calculation pipeline in one go
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Pipeline Steps */}
          <div className="flex-1">
            {/* Course Selection */}
            <div className="p-6 rounded-2xl border bg-card mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="flex-1 rounded-xl">
                    <SelectValue placeholder="Select a course to process" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  onClick={runPipeline}
                  disabled={!selectedCourse || isRunning}
                  className="rounded-xl gap-2 px-8"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Running Pipeline...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      Run Full Pipeline
                    </>
                  )}
                </Button>

                {pipelineComplete && (
                  <Button variant="outline" onClick={resetPipeline} className="rounded-xl">
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Steps */}
            <div className="p-6 rounded-2xl border bg-card">
              <h2 className="text-lg font-semibold mb-6">Pipeline Steps</h2>
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-[23px] top-8 bottom-8 w-0.5 bg-border" />

                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div 
                      key={step.id}
                      className={cn(
                        "relative flex gap-4 p-4 rounded-xl transition-all duration-300",
                        step.status === "running" && "bg-primary/5 border border-primary/20",
                        step.status === "completed" && "bg-emerald-50 border border-emerald-200",
                        step.status === "pending" && "bg-muted/20"
                      )}
                    >
                      <div className="relative z-10 flex-shrink-0">
                        {getStepIcon(step)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className={cn(
                            "font-semibold",
                            step.status === "completed" && "text-emerald-700",
                            step.status === "running" && "text-primary"
                          )}>
                            {step.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            Step {index + 1}/{steps.length}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {step.description}
                        </p>
                        {step.result && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">{step.result.label}:</span>
                            <span className="font-semibold text-emerald-600">{step.result.value}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0 p-2 rounded-lg bg-muted/50">
                        {step.icon}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="w-full lg:w-96">
            {pipelineComplete ? (
              <div className="p-6 rounded-2xl border bg-card sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Pipeline Complete</h2>
                    <p className="text-sm text-muted-foreground">All calculations finished</p>
                  </div>
                </div>

                {/* Main Results */}
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground mb-1">CO Attainment</p>
                    <p className="text-3xl font-bold text-primary">{results.coAttainment}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
                    <p className="text-sm text-muted-foreground mb-1">PO Attainment</p>
                    <p className="text-3xl font-bold text-emerald-600">{results.poAttainment}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
                    <p className="text-sm text-muted-foreground mb-1">PSO Attainment</p>
                    <p className="text-3xl font-bold text-blue-600">{results.psoAttainment}%</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex-1 min-w-[80px] p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-2xl font-bold">{results.totalStudents}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="flex-1 min-w-[80px] p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-2xl font-bold">{results.examsProcessed}</p>
                    <p className="text-xs text-muted-foreground">Exams</p>
                  </div>
                  <div className="flex-1 min-w-[80px] p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-2xl font-bold">{results.cosAnalyzed}</p>
                    <p className="text-xs text-muted-foreground">COs</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link href="/reports/generate">
                    <Button className="w-full rounded-xl gap-2">
                      <FileText className="h-4 w-4" />
                      Generate Report
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full rounded-xl gap-2">
                    <Download className="h-4 w-4" />
                    Export Results
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border bg-card">
                <div className="text-center py-12">
                  <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Ready to Run</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a course and run the full OBE pipeline to calculate all attainment metrics
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
