import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi, Task } from '@entities/Task'

export const useToggleTask = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (updatedTask: Task) =>
			taskApi.updateTask(updatedTask.id, updatedTask),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
			queryClient.invalidateQueries({ queryKey: ['task', String(data.id)] })
			queryClient.setQueryData(['task', String(data.id)], data)
		},
	})
}
