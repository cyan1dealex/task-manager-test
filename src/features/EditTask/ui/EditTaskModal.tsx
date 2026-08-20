import React, { useState } from 'react'
import { Task, TaskPriority, TaskStatus } from '@entities/Task'
import { useUpdateTask } from '../model/useUpdateTask'
import styles from './EditTaskModal.module.css'
import { createPortal } from 'react-dom'

interface EditTaskModalProps {
	task: Task
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ task }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [title, setTitle] = useState(task.title)
	const [description, setDescription] = useState(task.description || '')
	const [priority, setPriority] = useState<TaskPriority>(task.priority)
	const [status, setStatus] = useState<TaskStatus>(task.status)

	const { mutate: editTask, isPending } = useUpdateTask()

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault()
		const trimmedTitle = title.trim()
		if (!trimmedTitle || isPending) return

		editTask(
			{
				...task,
				title: trimmedTitle,
				description: description.trim(),
				priority,
				status,
			},
			{
				onSuccess: () => setIsOpen(false),
			},
		)
	}

	return (
		<>
			<button
				type='button'
				className={styles.editButton}
				onClick={() => setIsOpen(true)}
				title='Редактировать задачу'
			>
				<svg
					width='16'
					height='16'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
					/>
				</svg>
			</button>

			{isOpen &&
				createPortal(
					<div className={styles.overlay} onClick={() => setIsOpen(false)}>
						<div className={styles.modal} onClick={e => e.stopPropagation()}>
							<h2 className={styles.modalTitle}>Редактирование задачи</h2>

							<form onSubmit={handleSubmit} className={styles.form}>
								<input
									type='text'
									className={styles.input}
									value={title}
									onChange={e => setTitle(e.target.value)}
									placeholder='Название задачи'
									required
								/>

								<textarea
									className={styles.textarea}
									value={description}
									onChange={e => setDescription(e.target.value)}
									placeholder='Описание задачи...'
									rows={4}
								/>

								<div className={styles.selectsRow}>
									<div className={styles.field}>
										<label className={styles.label}>Статус:</label>
										<select
											className={`${styles.select} ${styles[`status_${status}`]}`}
											value={status}
											onChange={e => setStatus(e.target.value as TaskStatus)}
										>
											<option value='todo'>К выполнению</option>
											<option value='in_progress'>В процессе</option>
											<option value='done'>Выполнено</option>
										</select>
									</div>

									<div className={styles.field}>
										<label className={styles.label}>Приоритет:</label>
										<select
											className={`${styles.select} ${styles[`priority_${priority}`]}`}
											value={priority}
											onChange={e =>
												setPriority(e.target.value as TaskPriority)
											}
										>
											<option value='low'>Low</option>
											<option value='medium'>Medium</option>
											<option value='high'>High</option>
										</select>
									</div>
								</div>

								<div className={styles.actions}>
									<button
										type='button'
										className={styles.cancelBtn}
										onClick={() => setIsOpen(false)}
									>
										Отмена
									</button>
									<button
										type='submit'
										className={styles.saveBtn}
										disabled={isPending || !title.trim()}
									>
										{isPending ? 'Сохранение...' : 'Сохранить'}
									</button>
								</div>
							</form>
						</div>
					</div>,
					document.body,
				)}
		</>
	)
}
