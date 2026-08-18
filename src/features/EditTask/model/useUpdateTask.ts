import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi, TASK_QUERY_KEYS, Task } from '@entities/Task'

export const useUpdateTask = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, updates }: { id: string; updates: Partial<Task> }) =>
			taskApi.updateTask(id, updates),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.all })
		},
	})
}
