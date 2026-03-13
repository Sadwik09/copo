"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ChevronRight, 
  Plus,
  Target,
  Edit,
  Trash2,
  Search,
  GraduationCap,
  BookOpen
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgramOutcome {
  id: string
  code: string
  title: string
  description: string
  type: "PO" | "PSO"
}

const mockPOs: ProgramOutcome[] = [
  { id: "1", code: "PO1", title: "Engineering Knowledge", description: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.", type: "PO" },
  { id: "2", code: "PO2", title: "Problem Analysis", description: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.", type: "PO" },
  { id: "3", code: "PO3", title: "Design/Development of Solutions", description: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.", type: "PO" },
  { id: "4", code: "PO4", title: "Conduct Investigations", description: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.", type: "PO" },
  { id: "5", code: "PO5", title: "Modern Tool Usage", description: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.", type: "PO" },
]

const mockPSOs: ProgramOutcome[] = [
  { id: "1", code: "PSO1", title: "Software Development", description: "Ability to apply software engineering principles and practices for developing quality software for scientific and business applications.", type: "PSO" },
  { id: "2", code: "PSO2", title: "System Design", description: "Ability to design and develop computer-based systems in the areas related to algorithms, networking, web design, and cloud computing.", type: "PSO" },
  { id: "3", code: "PSO3", title: "Professional Skills", description: "Ability to employ modern computer languages, environments, and platforms in creating innovative career paths, to be an entrepreneur, and a lifelong learner.", type: "PSO" },
]

export default function ProgramsPage() {
  const [pos, setPOs] = useState<ProgramOutcome[]>(mockPOs)
  const [psos, setPSOs] = useState<ProgramOutcome[]>(mockPSOs)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"PO" | "PSO">("PO")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newOutcome, setNewOutcome] = useState({ code: "", title: "", description: "" })

  const currentList = activeTab === "PO" ? pos : psos
  const filteredList = currentList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddOutcome = () => {
    const newItem: ProgramOutcome = {
      id: Date.now().toString(),
      code: newOutcome.code,
      title: newOutcome.title,
      description: newOutcome.description,
      type: activeTab
    }
    
    if (activeTab === "PO") {
      setPOs([...pos, newItem])
    } else {
      setPSOs([...psos, newItem])
    }
    
    setNewOutcome({ code: "", title: "", description: "" })
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    if (activeTab === "PO") {
      setPOs(pos.filter(p => p.id !== id))
    } else {
      setPSOs(psos.filter(p => p.id !== id))
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
              <span className="text-foreground">Program Outcomes</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Program Outcomes Management</h1>
            <p className="text-muted-foreground max-w-2xl">
              Define and manage Program Outcomes (POs) and Program Specific Outcomes (PSOs)
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Program Outcomes</p>
                <p className="text-2xl font-bold text-foreground">{pos.length}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10">
                <BookOpen className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Program Specific Outcomes</p>
                <p className="text-2xl font-bold text-emerald-600">{psos.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Selection */}
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "PO" ? "default" : "outline"}
              onClick={() => setActiveTab("PO")}
              className="rounded-xl gap-2"
            >
              <Target className="h-4 w-4" />
              Program Outcomes (PO)
            </Button>
            <Button
              variant={activeTab === "PSO" ? "default" : "outline"}
              onClick={() => setActiveTab("PSO")}
              className="rounded-xl gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Program Specific Outcomes (PSO)
            </Button>
          </div>

          <div className="flex-1" />

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search outcomes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2">
                <Plus className="h-4 w-4" />
                Add {activeTab}
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Add New {activeTab === "PO" ? "Program Outcome" : "Program Specific Outcome"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input
                    placeholder={`e.g., ${activeTab}${currentList.length + 1}`}
                    value={newOutcome.code}
                    onChange={(e) => setNewOutcome({ ...newOutcome, code: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Enter outcome title"
                    value={newOutcome.title}
                    onChange={(e) => setNewOutcome({ ...newOutcome, title: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Enter detailed description"
                    value={newOutcome.description}
                    onChange={(e) => setNewOutcome({ ...newOutcome, description: e.target.value })}
                    className="rounded-xl min-h-[100px]"
                  />
                </div>
                <Button onClick={handleAddOutcome} className="w-full rounded-xl">
                  Add {activeTab}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Outcomes List */}
      <div className="px-6 py-4">
        <div className="space-y-4">
          {filteredList.map((item, index) => (
            <div
              key={item.id}
              className="group p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary font-bold text-lg">
                    {item.code}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl text-muted-foreground hover:text-red-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredList.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No outcomes found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try a different search term" : `Add your first ${activeTab} to get started`}
              </p>
              {!searchQuery && (
                <Button onClick={() => setIsDialogOpen(true)} className="rounded-xl gap-2">
                  <Plus className="h-4 w-4" />
                  Add {activeTab}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
