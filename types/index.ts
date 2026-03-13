// User and Authentication Types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'faculty' | 'hod'
  department?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  department: string
}

// Course Types
export interface Course {
  id: string
  name: string
  code: string
  credits: number
  semester: number
  department: string
  description?: string
  syllabus?: string
  syllabusFileUrl?: string
  courseOutcomes: CourseOutcome[]
  createdAt: string
  updatedAt: string
}

export interface CourseOutcome {
  id: string
  code: string
  description: string
  bloomLevel: BloomLevel
  poMappings: POMapping[]
  psoMappings: PSOMapping[]
}

export type BloomLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create'

export interface POMapping {
  poId: string
  poCode: string
  strength: 1 | 2 | 3
}

export interface PSOMapping {
  psoId: string
  psoCode: string
  strength: 1 | 2 | 3
}

// Program Outcomes
export interface ProgramOutcome {
  id: string
  code: string
  description: string
  category: string
}

export interface ProgramSpecificOutcome {
  id: string
  code: string
  description: string
}

// Examination Types
export interface Examination {
  id: string
  courseId: string
  name: string
  type: 'internal' | 'external' | 'assignment' | 'lab'
  totalMarks: number
  passingMarks: number
  date?: string
  questions: Question[]
}

export interface Question {
  id: string
  examId: string
  questionNumber: string
  text: string
  maxMarks: number
  coMapping: string[]
  bloomLevel: BloomLevel
  subQuestions?: SubQuestion[]
}

export interface SubQuestion {
  id: string
  questionNumber: string
  text: string
  maxMarks: number
  coMapping: string[]
  bloomLevel: BloomLevel
}

// Student and Marks Types
export interface Student {
  id: string
  rollNumber: string
  name: string
  email?: string
  semester: number
  department: string
}

export interface StudentMark {
  id: string
  studentId: string
  examId: string
  questionId: string
  marksObtained: number
}

export interface StudentExamResult {
  studentId: string
  studentName: string
  rollNumber: string
  examId: string
  totalMarks: number
  obtainedMarks: number
  questionWiseMarks: {
    questionId: string
    questionNumber: string
    maxMarks: number
    obtainedMarks: number
  }[]
}

// Attainment Types
export interface COAttainment {
  coId: string
  coCode: string
  targetAttainment: number
  actualAttainment: number
  attainmentLevel: 0 | 1 | 2 | 3
  directAttainment: number
  indirectAttainment: number
  totalStudents: number
  studentsAboveThreshold: number
}

export interface POAttainment {
  poId: string
  poCode: string
  description: string
  targetAttainment: number
  actualAttainment: number
  attainmentLevel: 0 | 1 | 2 | 3
  contributingCOs: {
    coCode: string
    contribution: number
    mappingStrength: number
  }[]
}

export interface PSOAttainment {
  psoId: string
  psoCode: string
  description: string
  targetAttainment: number
  actualAttainment: number
  attainmentLevel: 0 | 1 | 2 | 3
  contributingCOs: {
    coCode: string
    contribution: number
    mappingStrength: number
  }[]
}

// Analytics Types
export interface CourseAnalytics {
  courseId: string
  courseName: string
  courseCode: string
  overallCOAttainment: number
  overallPOAttainment: number
  coAttainments: COAttainment[]
  poAttainments: POAttainment[]
  psoAttainments: PSOAttainment[]
  examWiseAnalysis: ExamAnalysis[]
}

export interface ExamAnalysis {
  examId: string
  examName: string
  averageScore: number
  passPercentage: number
  highestScore: number
  lowestScore: number
  standardDeviation: number
}

export interface DepartmentAnalytics {
  department: string
  totalCourses: number
  averageCOAttainment: number
  averagePOAttainment: number
  courseWiseAttainment: {
    courseCode: string
    courseName: string
    coAttainment: number
    poAttainment: number
  }[]
}

// Report Types
export interface ReportConfig {
  reportType: 'course' | 'department' | 'semester'
  courseId?: string
  department?: string
  semester?: number
  includeCharts: boolean
  includeDetailedAnalysis: boolean
  format: 'pdf' | 'excel'
}

// Chat Types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  metadata?: {
    type?: 'text' | 'chart' | 'table' | 'report'
    data?: unknown
  }
}

export interface ChatSession {
  id: string
  userId: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// AI Generation Types
export interface AIGeneratedCO {
  code: string
  description: string
  bloomLevel: BloomLevel
  confidence: number
  suggestedPOMappings: {
    poCode: string
    strength: 1 | 2 | 3
  }[]
}

export interface QuestionAnalysis {
  questionId: string
  questionNumber: string
  text: string
  detectedCO: string[]
  detectedBloomLevel: BloomLevel
  confidence: number
  suggestions: string[]
}

// Navigation Types
export interface NavItem {
  title: string
  href: string
  icon: string
  badge?: string
  children?: NavItem[]
}

// Form Types
export interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

// Notification Types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
}
