import api from './api'
import type {
  Course,
  CourseOutcome,
  ApiResponse,
  PaginatedResponse,
  AIGeneratedCO,
  POMapping,
  PSOMapping,
} from '@/types'

export const courseService = {
  // Course CRUD
  async getCourses(page = 1, pageSize = 10): Promise<PaginatedResponse<Course>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Course>>>('/courses', {
      params: { page, pageSize },
    })
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch courses')
  },

  async getCourse(id: string): Promise<Course> {
    const response = await api.get<ApiResponse<Course>>(`/courses/${id}`)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch course')
  },

  async createCourse(data: Partial<Course>): Promise<Course> {
    const response = await api.post<ApiResponse<Course>>('/courses', data)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to create course')
  },

  async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
    const response = await api.put<ApiResponse<Course>>(`/courses/${id}`, data)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to update course')
  },

  async deleteCourse(id: string): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/courses/${id}`)
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete course')
    }
  },

  // Syllabus
  async uploadSyllabus(courseId: string, file: File): Promise<{ url: string; content: string }> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post<ApiResponse<{ url: string; content: string }>>(
      `/courses/${courseId}/syllabus/upload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to upload syllabus')
  },

  async saveSyllabusText(courseId: string, content: string): Promise<Course> {
    const response = await api.post<ApiResponse<Course>>(`/courses/${courseId}/syllabus`, { content })
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to save syllabus')
  },

  // AI Course Outcome Generation
  async generateCourseOutcomes(courseId: string): Promise<AIGeneratedCO[]> {
    const response = await api.post<ApiResponse<AIGeneratedCO[]>>(`/ai/generate-co`, { courseId })
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to generate course outcomes')
  },

  async saveCourseOutcomes(courseId: string, outcomes: CourseOutcome[]): Promise<Course> {
    const response = await api.post<ApiResponse<Course>>(`/courses/${courseId}/outcomes`, { outcomes })
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to save course outcomes')
  },

  // CO-PO-PSO Mapping
  async getAISuggestedMappings(
    courseId: string
  ): Promise<{ poMappings: POMapping[]; psoMappings: PSOMapping[] }[]> {
    const response = await api.post<ApiResponse<{ poMappings: POMapping[]; psoMappings: PSOMapping[] }[]>>(
      `/ai/map-co-po`,
      { courseId }
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to get AI suggested mappings')
  },

  async saveMappings(
    courseId: string,
    coId: string,
    mappings: { poMappings: POMapping[]; psoMappings: PSOMapping[] }
  ): Promise<CourseOutcome> {
    const response = await api.put<ApiResponse<CourseOutcome>>(
      `/courses/${courseId}/outcomes/${coId}/mappings`,
      mappings
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to save mappings')
  },
}
