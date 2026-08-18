import React, { useState } from 'react'
import { TaskPriority } from '@entities/Task'
import { useCreateTask } from '@features/CreateTask/model/useCreateTask'
import styles from './TaskCreateForm.module.css'

export const TaskCreateForm: React.FC = () => {
	const [title, setTitle] = useState('')
	const [priority, setPriority] = useState<TaskPriority>('medium')

	const { mutate: createTask, isPending } = useCreateTask()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const trimmedTitle = title.trim()
		if (!trimmedTitle) return

		createTask(
			{
				title: trimmedTitle,
				description: '',
				status: 'todo',
				priority,
			},
			{
				onSuccess: () => {
					setTitle('')
				},
			},
		)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				type='text'
				className={styles.input}
				placeholder='Добавить новую задачу...'
				value={title}
				onChange={e => setTitle(e.target.value)}
				disabled={isPending}
			/>

			<select
				className={styles.select}
				value={priority}
				onChange={e => setPriority(e.target.value as TaskPriority)}
				disabled={isPending}
			>
				<option value='low'>Low</option>
				<option value='medium'>Medium</option>
				<option value='high'>High</option>
			</select>

			<button
				type='submit'
				className={styles.button}
				disabled={isPending || !title.trim()}
			>
				{isPending ? 'Добавление...' : 'Добавить +'}
			</button>
		</form>
	)
}
