import api from './api'
import type { User, LoginCredentials, RegisterData, ApiResponse } from '@/types'

export interface AuthResponse {
  user: User
  token: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials)
    if (response.data.success && response.data.data) {
      const { token, user } = response.data.data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))
      return response.data.data
    }
    throw new Error(response.data.error || 'Login failed')
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data)
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Registration failed')
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/forgot-password', { email })
    if (response.data.success) {
      return { message: response.data.message || 'Password reset email sent' }
    }
    throw new Error(response.data.error || 'Failed to send reset email')
  },

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/reset-password', {
      token,
      newPassword,
    })
    if (response.data.success) {
      return { message: response.data.message || 'Password reset successful' }
    }
    throw new Error(response.data.error || 'Password reset failed')
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/me')
    if (response.data.success && response.data.data) {
      return response.data.data
    }
    throw new Error(response.data.error || 'Failed to get user')
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  },

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken()
  },
}
