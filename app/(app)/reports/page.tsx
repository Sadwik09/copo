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
  FileText,
  FilePlus,
  Calendar,
  Clock,
  FileSpreadsheet,
  Eye,
  Trash2,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Report {
  id: string
  name: string
  courseCode: string
  courseName: string
  type: "pdf" | "excel"
  generatedAt: string
  size: string
  status: "ready" | "generating" | "failed"
}

const mockReports: Report[] = [
  {
    id: "1",
    name: "CS301_OBE_Report_Fall2024",
    courseCode: "CS301",
    courseName: "Data Structures and Algorithms",
    type: "pdf",
    generatedAt: "2024-03-10T14:30:00",
    size: "2.4 MB",
    status: "ready"
  },
  {
    id: "2",
    name: "CS301_Attainment_Data_Fall2024",
    courseCode: "CS301",
    courseName: "Data Structures and Algorithms",
    type: "excel",
    generatedAt: "2024-03-10T14:25:00",
    size: "1.8 MB",
    status: "ready"
  },
  {
    id: "3",
    name: "CS302_OBE_Report_Fall2024",
    courseCode: "CS302",
    courseName: "Database Management Systems",
    type: "pdf",
    generatedAt: "2024-03-09T10:15:00",
    size: "2.1 MB",
    status: "ready"
  },
  {
    id: "4",
    name: "CS303_OBE_Report_Fall2024",
    courseCode: "CS303",
    courseName: "Operating Systems",
    type: "pdf",
    generatedAt: "2024-03-08T16:45:00",
    size: "0 MB",
    status: "generating"
  },
]

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || report.type === filterType
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: mockReports.length,
    pdf: mockReports.filter(r => r.type === "pdf").length,
    excel: mockReports.filter(r => r.type === "excel").length,
    thisMonth: mockReports.filter(r => {
      const date = new Date(r.generatedAt)
      const now = new Date()
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }).length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-emerald-100 text-emerald-700"
      case "generating": return "bg-blue-100 text-blue-700"
      case "failed": return "bg-red-100 text-red-700"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="h-5 w-5 text-red-500" />
      case "excel": return <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
      default: return <FileText className="h-5 w-5" />
    }
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
              <span className="text-foreground">Reports</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">OBE Reports</h1>
            <p className="text-muted-foreground max-w-2xl">
              Generate and download comprehensive OBE attainment reports in PDF or Excel format
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[180px] p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[180px] p-5 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10">
                <FileText className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">PDF Reports</p>
                <p className="text-2xl font-bold text-red-600">{stats.pdf}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[180px] p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10">
                <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Excel Reports</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.excel}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[180px] p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-blue-600">{stats.thisMonth}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions & Filters */}
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/reports/generate">
            <Button className="rounded-xl gap-2">
              <FilePlus className="h-4 w-4" />
              Generate New Report
            </Button>
          </Link>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          <div className="flex gap-2">
            {["all", "pdf", "excel"].map((type) => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType(type)}
                className="rounded-xl capitalize"
              >
                {type === "all" ? "All Types" : type.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="px-6 py-4">
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="group p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Icon & Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="p-3 rounded-xl bg-muted/50">
                    {getTypeIcon(report.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {report.name}
                      </h3>
                      <span className={cn(
                        "px-2 py-1 rounded-lg text-xs font-medium capitalize flex-shrink-0",
                        getStatusColor(report.status)
                      )}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {report.courseCode} - {report.courseName}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(report.generatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{report.size}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {report.status === "ready" && (
                    <>
                      <Button variant="outline" size="sm" className="rounded-xl gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                      <Button size="sm" className="rounded-xl gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </>
                  )}
                  {report.status === "generating" && (
                    <Button variant="outline" size="sm" className="rounded-xl" disabled>
                      Generating...
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
