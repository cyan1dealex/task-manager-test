import React from 'react'
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
	const isDone = task.status === 'done'

	const priorityClass = {
		high: styles.priorityHigh,
		medium: styles.priorityMedium,
		low: styles.priorityLow,
	}[task.priority]

	return (
		<article className={`${styles.card} ${isDone ? styles.cardDone : ''}`}>
			<div className={styles.left}>
				{checkboxSlot && (
					<div className={styles.checkboxContainer}>{checkboxSlot}</div>
				)}
				<div className={styles.content}>
					<h3 className={`${styles.title} ${isDone ? styles.titleDone : ''}`}>
						{task.title}
					</h3>
					{task.description && (
						<p className={styles.description}>{task.description}</p>
					)}
				</div>
			</div>

			<div className={styles.right}>
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
		</article>
	)
}
