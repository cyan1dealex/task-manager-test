import React from 'react'
import { Task } from '@entities/Task'
import { useToggleTask } from '../model/useToggleTask'
import styles from './ToggleTaskCheckbox.module.css'

interface ToggleTaskCheckboxProps {
	task: Task
}

export const ToggleTaskCheckbox: React.FC<ToggleTaskCheckboxProps> = ({
	task,
}) => {
	const { mutate: toggleStatus, isPending } = useToggleTask()
	const isDone = task.status === 'done'

	const handleClick = () => {
		toggleStatus({ id: task.id, currentStatus: task.status })
	}

	return (
		<button
			type='button'
			className={`${styles.checkbox} ${isDone ? styles.checkboxChecked : ''}`}
			onClick={handleClick}
			disabled={isPending}
			aria-label={
				isDone ? 'Отметить как невыполненную' : 'Отметить как выполненную'
			}
		>
			{isDone && (
				<svg
					className={styles.icon}
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={3}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M5 13l4 4L19 7'
					/>
				</svg>
			)}
		</button>
	)
}
