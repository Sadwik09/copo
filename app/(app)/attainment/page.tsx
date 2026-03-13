"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  Calculator,
  ArrowRight,
  Search,
  Filter,
  ChevronRight,
  Activity,
  Zap,
  PieChart,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseAttainment {
  id: string
  courseCode: string
  courseName: string
  semester: string
  coAttainment: number
  poAttainment: number
  psoAttainment: number
  status: "calculated" | "pending" | "in-progress"
  lastUpdated: string
}

const mockCourses: CourseAttainment[] = [
  {
    id: "1",
    courseCode: "CS301",
    courseName: "Data Structures and Algorithms",
    semester: "Fall 2024",
    coAttainment: 78.5,
    poAttainment: 72.3,
    psoAttainment: 68.9,
    status: "calculated",
    lastUpdated: "2024-03-10"
  },
  {
    id: "2",
    courseCode: "CS302",
    courseName: "Database Management Systems",
    semester: "Fall 2024",
    coAttainment: 82.1,
    poAttainment: 76.8,
    psoAttainment: 74.2,
    status: "calculated",
    lastUpdated: "2024-03-09"
  },
  {
    id: "3",
    courseCode: "CS303",
    courseName: "Operating Systems",
    semester: "Fall 2024",
    coAttainment: 0,
    poAttainment: 0,
    psoAttainment: 0,
    status: "pending",
    lastUpdated: "2024-03-08"
  },
  {
    id: "4",
    courseCode: "CS304",
    courseName: "Computer Networks",
    semester: "Fall 2024",
    coAttainment: 45.2,
    poAttainment: 0,
    psoAttainment: 0,
    status: "in-progress",
    lastUpdated: "2024-03-07"
  }
]

export default function AttainmentPage() {
  const [courses, setCourses] = useState<CourseAttainment[]>(mockCourses)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || course.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalCourses: courses.length,
    calculated: courses.filter(c => c.status === "calculated").length,
    pending: courses.filter(c => c.status === "pending").length,
    avgAttainment: courses.filter(c => c.status === "calculated").reduce((acc, c) => acc + c.coAttainment, 0) / 
                   courses.filter(c => c.status === "calculated").length || 0
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "calculated": return "bg-emerald-100 text-emerald-700"
      case "pending": return "bg-amber-100 text-amber-700"
      case "in-progress": return "bg-blue-100 text-blue-700"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getAttainmentColor = (value: number) => {
    if (value >= 70) return "text-emerald-600"
    if (value >= 50) return "text-amber-600"
    return "text-red-500"
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
              <span className="text-foreground">Attainment</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Attainment Analysis</h1>
            <p className="text-muted-foreground max-w-2xl">
              Calculate and analyze CO, PO, and PSO attainment across all courses using threshold-based algorithms
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalCourses}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10">
                <Activity className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calculated</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.calculated}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Attainment</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgAttainment.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-3">
          <Link href="/attainment/calculate">
            <Button className="rounded-xl gap-2">
              <Calculator className="h-4 w-4" />
              Calculate Attainment
            </Button>
          </Link>
          <Link href="/attainment/matrix">
            <Button variant="outline" className="rounded-xl gap-2">
              <BarChart3 className="h-4 w-4" />
              View CO-PO Matrix
            </Button>
          </Link>
          <Link href="/attainment/students">
            <Button variant="outline" className="rounded-xl gap-2">
              <Users className="h-4 w-4" />
              Student Analytics
            </Button>
          </Link>
          <Link href="/attainment/pipeline">
            <Button variant="outline" className="rounded-xl gap-2">
              <Zap className="h-4 w-4" />
              Full Pipeline
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <div className="flex gap-2">
            {["all", "calculated", "pending", "in-progress"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="rounded-xl capitalize"
              >
                {status === "all" ? "All" : status.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="px-6 py-4">
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <Link 
              key={course.id} 
              href={`/attainment/${course.id}`}
              className="block"
            >
              <div className="group p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                        {course.courseCode}
                      </span>
                      <span className={cn("px-3 py-1 rounded-lg text-sm font-medium", getStatusColor(course.status))}>
                        {course.status === "in-progress" ? "In Progress" : course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {course.courseName}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {course.semester} | Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Attainment Metrics */}
                  {course.status === "calculated" && (
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">CO Attainment</p>
                        <p className={cn("text-2xl font-bold", getAttainmentColor(course.coAttainment))}>
                          {course.coAttainment.toFixed(1)}%
                        </p>
                      </div>
                      <div className="w-px h-12 bg-border" />
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">PO Attainment</p>
                        <p className={cn("text-2xl font-bold", getAttainmentColor(course.poAttainment))}>
                          {course.poAttainment.toFixed(1)}%
                        </p>
                      </div>
                      <div className="w-px h-12 bg-border" />
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">PSO Attainment</p>
                        <p className={cn("text-2xl font-bold", getAttainmentColor(course.psoAttainment))}>
                          {course.psoAttainment.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  )}

                  {course.status === "pending" && (
                    <div className="flex items-center gap-4">
                      <p className="text-muted-foreground">No attainment data yet</p>
                      <Button size="sm" className="rounded-xl gap-2">
                        <Calculator className="h-4 w-4" />
                        Calculate
                      </Button>
                    </div>
                  )}

                  {course.status === "in-progress" && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(course.coAttainment / 100) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">CO: {course.coAttainment.toFixed(0)}%</span>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-xl gap-2">
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors hidden lg:block" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
