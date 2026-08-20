import { baseApi } from '@shared/api/baseApi'
import { Task } from '../model/types'

export const taskApi = {
	getTasks: async (params?: {
		status?: string
		search?: string
		sortBy?: string
		order?: 'asc' | 'desc'
	}) => {
		const cleanParams: Record<string, string> = {}

		if (params?.status && params.status !== 'all') {
			cleanParams.status = params.status
		}

		if (params?.search && params.search.trim() !== '') {
			cleanParams.title = params.search.trim()
		}

		if (params?.sortBy) {
			cleanParams.sortBy = params.sortBy
			cleanParams.order = params.order || 'desc'
		}

		const response = await baseApi.get<Task[]>('/tasks', {
			params: cleanParams,
		})

		return response.data
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
		const response = await baseApi.patch<Task>(`/tasks/${id}`, updates)
		return response.data
	},

	deleteTask: async (id: string): Promise<void> => {
		await baseApi.delete(`/tasks/${id}`)
	},
}
