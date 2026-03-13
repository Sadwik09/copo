"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ChevronRight, 
  FileText,
  FileSpreadsheet,
  Settings,
  Target,
  BarChart3,
  Users,
  PieChart,
  CheckCircle2,
  Loader2,
  Download,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ReportSection {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  included: boolean
}

export default function GenerateReportPage() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [reportFormat, setReportFormat] = useState<"pdf" | "excel">("pdf")
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportReady, setReportReady] = useState(false)
  const [sections, setSections] = useState<ReportSection[]>([
    { id: "summary", name: "Executive Summary", description: "Overall attainment overview and key metrics", icon: <FileText className="h-5 w-5" />, included: true },
    { id: "co", name: "CO Attainment Analysis", description: "Detailed Course Outcome attainment breakdown", icon: <Target className="h-5 w-5" />, included: true },
    { id: "po", name: "PO Attainment Analysis", description: "Program Outcome mapping and attainment", icon: <BarChart3 className="h-5 w-5" />, included: true },
    { id: "pso", name: "PSO Attainment Analysis", description: "Program Specific Outcome calculations", icon: <PieChart className="h-5 w-5" />, included: true },
    { id: "students", name: "Student Performance", description: "Individual student attainment details", icon: <Users className="h-5 w-5" />, included: true },
    { id: "matrix", name: "CO-PO Correlation Matrix", description: "Visual correlation matrix with mappings", icon: <BarChart3 className="h-5 w-5" />, included: true },
    { id: "charts", name: "Visualization Charts", description: "Graphs and charts for all metrics", icon: <PieChart className="h-5 w-5" />, included: true },
  ])

  const mockCourses = [
    { id: "1", name: "CS301 - Data Structures and Algorithms" },
    { id: "2", name: "CS302 - Database Management Systems" },
    { id: "3", name: "CS303 - Operating Systems" },
  ]

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, included: !section.included } : section
    ))
  }

  const handleGenerate = async () => {
    if (!selectedCourse) return

    setIsGenerating(true)
    setReportReady(false)

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000))

    setIsGenerating(false)
    setReportReady(true)
  }

  const includedSections = sections.filter(s => s.included).length

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
              <Link href="/reports" className="hover:text-primary transition-colors">Reports</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Generate Report</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Generate OBE Report</h1>
            <p className="text-muted-foreground max-w-2xl">
              Configure and generate comprehensive OBE attainment reports
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Configuration */}
          <div className="flex-1 max-w-2xl">
            {/* Course & Format Selection */}
            <div className="p-6 rounded-2xl border bg-card mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Report Configuration</h2>
                  <p className="text-sm text-muted-foreground">Select course and format</p>
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

                {/* Format Selection */}
                <div className="space-y-3">
                  <Label>Report Format</Label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setReportFormat("pdf")}
                      className={cn(
                        "flex-1 p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3",
                        reportFormat === "pdf" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg",
                        reportFormat === "pdf" ? "bg-red-500/10" : "bg-muted"
                      )}>
                        <FileText className={cn(
                          "h-5 w-5",
                          reportFormat === "pdf" ? "text-red-500" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">PDF Report</p>
                        <p className="text-sm text-muted-foreground">Print-ready document</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setReportFormat("excel")}
                      className={cn(
                        "flex-1 p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3",
                        reportFormat === "excel" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg",
                        reportFormat === "excel" ? "bg-emerald-500/10" : "bg-muted"
                      )}>
                        <FileSpreadsheet className={cn(
                          "h-5 w-5",
                          reportFormat === "excel" ? "text-emerald-600" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Excel Report</p>
                        <p className="text-sm text-muted-foreground">Editable spreadsheet</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Selection */}
            <div className="p-6 rounded-2xl border bg-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Report Sections</h2>
                    <p className="text-sm text-muted-foreground">Select sections to include</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {includedSections} of {sections.length} selected
                </span>
              </div>

              <div className="space-y-3">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className={cn(
                      "p-4 rounded-xl border transition-all duration-200 cursor-pointer",
                      section.included 
                        ? "border-primary/20 bg-primary/5" 
                        : "border-border hover:border-primary/20"
                    )}
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={section.included}
                        onCheckedChange={() => toggleSection(section.id)}
                      />
                      <div className={cn(
                        "p-2 rounded-lg",
                        section.included ? "bg-primary/10" : "bg-muted"
                      )}>
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{section.name}</p>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & Generate */}
          <div className="w-full lg:w-96">
            <div className="p-6 rounded-2xl border bg-card sticky top-6">
              <h2 className="text-lg font-semibold mb-6">Report Preview</h2>

              {/* Preview Info */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Selected Course</p>
                  <p className="font-medium">
                    {selectedCourse 
                      ? mockCourses.find(c => c.id === selectedCourse)?.name 
                      : "No course selected"}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Format</p>
                  <div className="flex items-center gap-2">
                    {reportFormat === "pdf" 
                      ? <FileText className="h-4 w-4 text-red-500" />
                      : <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                    }
                    <span className="font-medium uppercase">{reportFormat}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Sections Included</p>
                  <p className="font-medium">{includedSections} sections</p>
                </div>
              </div>

              {/* Included Sections List */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Content</p>
                <div className="space-y-2">
                  {sections.filter(s => s.included).map((section) => (
                    <div key={section.id} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>{section.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              {!reportReady ? (
                <Button 
                  className="w-full rounded-xl h-12 gap-2 text-base"
                  onClick={handleGenerate}
                  disabled={!selectedCourse || includedSections === 0 || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5" />
                      Generate Report
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span className="font-semibold text-emerald-700">Report Ready!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your report has been generated successfully
                    </p>
                  </div>
                  <Button className="w-full rounded-xl gap-2">
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl gap-2">
                    <Eye className="h-4 w-4" />
                    Preview Report
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
