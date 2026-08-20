import { baseApi } from '@shared/api/baseApi'
import { Task, TaskQueryParams } from '../model/types'
import axios from 'axios'

export const taskApi = {
	getTasks: async (params?: TaskQueryParams): Promise<Task[]> => {
		try {
			const cleanParams: Record<string, string | number> = {}

			if (params?.status && params.status !== 'all') {
				cleanParams.status = params.status
			}

			const query = params?.search?.trim() || params?.title?.trim()
			if (query) {
				cleanParams.search = query
			}

			if (params?.sortBy) {
				cleanParams.sortBy = params.sortBy
				cleanParams.order = params.order || 'desc'
			}

			if (params?.page) cleanParams.page = params.page
			if (params?.limit) cleanParams.limit = params.limit

			const response = await baseApi.get<Task[]>('/tasks', {
				params: cleanParams,
			})

			return Array.isArray(response.data) ? response.data : []
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return []
			}
			throw error
		}
	},

	getTaskById: async (id: string): Promise<Task> => {
		const response = await baseApi.get<Task>(`/tasks/${id}`)
		return response.data
	},

	createTask: async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
		const response = await baseApi.post<Task>('/tasks', {
			...task,
			createdAt: new Date().toISOString(),
		})
		return response.data
	},

	updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
		const response = await baseApi.put<Task>(`/tasks/${id}`, updates)
		return response.data
	},

	deleteTask: async (id: string): Promise<void> => {
		await baseApi.delete(`/tasks/${id}`)
	},
}
