"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Play } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      container.style.setProperty("--mouse-x", `${x * 20}px`)
      container.style.setProperty("--mouse-y", `${y * 20}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ "--mouse-x": "0px", "--mouse-y": "0px" } as React.CSSProperties}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orb */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[100px] transition-transform duration-700 ease-out"
          style={{
            background: "linear-gradient(135deg, oklch(0.55 0.18 250 / 0.5), oklch(0.65 0.15 180 / 0.3))",
            transform: "translate(var(--mouse-x), var(--mouse-y))",
          }}
        />
        {/* Secondary orb */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[80px] transition-transform duration-1000 ease-out"
          style={{
            background: "linear-gradient(135deg, oklch(0.65 0.15 180 / 0.5), oklch(0.7 0.12 140 / 0.3))",
            transform: "translate(calc(var(--mouse-x) * -0.5), calc(var(--mouse-y) * -0.5))",
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.9_0.01_250/0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.9_0.01_250/0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Education Analytics
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <span className="text-balance">
              Transform Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Outcome Based
                </span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/10 rounded-full -z-10" />
              </span>{" "}
              Education
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Automate CO-PO-PSO mapping, calculate attainment levels, and generate
            comprehensive reports with our intelligent AI chatbot system.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button
              size="lg"
              className="h-14 px-8 text-base shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base border-2 hover:bg-muted/50"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats Row */}
          <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
            {[
              { value: "95%", label: "Time Saved" },
              { value: "100+", label: "Universities" },
              { value: "50K+", label: "Courses Analyzed" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
