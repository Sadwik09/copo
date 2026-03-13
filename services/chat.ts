import api from './api'
import type { ChatMessage, ChatSession, ApiResponse } from '@/types'

export const chatService = {
  async sendMessage(
    sessionId: string | null,
    message: string
  ): Promise<{ session: ChatSession; response: ChatMessage }> {
    const response = await api.post<ApiResponse<{ session: ChatSession; response: ChatMessage }>>(
      '/chat/message',
      {
        sessionId,
        message,
      }
    )
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to send message')
  },

  async getSession(sessionId: string): Promise<ChatSession> {
    const response = await api.get<ApiResponse<ChatSession>>(`/chat/sessions/${sessionId}`)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch session')
  },

  async getSessions(): Promise<ChatSession[]> {
    const response = await api.get<ApiResponse<ChatSession[]>>('/chat/sessions')
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to fetch sessions')
  },

  async createSession(): Promise<ChatSession> {
    const response = await api.post<ApiResponse<ChatSession>>('/chat/sessions')
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to create session')
  },

  async deleteSession(sessionId: string): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/chat/sessions/${sessionId}`)
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete session')
    }
  },

  // Streaming chat (for real-time responses)
  streamMessage(sessionId: string | null, message: string, onChunk: (chunk: string) => void): () => void {
    const controller = new AbortController()

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify({ sessionId, message }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const reader = response.body?.getReader()
        if (!reader) return

        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          onChunk(chunk)
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Stream error:', error)
        }
      })

    return () => controller.abort()
  },
}
