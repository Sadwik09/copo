'use client'

import { useState, useEffect } from 'react'
import {
  BookOpen,
  Users,
  Target,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuthStore } from '@/store/auth-store'
import { cn } from '@/lib/utils'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
} from 'recharts'

// Mock data - replace with real API calls
const mockStats = {
  totalCourses: 12,
  totalStudents: 485,
  averageCOAttainment: 76.4,
  averagePOAttainment: 72.8,
  coursesTrend: 8.5,
  studentsTrend: 12.3,
  coTrend: 4.2,
  poTrend: -2.1,
}

const mockTrendData = [
  { month: 'Jan', co: 68, po: 65 },
  { month: 'Feb', co: 72, po: 68 },
  { month: 'Mar', co: 70, po: 71 },
  { month: 'Apr', co: 75, po: 69 },
  { month: 'May', co: 78, po: 74 },
  { month: 'Jun', co: 76, po: 73 },
]

const mockRadarData = [
  { subject: 'PO1', attainment: 85, fullMark: 100 },
  { subject: 'PO2', attainment: 72, fullMark: 100 },
  { subject: 'PO3', attainment: 78, fullMark: 100 },
  { subject: 'PO4', attainment: 65, fullMark: 100 },
  { subject: 'PO5', attainment: 82, fullMark: 100 },
  { subject: 'PO6', attainment: 70, fullMark: 100 },
]

const mockCourseAttainment = [
  { name: 'DBMS', co: 82, po: 78 },
  { name: 'OS', co: 75, po: 72 },
  { name: 'CN', co: 68, po: 65 },
  { name: 'SE', co: 85, po: 80 },
  { name: 'ML', co: 72, po: 70 },
]

const mockActivities = [
  { type: 'upload', description: 'Marks uploaded for DBMS - Internal 2', time: '2 hours ago' },
  { type: 'generate', description: 'AI generated COs for Machine Learning course', time: '4 hours ago' },
  { type: 'calculate', description: 'CO attainment calculated for Operating Systems', time: '6 hours ago' },
  { type: 'mapping', description: 'CO-PO mapping updated for Computer Networks', time: '1 day ago' },
]

const mockInsights = [
  {
    type: 'warning' as const,
    title: 'Low Attainment Alert',
    description: 'CO3 of Computer Networks has attainment below 50%',
  },
  {
    type: 'success' as const,
    title: 'Target Achieved',
    description: 'DBMS course has achieved all CO targets',
  },
  {
    type: 'info' as const,
    title: 'Pending Action',
    description: '3 courses pending CO-PO mapping',
  },
]

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="h-12 bg-muted rounded-lg w-1/3" />
        <div className="flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 h-32 bg-muted rounded-xl" />
          ))}
        </div>
        <div className="flex gap-6">
          <div className="flex-1 h-80 bg-muted rounded-xl" />
          <div className="w-80 h-80 bg-muted rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your courses today.
          </p>
        </div>
        <Button className="gap-2">
          <Sparkles className="w-4 h-4" />
          AI Insights
        </Button>
      </div>

      {/* Stats Overview - Timeline Layout */}
      <div className="flex gap-6">
        <StatItem
          icon={<BookOpen className="w-5 h-5" />}
          label="Total Courses"
          value={mockStats.totalCourses}
          trend={mockStats.coursesTrend}
          color="primary"
        />
        <StatItem
          icon={<Users className="w-5 h-5" />}
          label="Total Students"
          value={mockStats.totalStudents}
          trend={mockStats.studentsTrend}
          color="accent"
        />
        <StatItem
          icon={<Target className="w-5 h-5" />}
          label="Avg CO Attainment"
          value={`${mockStats.averageCOAttainment}%`}
          trend={mockStats.coTrend}
          color="primary"
        />
        <StatItem
          icon={<TrendingUp className="w-5 h-5" />}
          label="Avg PO Attainment"
          value={`${mockStats.averagePOAttainment}%`}
          trend={mockStats.poTrend}
          color="accent"
        />
      </div>

      {/* Main Content - Progressive Disclosure */}
      <div className="flex gap-6">
        {/* Attainment Trends */}
        <div className="flex-1 bg-background border border-border/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Attainment Trends</h2>
              <p className="text-sm text-muted-foreground">CO & PO attainment over time</p>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData}>
                <defs>
                  <linearGradient id="coGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="poGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="co"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#coGradient)"
                  name="CO Attainment"
                />
                <Area
                  type="monotone"
                  dataKey="po"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  fill="url(#poGradient)"
                  name="PO Attainment"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">CO Attainment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">PO Attainment</span>
            </div>
          </div>
        </div>

        {/* PO Radar Chart */}
        <div className="w-96 bg-background border border-border/50 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">PO Distribution</h2>
            <p className="text-sm text-muted-foreground">Program outcome attainment levels</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={mockRadarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Radar
                  name="Attainment"
                  dataKey="attainment"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Content */}
      <div className="flex gap-6">
        {/* Course Attainment Comparison */}
        <div className="flex-1 bg-background border border-border/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Course Attainment</h2>
              <p className="text-sm text-muted-foreground">Comparison across courses</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCourseAttainment} barGap={8}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="co" name="CO" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="po" name="PO" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="w-80 bg-background border border-border/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            {mockInsights.map((insight, index) => (
              <InsightItem key={index} {...insight} />
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-background border border-border/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">Latest actions in your system</p>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4">
            {mockActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatItem({
  icon,
  label,
  value,
  trend,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  trend: number
  color: 'primary' | 'accent'
}) {
  const isPositive = trend >= 0

  return (
    <div className="flex-1 bg-background border border-border/50 rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
          )}
        >
          {icon}
        </div>
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
            isPositive ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'
          )}
        >
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  )
}

function InsightItem({
  type,
  title,
  description,
}: {
  type: 'success' | 'warning' | 'info'
  title: string
  description: string
}) {
  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-accent" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    info: <Info className="w-4 h-4 text-primary" />,
  }

  const colors = {
    success: 'bg-accent/10 border-accent/20',
    warning: 'bg-amber-500/10 border-amber-500/20',
    info: 'bg-primary/10 border-primary/20',
  }

  return (
    <div className={cn('p-3 rounded-lg border', colors[type])}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icons[type]}</div>
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  )
}
