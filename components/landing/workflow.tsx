"use client"

import { cn } from "@/lib/utils"
import { 
  LogIn, 
  LayoutDashboard, 
  BookPlus, 
  FileUp, 
  Cpu, 
  Link2, 
  Settings2, 
  FileText, 
  Brain, 
  Upload, 
  Calculator, 
  BarChart3, 
  PieChart, 
  Download,
  ArrowDown
} from "lucide-react"

const workflowSteps = [
  { icon: LogIn, label: "Login", description: "Secure authentication" },
  { icon: LayoutDashboard, label: "Dashboard", description: "System overview" },
  { icon: BookPlus, label: "Create Course", description: "Course details" },
  { icon: FileUp, label: "Upload Syllabus", description: "PDF/Text input" },
  { icon: Cpu, label: "AI Generate CO", description: "Bloom's aligned" },
  { icon: Link2, label: "CO-PO Mapping", description: "Visual matrix" },
  { icon: Settings2, label: "Configure Exam", description: "Assessment setup" },
  { icon: FileText, label: "Upload Questions", description: "Question paper" },
  { icon: Brain, label: "AI Question Mapping", description: "Auto analysis" },
  { icon: Upload, label: "Upload Marks", description: "Student scores" },
  { icon: Calculator, label: "CO Attainment", description: "Level calculation" },
  { icon: BarChart3, label: "PO Attainment", description: "Program outcomes" },
  { icon: PieChart, label: "Analytics", description: "Visual insights" },
  { icon: Download, label: "Export Reports", description: "PDF & Excel" },
]

export function Workflow() {
  return (
    <section id="workflow" className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Workflow
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Seamless <span className="text-accent">End-to-End</span> Process
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">
            From login to final reports — a streamlined journey through the entire OBE lifecycle
          </p>
        </div>

        {/* Workflow Visualization */}
        <div className="relative">
          {/* Main flow path */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-20" />

          {/* Steps */}
          <div className="relative flex flex-col lg:flex-row flex-wrap justify-center gap-4 lg:gap-0">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon
              const isFirst = index === 0
              const isLast = index === workflowSteps.length - 1
              const row = Math.floor(index / 7)
              const isEvenRow = row % 2 === 0

              return (
                <div
                  key={step.label}
                  className={cn(
                    "relative flex flex-col items-center",
                    "lg:w-[calc(100%/7)]"
                  )}
                >
                  {/* Connector (desktop) */}
                  {!isFirst && (
                    <div className="hidden lg:block absolute top-8 -left-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-accent/50" />
                  )}

                  {/* Step Node */}
                  <div className="group relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Icon container */}
                    <div
                      className={cn(
                        "relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300",
                        "bg-background border-2 border-border shadow-lg",
                        "group-hover:border-primary group-hover:shadow-primary/20 group-hover:scale-110"
                      )}
                    >
                      <Icon className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
                      
                      {/* Step number */}
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="mt-4 text-center">
                    <span className="block text-sm font-semibold text-foreground">
                      {step.label}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      {step.description}
                    </span>
                  </div>

                  {/* Row connector (mobile) */}
                  {!isLast && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowDown className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-foreground">5</span>
              <span className="block text-sm text-muted-foreground">AI-Powered Steps</span>
            </div>
          </div>
          <div className="h-12 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Calculator className="h-6 w-6 text-accent" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-foreground">3</span>
              <span className="block text-sm text-muted-foreground">Attainment Levels</span>
            </div>
          </div>
          <div className="h-12 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/10">
              <Download className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-foreground">4</span>
              <span className="block text-sm text-muted-foreground">Export Formats</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
