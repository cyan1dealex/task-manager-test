import React from 'react'
import {
	useTasksQuery,
	TaskCard,
	TaskCardSkeleton,
	TaskQueryParams,
} from '@entities/Task'
import styles from './TaskList.module.css'

interface TaskListProps {
	queryParams?: TaskQueryParams
}

export const TaskList: React.FC<TaskListProps> = ({ queryParams = {} }) => {
	const { data: tasks, isLoading, isError, error } = useTasksQuery(queryParams)

	if (isLoading) {
		return (
			<div className={styles.list}>
				{Array.from({ length: 4 }).map((_, index) => (
					<TaskCardSkeleton key={index} />
				))}
			</div>
		)
	}

	if (isError) {
		return (
			<div className={styles.errorState}>
				<p className={styles.errorText}>Не удалось загрузить задачи</p>
				<span className={styles.emptySubtitle}>
					{error instanceof Error
						? error.message
						: 'Проверьте соединение с сервером'}
				</span>
			</div>
		)
	}

	if (!tasks || tasks.length === 0) {
		return (
			<div className={styles.emptyState}>
				<p className={styles.emptyTitle}>Задач пока нет</p>
				<span className={styles.emptySubtitle}>
					Создайте новую задачу с помощью формы выше
				</span>
			</div>
		)
	}

	return (
		<div className={styles.list}>
			{tasks.map(task => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	)
}
