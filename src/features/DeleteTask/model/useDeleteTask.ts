import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi, TASK_QUERY_KEYS } from '@entities/Task'

export const useDeleteTask = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => taskApi.deleteTask(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.all })
		},
	})
}
