import api from './api'
import type {
  Examination,
  Question,
  ApiResponse,
  QuestionAnalysis,
  StudentExamResult,
  StudentMark,
} from '@/types'

export const examinationService = {
  // Examination CRUD
  async getExaminations(courseId: string): Promise<Examination[]> {
    const response = await api.get<ApiResponse<Examination[]>>(`/courses/${courseId}/exams`)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch examinations')
  },

  async getExamination(courseId: string, examId: string): Promise<Examination> {
    const response = await api.get<ApiResponse<Examination>>(`/courses/${courseId}/exams/${examId}`)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch examination')
  },

  async createExamination(courseId: string, data: Partial<Examination>): Promise<Examination> {
    const response = await api.post<ApiResponse<Examination>>(`/courses/${courseId}/exams`, data)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to create examination')
  },

  async updateExamination(courseId: string, examId: string, data: Partial<Examination>): Promise<Examination> {
    const response = await api.put<ApiResponse<Examination>>(`/courses/${courseId}/exams/${examId}`, data)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to update examination')
  },

  async deleteExamination(courseId: string, examId: string): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/courses/${courseId}/exams/${examId}`)
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete examination')
    }
  },

  // Questions
  async uploadQuestions(courseId: string, examId: string, file: File): Promise<Question[]> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post<ApiResponse<Question[]>>(
      `/courses/${courseId}/exams/${examId}/questions/upload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to upload questions')
  },

  async addQuestion(courseId: string, examId: string, question: Partial<Question>): Promise<Question> {
    const response = await api.post<ApiResponse<Question>>(
      `/courses/${courseId}/exams/${examId}/questions`,
      question
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to add question')
  },

  async updateQuestion(
    courseId: string,
    examId: string,
    questionId: string,
    data: Partial<Question>
  ): Promise<Question> {
    const response = await api.put<ApiResponse<Question>>(
      `/courses/${courseId}/exams/${examId}/questions/${questionId}`,
      data
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to update question')
  },

  async deleteQuestion(courseId: string, examId: string, questionId: string): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(
      `/courses/${courseId}/exams/${examId}/questions/${questionId}`
    )
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete question')
    }
  },

  // AI Question Analysis
  async analyzeQuestions(courseId: string, examId: string): Promise<QuestionAnalysis[]> {
    const response = await api.post<ApiResponse<QuestionAnalysis[]>>(`/ai/analyze-questions`, {
      courseId,
      examId,
    })
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to analyze questions')
  },

  // Student Marks
  async uploadMarks(courseId: string, examId: string, file: File): Promise<StudentMark[]> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post<ApiResponse<StudentMark[]>>(
      `/courses/${courseId}/exams/${examId}/marks/upload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to upload marks')
  },

  async saveMarks(courseId: string, examId: string, marks: StudentMark[]): Promise<StudentMark[]> {
    const response = await api.post<ApiResponse<StudentMark[]>>(
      `/courses/${courseId}/exams/${examId}/marks`,
      { marks }
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to save marks')
  },

  async getStudentResults(courseId: string, examId: string): Promise<StudentExamResult[]> {
    const response = await api.get<ApiResponse<StudentExamResult[]>>(
      `/courses/${courseId}/exams/${examId}/results`
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch student results')
  },
}
