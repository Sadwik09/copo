'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { BookOpen, Brain, Target, TrendingUp } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo & Title */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Brain className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">EduAttain AI</h1>
                <p className="text-sm text-muted-foreground">CO-PO-PSO Mapping System</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground leading-tight">
              Transform Your<br />
              <span className="text-primary">Academic Assessment</span>
            </h2>

            <div className="space-y-6">
              <FeatureItem
                icon={<BookOpen className="w-5 h-5" />}
                title="AI-Powered CO Generation"
                description="Automatically generate course outcomes from your syllabus"
              />
              <FeatureItem
                icon={<Target className="w-5 h-5" />}
                title="Intelligent Mapping"
                description="Smart CO-PO-PSO mapping with AI suggestions"
              />
              <FeatureItem
                icon={<TrendingUp className="w-5 h-5" />}
                title="Real-time Analytics"
                description="Track attainment levels with interactive dashboards"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-muted-foreground">
            <p>Outcome Based Education made simple.</p>
            <p className="mt-1">Trusted by leading universities.</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  )
}
