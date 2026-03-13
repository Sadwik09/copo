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
import { 
  ChevronRight, 
  Download,
  RefreshCw,
  Maximize2,
  Grid3X3,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

const mockMatrix = {
  cos: ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"],
  pos: ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"],
  psos: ["PSO1", "PSO2", "PSO3"],
  coPoMapping: [
    [3, 2, 1, 0, 0, 2, 1, 0, 0, 1, 0, 2],
    [2, 3, 2, 1, 0, 0, 2, 1, 0, 0, 1, 1],
    [1, 2, 3, 2, 1, 0, 0, 2, 1, 0, 0, 2],
    [0, 1, 2, 3, 2, 1, 0, 0, 2, 1, 0, 1],
    [0, 0, 1, 2, 3, 2, 1, 0, 0, 2, 1, 2],
    [2, 0, 0, 1, 2, 3, 2, 1, 0, 0, 2, 1],
  ],
  coPsoMapping: [
    [3, 2, 1],
    [2, 3, 2],
    [1, 2, 3],
    [2, 1, 2],
    [3, 2, 1],
    [1, 3, 2],
  ],
  coAttainments: [78.5, 82.3, 65.2, 71.8, 88.1, 74.6],
  poAttainments: [72.4, 75.8, 68.9, 70.2, 74.5, 69.1, 71.3, 66.8, 68.4, 72.1, 70.8, 73.2],
  psoAttainments: [76.2, 74.8, 71.5],
}

export default function MatrixPage() {
  const [selectedCourse, setSelectedCourse] = useState("1")
  const [showPSO, setShowPSO] = useState(false)
  const [hoveredCell, setHoveredCell] = useState<{row: number, col: number} | null>(null)

  const mockCourses = [
    { id: "1", name: "CS301 - Data Structures and Algorithms" },
    { id: "2", name: "CS302 - Database Management Systems" },
  ]

  const getCellColor = (value: number) => {
    if (value === 3) return "bg-emerald-500 text-white"
    if (value === 2) return "bg-emerald-300 text-emerald-900"
    if (value === 1) return "bg-emerald-100 text-emerald-700"
    return "bg-muted/30 text-muted-foreground"
  }

  const getAttainmentColor = (value: number) => {
    if (value >= 70) return "text-emerald-600"
    if (value >= 50) return "text-amber-600"
    return "text-red-500"
  }

  const matrix = showPSO ? mockMatrix.coPsoMapping : mockMatrix.coPoMapping
  const headers = showPSO ? mockMatrix.psos : mockMatrix.pos
  const attainments = showPSO ? mockMatrix.psoAttainments : mockMatrix.poAttainments

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
              <span className="text-foreground">CO-PO Correlation Matrix</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">CO-PO Correlation Matrix</h1>
            <p className="text-muted-foreground max-w-2xl">
              Visual representation of Course Outcome to Program Outcome mapping with attainment levels
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

          <div className="flex gap-2">
            <Button
              variant={!showPSO ? "default" : "outline"}
              onClick={() => setShowPSO(false)}
              className="rounded-xl"
            >
              CO-PO Matrix
            </Button>
            <Button
              variant={showPSO ? "default" : "outline"}
              onClick={() => setShowPSO(true)}
              className="rounded-xl"
            >
              CO-PSO Matrix
            </Button>
          </div>

          <div className="flex-1" />

          <Button variant="outline" className="rounded-xl gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" className="rounded-xl gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-2">
        <div className="flex items-center gap-6 p-4 rounded-xl bg-muted/30">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Correlation Levels:</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500" />
              <span className="text-sm">3 - High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-300" />
              <span className="text-sm">2 - Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-100 border" />
              <span className="text-sm">1 - Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-muted border" />
              <span className="text-sm">0 - None</span>
            </div>
          </div>
        </div>
      </div>

      {/* Matrix */}
      <div className="px-6 py-6">
        <div className="p-6 rounded-2xl border bg-card overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left font-semibold border-b-2 border-r-2 bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Grid3X3 className="h-4 w-4 text-primary" />
                    CO / {showPSO ? "PSO" : "PO"}
                  </div>
                </th>
                {headers.map((header, idx) => (
                  <th 
                    key={header} 
                    className={cn(
                      "p-3 text-center font-semibold border-b-2 bg-muted/50 min-w-[60px]",
                      hoveredCell?.col === idx && "bg-primary/10"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{header}</span>
                      <span className={cn("text-xs", getAttainmentColor(attainments[idx]))}>
                        {attainments[idx].toFixed(1)}%
                      </span>
                    </div>
                  </th>
                ))}
                <th className="p-3 text-center font-semibold border-b-2 border-l-2 bg-muted/50">
                  CO Attainment
                </th>
              </tr>
            </thead>
            <tbody>
              {mockMatrix.cos.map((co, rowIdx) => (
                <tr key={co}>
                  <td 
                    className={cn(
                      "p-3 font-semibold border-r-2 bg-muted/30",
                      hoveredCell?.row === rowIdx && "bg-primary/10"
                    )}
                  >
                    {co}
                  </td>
                  {matrix[rowIdx].map((value, colIdx) => (
                    <td 
                      key={`${rowIdx}-${colIdx}`}
                      className={cn(
                        "p-3 text-center cursor-pointer transition-all duration-200",
                        getCellColor(value),
                        hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx && "ring-2 ring-primary ring-offset-2"
                      )}
                      onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className="text-lg font-bold">{value}</span>
                    </td>
                  ))}
                  <td className={cn(
                    "p-3 text-center font-bold border-l-2",
                    getAttainmentColor(mockMatrix.coAttainments[rowIdx])
                  )}>
                    {mockMatrix.coAttainments[rowIdx].toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
            <p className="text-sm text-muted-foreground mb-1">Average CO Attainment</p>
            <p className="text-3xl font-bold text-primary">
              {(mockMatrix.coAttainments.reduce((a, b) => a + b, 0) / mockMatrix.coAttainments.length).toFixed(1)}%
            </p>
          </div>
          <div className="flex-1 min-w-[250px] p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
            <p className="text-sm text-muted-foreground mb-1">Average {showPSO ? "PSO" : "PO"} Attainment</p>
            <p className="text-3xl font-bold text-emerald-600">
              {(attainments.reduce((a, b) => a + b, 0) / attainments.length).toFixed(1)}%
            </p>
          </div>
          <div className="flex-1 min-w-[250px] p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
            <p className="text-sm text-muted-foreground mb-1">Strong Correlations (Level 3)</p>
            <p className="text-3xl font-bold text-blue-600">
              {matrix.flat().filter(v => v === 3).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
