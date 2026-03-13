"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronRight, 
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Target,
  Activity
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts"

const coAttainmentData = [
  { name: "CO1", attainment: 78.5, target: 70 },
  { name: "CO2", attainment: 82.3, target: 70 },
  { name: "CO3", attainment: 65.2, target: 70 },
  { name: "CO4", attainment: 71.8, target: 70 },
  { name: "CO5", attainment: 88.1, target: 70 },
  { name: "CO6", attainment: 74.6, target: 70 },
]

const bloomDistribution = [
  { name: "Remember", value: 15, color: "#3b82f6" },
  { name: "Understand", value: 22, color: "#10b981" },
  { name: "Apply", value: 28, color: "#f59e0b" },
  { name: "Analyze", value: 20, color: "#8b5cf6" },
  { name: "Evaluate", value: 10, color: "#ef4444" },
  { name: "Create", value: 5, color: "#ec4899" },
]

const gradeDistribution = [
  { grade: "A+", count: 8, percentage: 14.5 },
  { grade: "A", count: 12, percentage: 21.8 },
  { grade: "B+", count: 15, percentage: 27.3 },
  { grade: "B", count: 10, percentage: 18.2 },
  { grade: "C", count: 6, percentage: 10.9 },
  { grade: "D", count: 3, percentage: 5.5 },
  { grade: "F", count: 1, percentage: 1.8 },
]

const semesterTrend = [
  { semester: "Fall 2022", co: 65.2, po: 58.4 },
  { semester: "Spring 2023", co: 68.7, po: 62.1 },
  { semester: "Fall 2023", co: 72.3, po: 66.8 },
  { semester: "Spring 2024", co: 75.8, po: 70.2 },
  { semester: "Fall 2024", co: 77.18, po: 72.45 },
]

const radarData = [
  { subject: "CO1", A: 78.5, fullMark: 100 },
  { subject: "CO2", A: 82.3, fullMark: 100 },
  { subject: "CO3", A: 65.2, fullMark: 100 },
  { subject: "CO4", A: 71.8, fullMark: 100 },
  { subject: "CO5", A: 88.1, fullMark: 100 },
  { subject: "CO6", A: 74.6, fullMark: 100 },
]

export default function AnalyticsPage() {
  const [selectedCourse, setSelectedCourse] = useState("1")
  const [activeTab, setActiveTab] = useState("overview")

  const mockCourses = [
    { id: "1", name: "CS301 - Data Structures and Algorithms" },
    { id: "2", name: "CS302 - Database Management Systems" },
    { id: "3", name: "CS303 - Operating Systems" },
  ]

  const stats = {
    avgCoAttainment: 76.75,
    avgPoAttainment: 72.45,
    totalStudents: 55,
    passRate: 94.5
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
              <span className="text-foreground">Analytics</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Visualization</h1>
            <p className="text-muted-foreground max-w-2xl">
              Comprehensive charts and visualizations for OBE attainment data
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[300px] rounded-xl">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {mockCourses.map(course => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <Button variant="outline" className="rounded-xl gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" className="rounded-xl gap-2">
            <Download className="h-4 w-4" />
            Export Charts
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg CO Attainment</p>
                <p className="text-2xl font-bold text-primary">{stats.avgCoAttainment}%</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg PO Attainment</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.avgPoAttainment}%</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10">
                <Activity className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pass Rate</p>
                <p className="text-2xl font-bold text-amber-600">{stats.passRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="px-6 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="rounded-xl mb-6">
            <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
            <TabsTrigger value="bloom" className="rounded-lg">Bloom's Analysis</TabsTrigger>
            <TabsTrigger value="grades" className="rounded-lg">Grade Distribution</TabsTrigger>
            <TabsTrigger value="trends" className="rounded-lg">Semester Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* CO Attainment Bar Chart */}
              <div className="flex-1 p-6 rounded-2xl border bg-card">
                <h3 className="text-lg font-semibold mb-4">CO Attainment vs Target</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={coAttainmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                        formatter={(value: number) => [`${value}%`]}
                      />
                      <Legend />
                      <Bar dataKey="attainment" name="Attainment" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" name="Target" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="flex-1 p-6 rounded-2xl border bg-card">
                <h3 className="text-lg font-semibold mb-4">CO Distribution Radar</h3>
                <div className="h-[350px]">
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

          <TabsContent value="bloom" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Bloom's Pie Chart */}
              <div className="flex-1 p-6 rounded-2xl border bg-card">
                <h3 className="text-lg font-semibold mb-4">Bloom's Level Distribution</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={bloomDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bloomDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bloom's Bar Chart */}
              <div className="flex-1 p-6 rounded-2xl border bg-card">
                <h3 className="text-lg font-semibold mb-4">Questions per Bloom's Level</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bloomDistribution} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#6b7280" />
                      <YAxis dataKey="name" type="category" stroke="#6b7280" width={80} />
                      <Tooltip 
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                        formatter={(value: number) => [`${value} questions`]}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {bloomDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grades" className="mt-0">
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="grade" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                      formatter={(value: number, name: string) => [
                        name === "count" ? `${value} students` : `${value}%`,
                        name === "count" ? "Count" : "Percentage"
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="count" name="Students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-0">
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="text-lg font-semibold mb-4">Attainment Trends Over Semesters</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={semesterTrend}>
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
                    <XAxis dataKey="semester" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" domain={[50, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                      formatter={(value: number) => [`${value}%`]}
                    />
                    <Legend />
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
