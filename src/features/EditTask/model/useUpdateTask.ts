import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi, Task } from '@entities/Task'

export const useUpdateTask = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (updatedTask: Task) =>
			taskApi.updateTask(updatedTask.id, updatedTask),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
			queryClient.invalidateQueries({ queryKey: ['task', String(data.id)] })
		},
	})
}
