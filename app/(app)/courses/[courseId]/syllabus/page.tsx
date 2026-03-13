'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Upload, FileText, FileUp, Check, Sparkles, Eye, Edit2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export default function SyllabusPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('text')
  const [syllabusText, setSyllabusText] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [extractedContent, setExtractedContent] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      setUploadedFile(file)
      // Simulate content extraction
      setTimeout(() => {
        setExtractedContent(`Extracted content from ${file.name}:

Unit 1: Introduction to Database Systems
- Database concepts and characteristics
- DBMS architecture and data independence
- Database users and administrators

Unit 2: Data Modeling
- Entity-Relationship model
- Enhanced ER features
- Object-based data models

Unit 3: Relational Model
- Relational algebra
- Relational calculus
- SQL fundamentals

Unit 4: Database Design
- Functional dependencies
- Normalization (1NF, 2NF, 3NF, BCNF)
- Database design methodology

Unit 5: Transaction Processing
- ACID properties
- Concurrency control
- Recovery techniques`)
      }, 1500)
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Simulate content extraction
      setTimeout(() => {
        setExtractedContent(`Extracted content from ${file.name}...`)
      }, 1500)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    router.push(`/courses/${courseId}/generate-co`)
  }

  const currentContent = activeTab === 'upload' ? extractedContent : syllabusText

  return (
    <div className="p-8 space-y-6">
      {/* Back Link */}
      <Link
        href={`/courses/${courseId}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Course
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Upload Syllabus</h1>
          <p className="text-muted-foreground mt-1">
            Add your course syllabus to enable AI-powered course outcome generation
          </p>
        </div>
        <div className="flex items-center gap-3">
          {currentContent && (
            <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
              {isPreviewMode ? <Edit2 className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
          )}
          <Button onClick={handleSave} disabled={!currentContent || isSaving}>
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save & Continue
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Input Section */}
        <div className="flex-1 bg-background border border-border/50 rounded-xl overflow-hidden">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upload' | 'text')}>
            <div className="border-b border-border/50 px-6 py-3">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="text" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Text Input
                </TabsTrigger>
                <TabsTrigger value="upload" className="gap-2">
                  <Upload className="w-4 h-4" />
                  File Upload
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="text" className="p-6 m-0">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Paste or type your course syllabus content below. Include unit titles, topics, and learning
                    objectives for best results.
                  </p>
                </div>
                <Textarea
                  placeholder={`Enter your syllabus here...

Example:
Unit 1: Introduction to Database Systems
- Database concepts and characteristics
- DBMS architecture
- Data models

Unit 2: Data Modeling
- Entity-Relationship model
- ER diagrams
- Cardinality and participation`}
                  value={syllabusText}
                  onChange={(e) => setSyllabusText(e.target.value)}
                  className="min-h-[400px] font-mono text-sm resize-none"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{syllabusText.length} characters</span>
                  <span>{syllabusText.split('\n').filter((l) => l.trim()).length} lines</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="p-6 m-0">
              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    'border-2 border-dashed rounded-xl p-12 text-center transition-all',
                    isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  )}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <FileUp className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Drop your file here</h3>
                    <p className="text-muted-foreground mt-1">or click to browse</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      Supports PDF and Word documents (max 10MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Uploaded File Info */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setUploadedFile(null)
                        setExtractedContent(null)
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Extraction Status */}
                  {!extractedContent ? (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <span className="text-sm text-muted-foreground">Extracting content from document...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-accent">
                        <Check className="w-5 h-5" />
                        <span className="text-sm font-medium">Content extracted successfully</span>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                        <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                          {extractedContent}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview/Tips Section */}
        <div className="w-80 space-y-4">
          {/* AI Tips */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">AI Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Include clear unit or module titles
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                List specific topics under each unit
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Add learning objectives if available
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Include practical/lab components
              </li>
            </ul>
          </div>

          {/* Preview */}
          {isPreviewMode && currentContent && (
            <div className="bg-background border border-border/50 rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-3">Preview</h3>
              <div className="max-h-[400px] overflow-y-auto">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                  {currentContent}
                </pre>
              </div>
            </div>
          )}

          {/* Next Step */}
          <div className="bg-muted/30 border border-border/50 rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-2">Next Step</h3>
            <p className="text-sm text-muted-foreground">
              After saving the syllabus, you can generate Course Outcomes using AI assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
