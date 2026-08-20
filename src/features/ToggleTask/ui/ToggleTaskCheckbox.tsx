import React from 'react'
import { Task, TaskStatus } from '@entities/Task'
import { useToggleTask } from '../model/useToggleTask'
import styles from './ToggleTaskCheckbox.module.css'

interface ToggleTaskCheckboxProps {
	task: Task
}

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
	todo: 'in_progress',
	in_progress: 'done',
	done: 'todo',
}

export const ToggleTaskCheckbox: React.FC<ToggleTaskCheckboxProps> = ({
	task,
}) => {
	const { mutate: updateTask, isPending } = useToggleTask()

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (isPending) return

		const nextStatus = NEXT_STATUS[task.status]

		updateTask({
			...task,
			status: nextStatus,
		})
	}

	return (
		<button
			type='button'
			className={`${styles.button} ${styles[task.status]}`}
			onClick={handleClick}
			disabled={isPending}
		>
			{task.status === 'todo' && <span className={styles.dot} />}
			{task.status === 'in_progress' && (
				<span className={styles.halfDot}>◐</span>
			)}
			{task.status === 'done' && <span className={styles.check}>✓</span>}
		</button>
	)
}
