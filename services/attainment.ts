import api from './api'
import type {
  COAttainment,
  POAttainment,
  PSOAttainment,
  CourseAnalytics,
  DepartmentAnalytics,
  ApiResponse,
} from '@/types'

export const attainmentService = {
  // Calculate Attainment
  async calculateCOAttainment(courseId: string): Promise<COAttainment[]> {
    const response = await api.post<ApiResponse<COAttainment[]>>('/attainment/calculate-co', { courseId })
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to calculate CO attainment')
  },

  async calculatePOAttainment(courseId: string): Promise<POAttainment[]> {
    const response = await api.post<ApiResponse<POAttainment[]>>('/attainment/calculate-po', { courseId })
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to calculate PO attainment')
  },

  async calculatePSOAttainment(courseId: string): Promise<PSOAttainment[]> {
    const response = await api.post<ApiResponse<PSOAttainment[]>>('/attainment/calculate-pso', { courseId })
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to calculate PSO attainment')
  },

  // Get Attainment Data
  async getCOAttainment(courseId: string): Promise<COAttainment[]> {
    const response = await api.get<ApiResponse<COAttainment[]>>(`/courses/${courseId}/attainment/co`)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch CO attainment')
  },

  async getPOAttainment(courseId: string): Promise<POAttainment[]> {
    const response = await api.get<ApiResponse<POAttainment[]>>(`/courses/${courseId}/attainment/po`)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch PO attainment')
  },

  async getPSOAttainment(courseId: string): Promise<PSOAttainment[]> {
    const response = await api.get<ApiResponse<PSOAttainment[]>>(`/courses/${courseId}/attainment/pso`)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch PSO attainment')
  },

  // Analytics
  async getCourseAnalytics(courseId: string): Promise<CourseAnalytics> {
    const response = await api.get<ApiResponse<CourseAnalytics>>(`/analytics/course/${courseId}`)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch course analytics')
  },

  async getDepartmentAnalytics(department: string): Promise<DepartmentAnalytics> {
    const response = await api.get<ApiResponse<DepartmentAnalytics>>(`/analytics/department/${department}`)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch department analytics')
  },

  async getDashboardSummary(): Promise<{
    totalCourses: number
    totalStudents: number
    averageCOAttainment: number
    averagePOAttainment: number
    recentActivity: {
      type: string
      description: string
      timestamp: string
    }[]
    insights: {
      type: 'success' | 'warning' | 'info'
      title: string
      description: string
    }[]
  }> {
    const response = await api.get<
      ApiResponse<{
        totalCourses: number
        totalStudents: number
        averageCOAttainment: number
        averagePOAttainment: number
        recentActivity: {
          type: string
          description: string
          timestamp: string
        }[]
        insights: {
          type: 'success' | 'warning' | 'info'
          title: string
          description: string
        }[]
      }>
    >('/analytics/dashboard')
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch dashboard summary')
  },
}
