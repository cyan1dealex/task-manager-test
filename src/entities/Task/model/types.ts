export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
	id: string
	title: string
	description: string
	status: TaskStatus
	priority: TaskPriority
	createdAt: string
}

export interface TaskQueryParams {
	status?: TaskStatus | 'all'
	search?: string
	title?: string
	sortBy?: string
	order?: 'asc' | 'desc'
	page?: number
	limit?: number
}
