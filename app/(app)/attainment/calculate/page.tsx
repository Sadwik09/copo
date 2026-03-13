"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { 
  Calculator, 
  ChevronRight, 
  Play,
  Settings,
  Target,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CalculationStep {
  id: string
  name: string
  status: "pending" | "running" | "completed" | "error"
  message?: string
}

export default function CalculateAttainmentPage() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedExam, setSelectedExam] = useState("")
  const [threshold, setThreshold] = useState([60])
  const [includeAllExams, setIncludeAllExams] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [steps, setSteps] = useState<CalculationStep[]>([
    { id: "1", name: "Fetching student marks data", status: "pending" },
    { id: "2", name: "Calculating question-wise CO scores", status: "pending" },
    { id: "3", name: "Applying threshold algorithm", status: "pending" },
    { id: "4", name: "Computing CO attainment percentages", status: "pending" },
    { id: "5", name: "Generating attainment summary", status: "pending" },
  ])
  const [results, setResults] = useState<any>(null)

  const mockCourses = [
    { id: "1", name: "CS301 - Data Structures and Algorithms" },
    { id: "2", name: "CS302 - Database Management Systems" },
    { id: "3", name: "CS303 - Operating Systems" },
  ]

  const mockExams = [
    { id: "1", name: "Mid-Term Examination" },
    { id: "2", name: "Internal Assessment 1" },
    { id: "3", name: "End Semester Examination" },
  ]

  const handleCalculate = async () => {
    if (!selectedCourse) return

    setIsCalculating(true)
    setResults(null)

    // Simulate step-by-step calculation
    for (let i = 0; i < steps.length; i++) {
      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: "running" } : step
      ))
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: "completed" } : step
      ))
    }

    // Mock results
    setResults({
      courseId: selectedCourse,
      threshold: threshold[0],
      coAttainments: [
        { co: "CO1", attainment: 78.5, studentsAboveThreshold: 45, totalStudents: 55 },
        { co: "CO2", attainment: 82.3, studentsAboveThreshold: 48, totalStudents: 55 },
        { co: "CO3", attainment: 65.2, studentsAboveThreshold: 38, totalStudents: 55 },
        { co: "CO4", attainment: 71.8, studentsAboveThreshold: 42, totalStudents: 55 },
        { co: "CO5", attainment: 88.1, studentsAboveThreshold: 51, totalStudents: 55 },
      ],
      overallAttainment: 77.18,
      calculatedAt: new Date().toISOString()
    })

    setIsCalculating(false)
  }

  const resetCalculation = () => {
    setSteps(prev => prev.map(step => ({ ...step, status: "pending" })))
    setResults(null)
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      case "running": return <Loader2 className="h-5 w-5 text-primary animate-spin" />
      case "error": return <AlertCircle className="h-5 w-5 text-red-500" />
      default: return <div className="h-5 w-5 rounded-full border-2 border-muted" />
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
              <span className="text-foreground">Calculate CO Attainment</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Calculate CO Attainment</h1>
            <p className="text-muted-foreground max-w-2xl">
              Calculate Course Outcome attainment using threshold-based algorithms
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Configuration Panel */}
          <div className="flex-1 max-w-xl">
            <div className="p-6 rounded-2xl border bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Configuration</h2>
                  <p className="text-sm text-muted-foreground">Set up calculation parameters</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Course Selection */}
                <div className="space-y-2">
                  <Label>Select Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCourses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Include All Exams Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <Label className="text-base">Include All Exams</Label>
                    <p className="text-sm text-muted-foreground">Calculate weighted attainment across all exams</p>
                  </div>
                  <Switch
                    checked={includeAllExams}
                    onCheckedChange={setIncludeAllExams}
                  />
                </div>

                {/* Single Exam Selection */}
                {!includeAllExams && (
                  <div className="space-y-2">
                    <Label>Select Exam</Label>
                    <Select value={selectedExam} onValueChange={setSelectedExam}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Choose an exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockExams.map(exam => (
                          <SelectItem key={exam.id} value={exam.id}>
                            {exam.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Threshold Setting */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Attainment Threshold</Label>
                    <span className="text-lg font-bold text-primary">{threshold[0]}%</span>
                  </div>
                  <Slider
                    value={threshold}
                    onValueChange={setThreshold}
                    max={100}
                    min={0}
                    step={5}
                    className="py-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Students scoring above {threshold[0]}% will be considered to have attained the CO
                  </p>
                </div>

                {/* Calculate Button */}
                <Button 
                  className="w-full rounded-xl h-12 gap-2 text-base"
                  onClick={handleCalculate}
                  disabled={!selectedCourse || isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Calculate Attainment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Progress & Results Panel */}
          <div className="flex-1">
            {/* Calculation Steps */}
            <div className="p-6 rounded-2xl border bg-card mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Calculation Progress</h2>
                  <p className="text-sm text-muted-foreground">Step-by-step attainment calculation</p>
                </div>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                      step.status === "running" && "bg-primary/5 border border-primary/20",
                      step.status === "completed" && "bg-emerald-50 border border-emerald-200",
                      step.status === "pending" && "bg-muted/30"
                    )}
                  >
                    {getStepIcon(step.status)}
                    <div className="flex-1">
                      <p className={cn(
                        "font-medium",
                        step.status === "completed" && "text-emerald-700",
                        step.status === "running" && "text-primary"
                      )}>
                        {step.name}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Step {index + 1}/{steps.length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            {results && (
              <div className="p-6 rounded-2xl border bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10">
                      <BarChart3 className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Calculation Results</h2>
                      <p className="text-sm text-muted-foreground">
                        Calculated at {new Date(results.calculatedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetCalculation} className="rounded-xl">
                    Reset
                  </Button>
                </div>

                {/* Overall Attainment */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Overall CO Attainment</p>
                      <p className="text-4xl font-bold text-primary">{results.overallAttainment.toFixed(2)}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Threshold Used</p>
                      <p className="text-2xl font-bold">{results.threshold}%</p>
                    </div>
                  </div>
                </div>

                {/* CO-wise Results */}
                <div className="space-y-3">
                  {results.coAttainments.map((co: any) => (
                    <div key={co.co} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                      <div className="w-16 font-semibold text-primary">{co.co}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">
                            {co.studentsAboveThreshold}/{co.totalStudents} students
                          </span>
                          <span className={cn(
                            "font-bold",
                            co.attainment >= 70 ? "text-emerald-600" : co.attainment >= 50 ? "text-amber-600" : "text-red-500"
                          )}>
                            {co.attainment.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              co.attainment >= 70 ? "bg-emerald-500" : co.attainment >= 50 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${co.attainment}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <Link href="/attainment/po" className="flex-1">
                    <Button variant="outline" className="w-full rounded-xl gap-2">
                      Calculate PO Attainment
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/attainment/${results.courseId}`} className="flex-1">
                    <Button className="w-full rounded-xl gap-2">
                      View Full Report
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
