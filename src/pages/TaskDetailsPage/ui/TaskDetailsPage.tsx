import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTaskDetailsQuery, TaskStatus } from '@entities/Task'
import { EditTaskModal } from '@features/EditTask'
import { DeleteTaskButton } from '@features/DeleteTask'
import { useToggleTask } from '@features/ToggleTask'
import styles from './TaskDetailsPage.module.css'

const PRIORITY_LABELS = {
	low: 'Низкий',
	medium: 'Средний',
	high: 'Высокий',
}

export const TaskDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { data: task, isLoading, isError, error } = useTaskDetailsQuery(id)
	const { mutate: updateTaskStatus, isPending: isUpdatingStatus } =
		useToggleTask()

	if (isLoading) {
		return (
			<div className={styles.statusMessage}>Загрузка деталей задачи...</div>
		)
	}

	if (isError || !task) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.card}>
					<button
						type='button'
						className={styles.backButton}
						onClick={() => navigate('/')}
					>
						← Вернуться к списку
					</button>
					<p className={styles.statusMessage}>
						{error ? `Ошибка: ${error.message}` : 'Задача не найдена'}
					</p>
				</div>
			</div>
		)
	}

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const nextStatus = e.target.value as TaskStatus
		updateTaskStatus({
			...task,
			status: nextStatus,
		})
	}

	const priorityClass = {
		low: styles.badgeLow,
		medium: styles.badgeMedium,
		high: styles.badgeHigh,
	}[task.priority]

	const formattedDate = new Date(task.createdAt).toLocaleString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<div className={styles.wrapper}>
			<article className={styles.card}>
				<div className={styles.topNav}>
					<button
						type='button'
						className={styles.backButton}
						onClick={() => navigate('/')}
					>
						← Назад к списку
					</button>

					<div className={styles.actionsGroup}>
						<EditTaskModal task={task} />
						<DeleteTaskButton
							taskId={task.id}
							onSuccessCallback={() => navigate('/')}
						/>
					</div>
				</div>

				<header className={styles.header}>
					<h1 className={styles.title}>{task.title}</h1>
					<div className={styles.metaControls}>
						<div className={styles.statusControl}>
							<label className={styles.controlLabel}>Статус:</label>
							<select
								className={`${styles.statusSelect} ${styles[`status_${task.status}`]}`}
								value={task.status}
								onChange={handleStatusChange}
								disabled={isUpdatingStatus}
							>
								<option value='todo'>К выполнению</option>
								<option value='in_progress'>В процессе</option>
								<option value='done'>Выполнено</option>
							</select>
						</div>

						<span className={`${styles.badge} ${priorityClass}`}>
							{PRIORITY_LABELS[task.priority]} приоритет
						</span>
					</div>
				</header>

				<section className={styles.descriptionBlock}>
					<span className={styles.sectionTitle}>Описание</span>
					<p className={styles.description}>
						{task.description.trim() ? (
							task.description
						) : (
							<span className={styles.emptyText}>Описание отсутствует</span>
						)}
					</p>
				</section>

				<footer className={styles.metaInfo}>
					<span>ID: {task.id}</span>
					<span>Создано: {formattedDate}</span>
				</footer>
			</article>
		</div>
	)
}
