"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  BookOpen, 
  Upload, 
  Cpu, 
  Grid3X3, 
  Settings, 
  FileQuestion,
  Calculator,
  PieChart,
  FileDown,
  MessageSquare
} from "lucide-react"

const modules = [
  {
    id: "course",
    icon: BookOpen,
    title: "Course Management",
    shortTitle: "Courses",
    description: "Create and manage courses with complete details including credits, department, and instructor information.",
    features: ["Course creation", "Syllabus upload", "Department organization", "Semester tracking"],
  },
  {
    id: "co-gen",
    icon: Cpu,
    title: "AI Course Outcome Generation",
    shortTitle: "CO Generation",
    description: "Let AI analyze your syllabus and generate perfectly aligned Course Outcomes following Bloom's Taxonomy.",
    features: ["Bloom's Taxonomy alignment", "Syllabus analysis", "4-6 COs per course", "Edit & regenerate"],
  },
  {
    id: "mapping",
    icon: Grid3X3,
    title: "CO-PO-PSO Mapping",
    shortTitle: "Mapping",
    description: "Visualize and manage the relationship between Course Outcomes, Program Outcomes, and PSOs.",
    features: ["Visual matrix view", "AI suggestions", "Bulk mapping", "Export mappings"],
  },
  {
    id: "exam",
    icon: Settings,
    title: "Examination Configuration",
    shortTitle: "Exams",
    description: "Configure formative and summative assessments with flexible question and marks distribution.",
    features: ["T1-T5 Assessments", "Summative exams", "Question structure", "Marks distribution"],
  },
  {
    id: "question",
    icon: FileQuestion,
    title: "Question-CO Mapping",
    shortTitle: "Questions",
    description: "Upload question papers and let AI identify Bloom's levels and map questions to COs automatically.",
    features: ["PDF upload", "Auto analysis", "Bloom's detection", "Manual override"],
  },
  {
    id: "marks",
    icon: Upload,
    title: "Student Marks Management",
    shortTitle: "Marks",
    description: "Import student marks via Excel/CSV or enter manually with validation and missing value detection.",
    features: ["Excel/CSV import", "Bulk upload", "Validation", "Error detection"],
  },
  {
    id: "attainment",
    icon: Calculator,
    title: "Attainment Calculation",
    shortTitle: "Attainment",
    description: "Automatically calculate CO, PO, and PSO attainment levels using configurable thresholds.",
    features: ["CO attainment", "PO attainment", "PSO attainment", "Threshold config"],
  },
  {
    id: "analytics",
    icon: PieChart,
    title: "Analytics Dashboard",
    shortTitle: "Analytics",
    description: "Comprehensive visualizations and insights for faculty and department-level analysis.",
    features: ["Bar charts", "Radar charts", "Trend analysis", "Comparisons"],
  },
  {
    id: "reports",
    icon: FileDown,
    title: "Report Generation",
    shortTitle: "Reports",
    description: "Generate and export official reports in PDF and Excel formats for accreditation.",
    features: ["PDF export", "Excel export", "Custom templates", "Batch generation"],
  },
  {
    id: "chatbot",
    icon: MessageSquare,
    title: "AI Chatbot Assistant",
    shortTitle: "Chatbot",
    description: "Natural language interface to query attainment data, generate insights, and get recommendations.",
    features: ["NL queries", "Quick insights", "Recommendations", "Report requests"],
  },
]

export function Modules() {
  const [activeModule, setActiveModule] = useState(modules[0].id)
  const active = modules.find((m) => m.id === activeModule) || modules[0]
  const ActiveIcon = active.icon

  return (
    <section id="modules" className="relative py-32 overflow-hidden bg-muted/30">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              System Modules
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Complete <span className="text-primary">End-to-End</span> OBE Solution
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">
            10 integrated modules working together to automate your entire OBE workflow
          </p>
        </div>

        {/* Module Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {modules.map((module) => {
            const Icon = module.icon
            const isActive = module.id === activeModule
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-background hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{module.shortTitle}</span>
              </button>
            )
          })}
        </div>

        {/* Active Module Display */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />
          
          <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Icon & Title */}
              <div className="flex-shrink-0">
                <div className="flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 shadow-lg">
                  <ActiveIcon className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {active.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                  {active.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3">
                  {active.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Index */}
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-7xl font-bold text-muted-foreground/20">
                  {String(modules.findIndex((m) => m.id === activeModule) + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-muted-foreground">of 10 modules</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
