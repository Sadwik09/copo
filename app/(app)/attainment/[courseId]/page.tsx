"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronRight, 
  Download,
  RefreshCw,
  Target,
  BarChart3,
  PieChart,
  Users,
  TrendingUp,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from "recharts"

const mockCourse = {
  id: "1",
  code: "CS301",
  name: "Data Structures and Algorithms",
  semester: "Fall 2024",
  coAttainment: 77.18,
  poAttainment: 72.45,
  psoAttainment: 74.16,
  totalStudents: 55,
  exams: 3
}

const coData = [
  { co: "CO1", attainment: 78.5, target: 70 },
  { co: "CO2", attainment: 82.3, target: 70 },
  { co: "CO3", attainment: 65.2, target: 70 },
  { co: "CO4", attainment: 71.8, target: 70 },
  { co: "CO5", attainment: 88.1, target: 70 },
  { co: "CO6", attainment: 74.6, target: 70 },
]

const poData = [
  { po: "PO1", attainment: 72.4 },
  { po: "PO2", attainment: 75.8 },
  { po: "PO3", attainment: 68.9 },
  { po: "PO4", attainment: 70.2 },
  { po: "PO5", attainment: 74.5 },
  { po: "PO6", attainment: 69.1 },
  { po: "PO7", attainment: 71.3 },
  { po: "PO8", attainment: 66.8 },
  { po: "PO9", attainment: 68.4 },
  { po: "PO10", attainment: 72.1 },
  { po: "PO11", attainment: 70.8 },
  { po: "PO12", attainment: 73.2 },
]

const psoData = [
  { pso: "PSO1", attainment: 76.2 },
  { pso: "PSO2", attainment: 74.8 },
  { pso: "PSO3", attainment: 71.5 },
]

const trendData = [
  { exam: "IA1", co: 68.5, po: 62.3 },
  { exam: "IA2", co: 72.1, po: 68.9 },
  { exam: "Mid", co: 75.8, po: 70.5 },
  { exam: "IA3", co: 78.2, po: 73.1 },
  { exam: "End", co: 77.18, po: 72.45 },
]

const radarData = [
  { subject: "CO1", A: 78.5 },
  { subject: "CO2", A: 82.3 },
  { subject: "CO3", A: 65.2 },
  { subject: "CO4", A: 71.8 },
  { subject: "CO5", A: 88.1 },
  { subject: "CO6", A: 74.6 },
]

export default function CourseAttainmentPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const getBarColor = (value: number) => {
    if (value >= 70) return "#10b981"
    if (value >= 50) return "#f59e0b"
    return "#ef4444"
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
              <span className="text-foreground">{mockCourse.code}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium">
                {mockCourse.code}
              </span>
              <h1 className="text-3xl font-bold text-foreground">{mockCourse.name}</h1>
            </div>
            <p className="text-muted-foreground">
              {mockCourse.semester} | {mockCourse.totalStudents} Students | {mockCourse.exams} Exams
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[220px] p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CO Attainment</p>
                <p className="text-3xl font-bold text-primary">{mockCourse.coAttainment}%</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[220px] p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">PO Attainment</p>
                <p className="text-3xl font-bold text-emerald-600">{mockCourse.poAttainment}%</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[220px] p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">PSO Attainment</p>
                <p className="text-3xl font-bold text-blue-600">{mockCourse.psoAttainment}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList className="rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
              <TabsTrigger value="co" className="rounded-lg">CO Analysis</TabsTrigger>
              <TabsTrigger value="po" className="rounded-lg">PO Analysis</TabsTrigger>
              <TabsTrigger value="pso" className="rounded-lg">PSO Analysis</TabsTrigger>
              <TabsTrigger value="trends" className="rounded-lg">Trends</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl gap-2">
                <RefreshCw className="h-4 w-4" />
                Recalculate
              </Button>
              <Button variant="outline" className="rounded-xl gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Link href="/reports/generate">
                <Button className="rounded-xl gap-2">
                  <FileText className="h-4 w-4" />
                  Generate Report
                </Button>
              </Link>
            </div>
          </div>

          <TabsContent value="overview" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* CO Bar Chart */}
              <div className="flex-1 p-6 rounded-2xl border bg-card">
                <h3 className="text-lg font-semibold mb-4">CO Attainment</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={coData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="co" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                        formatter={(value: number) => [`${value}%`, "Attainment"]}
                      />
                      <Bar dataKey="attainment" radius={[8, 8, 0, 0]}>
                        {coData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBarColor(entry.attainment)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="flex-1 p-6 rounded-2xl border bg-card">
                <h3 className="text-lg font-semibold mb-4">CO Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                      <PolarRadiusAxis domain={[0, 100]} stroke="#6b7280" />
                      <Radar
                        name="Attainment"
                        dataKey="A"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="co" className="mt-0">
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="text-lg font-semibold mb-6">Course Outcome Analysis</h3>
              <div className="space-y-4">
                {coData.map((co) => (
                  <div key={co.co} className="p-4 rounded-xl bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-primary">{co.co}</span>
                        <span className={cn(
                          "px-2 py-1 rounded-lg text-xs font-medium",
                          co.attainment >= co.target 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-red-100 text-red-700"
                        )}>
                          {co.attainment >= co.target ? "Target Met" : "Below Target"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={cn(
                          "text-2xl font-bold",
                          co.attainment >= 70 ? "text-emerald-600" : co.attainment >= 50 ? "text-amber-600" : "text-red-500"
                        )}>
                          {co.attainment}%
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">/ {co.target}% target</span>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          co.attainment >= 70 ? "bg-emerald-500" : co.attainment >= 50 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${co.attainment}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="po" className="mt-0">
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="text-lg font-semibold mb-4">Program Outcome Analysis</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={poData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
                    <YAxis dataKey="po" type="category" stroke="#6b7280" width={50} />
                    <Tooltip 
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                      formatter={(value: number) => [`${value}%`, "Attainment"]}
                    />
                    <Bar dataKey="attainment" radius={[0, 8, 8, 0]}>
                      {poData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry.attainment)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pso" className="mt-0">
            <div className="flex flex-wrap gap-6">
              {psoData.map((pso) => (
                <div key={pso.pso} className="flex-1 min-w-[280px] p-6 rounded-2xl border bg-card">
                  <h3 className="text-lg font-semibold mb-4">{pso.pso}</h3>
                  <div className="relative pt-8">
                    <div className="flex items-center justify-center">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-muted"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${pso.attainment * 4.4} 440`}
                            strokeLinecap="round"
                            className={cn(
                              pso.attainment >= 70 ? "text-emerald-500" : pso.attainment >= 50 ? "text-amber-500" : "text-red-500"
                            )}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={cn(
                            "text-3xl font-bold",
                            pso.attainment >= 70 ? "text-emerald-600" : pso.attainment >= 50 ? "text-amber-600" : "text-red-500"
                          )}>
                            {pso.attainment}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-0">
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="text-lg font-semibold mb-4">Attainment Trends Across Exams</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorCo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="exam" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                      formatter={(value: number) => [`${value}%`]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="co" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorCo)" 
                      name="CO Attainment"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="po" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorPo)" 
                      name="PO Attainment"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
