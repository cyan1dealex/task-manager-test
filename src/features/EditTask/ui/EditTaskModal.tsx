import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Task, TaskPriority } from '@entities/Task'
import { useUpdateTask } from '../model/useUpdateTask'
import styles from './EditTaskModal.module.css'

interface EditTaskModalProps {
	task: Task
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ task }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [title, setTitle] = useState(task.title)
	const [description, setDescription] = useState(task.description)
	const [priority, setPriority] = useState<TaskPriority>(task.priority)

	const { mutate: updateTask, isPending } = useUpdateTask()

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault()
		const trimmedTitle = title.trim()
		if (!trimmedTitle) return

		updateTask(
			{
				id: task.id,
				updates: {
					title: trimmedTitle,
					description: description.trim(),
					priority,
				},
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
				className={styles.triggerButton}
				onClick={() => setIsOpen(true)}
				title='Редактировать задачу'
				aria-label='Редактировать задачу'
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
							<div className={styles.header}>
								<h2 className={styles.title}>Редактировать задачу</h2>
								<button
									type='button'
									className={styles.closeButton}
									onClick={() => setIsOpen(false)}
								>
									✕
								</button>
							</div>

							<form className={styles.form} onSubmit={handleSave}>
								<input
									type='text'
									className={styles.input}
									value={title}
									onChange={e => setTitle(e.target.value)}
									placeholder='Заголовок задачи'
									required
								/>

								<textarea
									className={styles.textarea}
									value={description}
									onChange={e => setDescription(e.target.value)}
									placeholder='Описание задачи...'
								/>

								<select
									className={styles.select}
									value={priority}
									onChange={e => setPriority(e.target.value as TaskPriority)}
								>
									<option value='low'>Low</option>
									<option value='medium'>Medium</option>
									<option value='high'>High</option>
								</select>

								<div className={styles.actions}>
									<button
										type='button'
										className={styles.cancelButton}
										onClick={() => setIsOpen(false)}
									>
										Отменить
									</button>
									<button
										type='submit'
										className={styles.saveButton}
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
