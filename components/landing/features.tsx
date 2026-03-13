"use client"

import { useRef } from "react"
import { 
  Brain, 
  Target, 
  FileText, 
  BarChart3, 
  Zap, 
  Shield,
  BookOpen,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Brain,
    title: "AI-Powered CO Generation",
    description: "Automatically generate 4-6 course outcomes aligned with Bloom's Taxonomy from your syllabus.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Target,
    title: "Intelligent Mapping",
    description: "Smart CO-PO-PSO mapping with AI suggestions and visual matrix representation.",
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: FileText,
    title: "Question Analysis",
    description: "Upload question papers and let AI map each question to COs with Bloom's level detection.",
    color: "from-chart-3/20 to-chart-3/5",
    iconColor: "text-chart-3",
  },
  {
    icon: BarChart3,
    title: "Attainment Analytics",
    description: "Calculate CO, PO, and PSO attainment with configurable thresholds and levels.",
    color: "from-chart-4/20 to-chart-4/5",
    iconColor: "text-chart-4",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Instant calculations and updates as you input student marks and exam data.",
    color: "from-chart-5/20 to-chart-5/5",
    iconColor: "text-chart-5",
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Enterprise-grade security with role-based access for faculty and administrators.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
]

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Everything You Need for{" "}
            <span className="text-primary">OBE Excellence</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">
            Our AI-powered platform handles the complexity of outcome-based education,
            so you can focus on what matters most — teaching.
          </p>
        </div>

        {/* Features Flow */}
        <div ref={containerRef} className="relative">
          {/* Flowing connection line */}
          <svg
            className="absolute hidden lg:block left-1/2 top-0 h-full w-1 -translate-x-1/2"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.55 0.18 250 / 0.3)" />
                <stop offset="50%" stopColor="oklch(0.65 0.15 180 / 0.3)" />
                <stop offset="100%" stopColor="oklch(0.55 0.18 250 / 0.3)" />
              </linearGradient>
            </defs>
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>

          {/* Feature Items - Alternating Layout */}
          <div className="flex flex-col gap-16 lg:gap-24">
            {features.map((feature, index) => (
              <FeatureItem
                key={feature.title}
                feature={feature}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeatureItemProps {
  feature: (typeof features)[number]
  index: number
  isEven: boolean
}

function FeatureItem({ feature, index, isEven }: FeatureItemProps) {
  const Icon = feature.icon

  return (
    <div
      className={cn(
        "relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Content */}
      <div className={cn(
        "flex-1 text-center lg:text-left",
        isEven ? "lg:text-right" : "lg:text-left"
      )}>
        <div className={cn(
          "inline-flex items-center gap-2 mb-4",
          isEven ? "lg:flex-row-reverse" : ""
        )}>
          <span className="text-xs font-bold text-muted-foreground">
            0{index + 1}
          </span>
          <div className="h-px w-8 bg-border" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {feature.title}
        </h3>
        <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
          {feature.description}
        </p>
      </div>

      {/* Icon Node */}
      <div className="relative flex-shrink-0">
        <div className={cn(
          "relative flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl transition-transform duration-300 hover:scale-105",
          feature.color
        )}>
          <Icon className={cn("h-10 w-10 md:h-14 md:w-14", feature.iconColor)} />
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 animate-pulse" />
        </div>
        {/* Connection dot for desktop */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
      </div>

      {/* Empty space for alignment */}
      <div className="flex-1 hidden lg:block" />
    </div>
  )
}
