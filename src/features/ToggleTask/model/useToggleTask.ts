import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi, TASK_QUERY_KEYS, TaskStatus } from '@entities/Task'

interface ToggleParams {
	id: string
	currentStatus: TaskStatus
}

export const useToggleTask = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, currentStatus }: ToggleParams) => {
			const nextStatus: TaskStatus = currentStatus === 'done' ? 'todo' : 'done'
			return taskApi.updateTask(id, { status: nextStatus })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.all })
		},
	})
}
