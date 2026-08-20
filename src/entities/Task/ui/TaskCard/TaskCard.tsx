import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Task } from '../../model/types'
import styles from './TaskCard.module.css'

interface TaskCardProps {
	task: Task
	checkboxSlot?: React.ReactNode
	actionsSlot?: React.ReactNode
}

export const TaskCard: React.FC<TaskCardProps> = ({
	task,
	checkboxSlot,
	actionsSlot,
}) => {
	const navigate = useNavigate()

	const handleCardClick = () => {
		navigate(`/tasks/${task.id}`)
	}

	const priorityClass = {
		high: styles.priorityHigh,
		medium: styles.priorityMedium,
		low: styles.priorityLow,
	}[task.priority]

	return (
		<div className={styles.card} onClick={handleCardClick}>
			<div
				className={styles.checkboxWrapper}
				onClick={e => e.stopPropagation()}
			>
				{checkboxSlot}
			</div>

			<div className={styles.content}>
				<h3
					className={`${styles.title} ${task.status === 'done' ? styles.done : ''}`}
				>
					{task.title}
				</h3>
				{task.description && (
					<p className={styles.description}>{task.description}</p>
				)}
			</div>

			<div className={styles.right} onClick={e => e.stopPropagation()}>
				<span className={`${styles.priorityBadge} ${priorityClass}`}>
					{task.priority}
				</span>

				<time className={styles.date} dateTime={task.createdAt}>
					{new Date(task.createdAt).toLocaleDateString('ru-RU', {
						day: 'numeric',
						month: 'short',
					})}
				</time>

				{actionsSlot && <div className={styles.actions}>{actionsSlot}</div>}
			</div>
		</div>
	)
}
