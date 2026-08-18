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
	status?: TaskStatus
	q?: string
	_page?: number
	_limit?: number
	_sort?: string
	_order?: 'asc' | 'desc'
}
