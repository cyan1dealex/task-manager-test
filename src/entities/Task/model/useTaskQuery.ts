import { useQuery } from '@tanstack/react-query'
import { taskApi } from '../api/taskApi'
import { TaskQueryParams } from './types'

export const TASK_QUERY_KEYS = {
	all: ['tasks'] as const,
	list: (params: TaskQueryParams) =>
		[...TASK_QUERY_KEYS.all, 'list', params] as const,
}

export const useTasksQuery = (params: TaskQueryParams = {}) => {
	return useQuery({
		queryKey: TASK_QUERY_KEYS.list(params),
		queryFn: () => taskApi.getTasks(params),
	})
}
