import api from './api'
import type { ReportConfig, ApiResponse } from '@/types'

export const reportService = {
  async generateReport(config: ReportConfig): Promise<Blob> {
    const response = await api.post('/reports/generate', config, {
      responseType: 'blob',
    })
    return response.data
  },

  async downloadReport(reportId: string): Promise<Blob> {
    const response = await api.get(`/reports/${reportId}/download`, {
      responseType: 'blob',
    })
    return response.data
  },

  async getReportHistory(): Promise<
    {
      id: string
      name: string
      type: string
      format: string
      createdAt: string
      status: 'completed' | 'processing' | 'failed'
    }[]
  > {
    const response = await api.get<
      ApiResponse<
        {
          id: string
          name: string
          type: string
          format: string
          createdAt: string
          status: 'completed' | 'processing' | 'failed'
        }[]
      >
    >('/reports/history')
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch report history')
  },

  async deleteReport(reportId: string): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/reports/${reportId}`)
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete report')
    }
  },

  // Helper to trigger download
  downloadBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  },
}
