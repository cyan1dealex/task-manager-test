import { useQuery } from '@tanstack/react-query'
import { taskApi } from '../api/taskApi'

export const useTaskDetailsQuery = (id: string | undefined) => {
	return useQuery({
		queryKey: ['task', String(id)],
		queryFn: () => taskApi.getTaskById(id!),
		enabled: Boolean(id),
	})
}
