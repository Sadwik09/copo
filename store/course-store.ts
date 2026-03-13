'use client'

import { create } from 'zustand'
import type { Course, CourseOutcome, AIGeneratedCO } from '@/types'
import { courseService } from '@/services/courses'

interface CourseStore {
  courses: Course[]
  currentCourse: Course | null
  generatedCOs: AIGeneratedCO[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchCourses: () => Promise<void>
  fetchCourse: (id: string) => Promise<void>
  createCourse: (data: Partial<Course>) => Promise<Course>
  updateCourse: (id: string, data: Partial<Course>) => Promise<void>
  deleteCourse: (id: string) => Promise<void>
  uploadSyllabus: (courseId: string, file: File) => Promise<void>
  saveSyllabusText: (courseId: string, content: string) => Promise<void>
  generateCOs: (courseId: string) => Promise<void>
  saveCOs: (courseId: string, outcomes: CourseOutcome[]) => Promise<void>
  setCurrentCourse: (course: Course | null) => void
  clearError: () => void
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  currentCourse: null,
  generatedCOs: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await courseService.getCourses()
      set({ courses: response.data, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch courses',
        isLoading: false,
      })
    }
  },

  fetchCourse: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const course = await courseService.getCourse(id)
      set({ currentCourse: course, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch course',
        isLoading: false,
      })
    }
  },

  createCourse: async (data: Partial<Course>) => {
    set({ isLoading: true, error: null })
    try {
      const course = await courseService.createCourse(data)
      set((state) => ({
        courses: [...state.courses, course],
        isLoading: false,
      }))
      return course
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create course',
        isLoading: false,
      })
      throw error
    }
  },

  updateCourse: async (id: string, data: Partial<Course>) => {
    set({ isLoading: true, error: null })
    try {
      const updated = await courseService.updateCourse(id, data)
      set((state) => ({
        courses: state.courses.map((c) => (c.id === id ? updated : c)),
        currentCourse: state.currentCourse?.id === id ? updated : state.currentCourse,
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update course',
        isLoading: false,
      })
      throw error
    }
  },

  deleteCourse: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await courseService.deleteCourse(id)
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== id),
        currentCourse: state.currentCourse?.id === id ? null : state.currentCourse,
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete course',
        isLoading: false,
      })
      throw error
    }
  },

  uploadSyllabus: async (courseId: string, file: File) => {
    set({ isLoading: true, error: null })
    try {
      const { content } = await courseService.uploadSyllabus(courseId, file)
      const current = get().currentCourse
      if (current?.id === courseId) {
        set({ currentCourse: { ...current, syllabus: content }, isLoading: false })
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to upload syllabus',
        isLoading: false,
      })
      throw error
    }
  },

  saveSyllabusText: async (courseId: string, content: string) => {
    set({ isLoading: true, error: null })
    try {
      const course = await courseService.saveSyllabusText(courseId, content)
      set((state) => ({
        currentCourse: state.currentCourse?.id === courseId ? course : state.currentCourse,
        courses: state.courses.map((c) => (c.id === courseId ? course : c)),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to save syllabus',
        isLoading: false,
      })
      throw error
    }
  },

  generateCOs: async (courseId: string) => {
    set({ isLoading: true, error: null, generatedCOs: [] })
    try {
      const cos = await courseService.generateCourseOutcomes(courseId)
      set({ generatedCOs: cos, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate COs',
        isLoading: false,
      })
      throw error
    }
  },

  saveCOs: async (courseId: string, outcomes: CourseOutcome[]) => {
    set({ isLoading: true, error: null })
    try {
      const course = await courseService.saveCourseOutcomes(courseId, outcomes)
      set((state) => ({
        currentCourse: state.currentCourse?.id === courseId ? course : state.currentCourse,
        courses: state.courses.map((c) => (c.id === courseId ? course : c)),
        generatedCOs: [],
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to save COs',
        isLoading: false,
      })
      throw error
    }
  },

  setCurrentCourse: (course: Course | null) => set({ currentCourse: course }),
  clearError: () => set({ error: null }),
}))
