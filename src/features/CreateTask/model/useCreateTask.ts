import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi, TASK_QUERY_KEYS, Task } from '@entities/Task'

export const useCreateTask = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (newTask: Omit<Task, 'id' | 'createdAt'>) =>
			taskApi.createTask(newTask),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEYS.all })
		},
	})
}
