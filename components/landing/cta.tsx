"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const benefits = [
  "Free 14-day trial",
  "No credit card required",
  "Full feature access",
  "Priority support",
]

export function CTA() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] rounded-3xl" />
          
          <div className="relative px-8 py-16 md:px-16 md:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground text-balance">
                  Ready to Transform Your OBE Process?
                </h2>
                <p className="mt-6 text-lg text-primary-foreground/80 text-pretty max-w-xl mx-auto lg:mx-0">
                  Join hundreds of universities already using EduAttain AI to automate 
                  their outcome-based education workflow.
                </p>

                {/* Benefits */}
                <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-2 text-primary-foreground/90"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-14 px-8 text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    Schedule Demo
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "95%", label: "Time Saved" },
                    { value: "100+", label: "Universities" },
                    { value: "50K+", label: "Courses" },
                    { value: "99.9%", label: "Uptime" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm"
                    >
                      <span className="text-3xl md:text-4xl font-bold text-primary-foreground">
                        {stat.value}
                      </span>
                      <span className="mt-1 text-sm text-primary-foreground/70">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
