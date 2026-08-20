import { baseApi } from '@shared/api/baseApi'
import { Task, TaskQueryParams } from '../model/types'

export const taskApi = {
	getTasks: async (params: TaskQueryParams = {}): Promise<Task[]> => {
		const response = await baseApi.get<Task[]>('/tasks', {
			params: {
				_sort: 'createdAt',
				_order: 'desc',
				...params,
			},
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
