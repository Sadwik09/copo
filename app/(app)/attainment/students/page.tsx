"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ChevronRight, 
  Search,
  Download,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  BarChart3,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StudentPerformance {
  id: string
  rollNo: string
  name: string
  coScores: number[]
  overallScore: number
  status: "high" | "medium" | "low"
  trend: "up" | "down" | "stable"
}

const mockStudents: StudentPerformance[] = [
  { id: "1", rollNo: "21CS001", name: "Aanya Sharma", coScores: [85, 78, 92, 88, 76], overallScore: 83.8, status: "high", trend: "up" },
  { id: "2", rollNo: "21CS002", name: "Arjun Patel", coScores: [72, 68, 75, 82, 79], overallScore: 75.2, status: "medium", trend: "stable" },
  { id: "3", rollNo: "21CS003", name: "Diya Gupta", coScores: [88, 91, 85, 78, 92], overallScore: 86.8, status: "high", trend: "up" },
  { id: "4", rollNo: "21CS004", name: "Ishaan Kumar", coScores: [55, 62, 48, 58, 65], overallScore: 57.6, status: "low", trend: "down" },
  { id: "5", rollNo: "21CS005", name: "Kavya Reddy", coScores: [78, 82, 76, 85, 88], overallScore: 81.8, status: "high", trend: "up" },
  { id: "6", rollNo: "21CS006", name: "Lakshmi Nair", coScores: [65, 72, 68, 75, 70], overallScore: 70.0, status: "medium", trend: "stable" },
  { id: "7", rollNo: "21CS007", name: "Manish Singh", coScores: [42, 55, 38, 48, 52], overallScore: 47.0, status: "low", trend: "down" },
  { id: "8", rollNo: "21CS008", name: "Neha Joshi", coScores: [90, 88, 95, 92, 87], overallScore: 90.4, status: "high", trend: "up" },
]

const cos = ["CO1", "CO2", "CO3", "CO4", "CO5"]

export default function StudentAnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedCourse, setSelectedCourse] = useState("1")
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  const mockCourses = [
    { id: "1", name: "CS301 - Data Structures and Algorithms" },
    { id: "2", name: "CS302 - Database Management Systems" },
  ]

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || student.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: mockStudents.length,
    high: mockStudents.filter(s => s.status === "high").length,
    medium: mockStudents.filter(s => s.status === "medium").length,
    low: mockStudents.filter(s => s.status === "low").length,
    avgScore: mockStudents.reduce((acc, s) => acc + s.overallScore, 0) / mockStudents.length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "bg-emerald-100 text-emerald-700"
      case "medium": return "bg-amber-100 text-amber-700"
      case "low": return "bg-red-100 text-red-700"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "down": return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-emerald-600"
    if (score >= 50) return "text-amber-600"
    return "text-red-500"
  }

  const student = selectedStudent ? mockStudents.find(s => s.id === selectedStudent) : null

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
              <span className="text-foreground">Student Analytics</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Student Performance Analytics</h1>
            <p className="text-muted-foreground max-w-2xl">
              Analyze individual student performance across Course Outcomes
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[180px] p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[180px] p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Performers</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.high}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[180px] p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10">
                <Minus className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Medium Performers</p>
                <p className="text-2xl font-bold text-amber-600">{stats.medium}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[180px] p-5 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Need Support</p>
                <p className="text-2xl font-bold text-red-600">{stats.low}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
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

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          <div className="flex gap-2">
            {["all", "high", "medium", "low"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="rounded-xl capitalize"
              >
                {status === "all" ? "All" : status}
              </Button>
            ))}
          </div>

          <Button variant="outline" className="rounded-xl gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Student List */}
          <div className="flex-1">
            <div className="p-6 rounded-2xl border bg-card">
              <h2 className="text-lg font-semibold mb-4">Student List</h2>
              <div className="space-y-3">
                {filteredStudents.map((studentItem) => (
                  <div
                    key={studentItem.id}
                    onClick={() => setSelectedStudent(studentItem.id)}
                    className={cn(
                      "p-4 rounded-xl cursor-pointer transition-all duration-200",
                      selectedStudent === studentItem.id 
                        ? "bg-primary/10 border-2 border-primary" 
                        : "bg-muted/30 hover:bg-muted/50 border-2 border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {studentItem.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{studentItem.name}</p>
                          <p className="text-sm text-muted-foreground">{studentItem.rollNo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "text-xl font-bold",
                          getScoreColor(studentItem.overallScore)
                        )}>
                          {studentItem.overallScore.toFixed(1)}%
                        </span>
                        {getTrendIcon(studentItem.trend)}
                        <span className={cn(
                          "px-2 py-1 rounded-lg text-xs font-medium capitalize",
                          getStatusColor(studentItem.status)
                        )}>
                          {studentItem.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Detail */}
          <div className="w-full lg:w-96">
            {student ? (
              <div className="p-6 rounded-2xl border bg-card sticky top-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{student.name}</h3>
                    <p className="text-muted-foreground">{student.rollNo}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Score</p>
                      <p className={cn("text-3xl font-bold", getScoreColor(student.overallScore))}>
                        {student.overallScore.toFixed(1)}%
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(student.trend)}
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-sm font-medium capitalize",
                        getStatusColor(student.status)
                      )}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold mb-3">CO-wise Performance</h4>
                <div className="space-y-3">
                  {student.coScores.map((score, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="w-12 text-sm font-medium text-muted-foreground">
                        {cos[idx]}
                      </span>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            score >= 70 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500"
                          )}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className={cn("w-12 text-right font-bold", getScoreColor(score))}>
                        {score}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button className="w-full rounded-xl gap-2">
                    <Eye className="h-4 w-4" />
                    View Full Report
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border bg-card">
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a student to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
