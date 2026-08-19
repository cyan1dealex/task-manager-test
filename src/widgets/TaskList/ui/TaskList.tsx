import React from 'react'
import { Task, TaskCard } from '@entities/Task'
import { ToggleTaskCheckbox } from '@features/ToggleTask'
import { DeleteTaskButton } from '@features/DeleteTask'
import { EditTaskModal } from '@features/EditTask'
import styles from './TaskList.module.css'

interface TaskListProps {
	tasks: Task[]
	isLoading: boolean
	isError: boolean
	error: Error | null
}

export const TaskList: React.FC<TaskListProps> = ({
	tasks,
	isLoading,
	isError,
	error,
}) => {
	if (isLoading) {
		return <div className={styles.loadingState}>Загрузка...</div>
	}

	if (isError) {
		return (
			<div className={styles.errorState}>
				<p className={styles.errorText}>
					Ошибка загрузки: {error?.message || 'Не удалось получить задачи'}
				</p>
			</div>
		)
	}

	if (!tasks.length) {
		return (
			<div className={styles.emptyState}>
				<p className={styles.emptyText}>Задач пока нет</p>
			</div>
		)
	}

	return (
		<div className={styles.list}>
			{tasks.map(task => (
				<TaskCard
					key={task.id}
					task={task}
					checkboxSlot={<ToggleTaskCheckbox task={task} />}
					actionsSlot={
						<div className={styles.actions}>
							<EditTaskModal task={task} />
							<DeleteTaskButton taskId={task.id} />
						</div>
					}
				/>
			))}
		</div>
	)
}
