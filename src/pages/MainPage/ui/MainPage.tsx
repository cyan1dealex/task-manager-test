import React, { useState, useMemo } from 'react'
import { TaskCreateForm } from '@features/CreateTask'
import { TaskControlToolbar, FilterState } from '@widgets/TaskControlToolbar'
import { TaskList } from '@widgets/TaskList/ui/TaskList'
import { useTasksQuery, TaskQueryParams } from '@entities/Task'
import styles from './MainPage.module.css'

export const MainPage: React.FC = () => {
	const [filters, setFilters] = useState<FilterState>({
		search: '',
		status: 'all',
		sort: 'createdAt_desc',
	})

	const queryParams: TaskQueryParams = useMemo(() => {
		const params: TaskQueryParams = {}

		if (filters.status !== 'all') {
			params.status = filters.status
		}

		if (filters.search.trim()) {
			params.title_like = filters.search.trim()
		}

		if (filters.sort === 'createdAt_desc') {
			params._sort = 'createdAt'
			params._order = 'desc'
		} else if (filters.sort === 'createdAt_asc') {
			params._sort = 'createdAt'
			params._order = 'asc'
		} else if (filters.sort === 'priority_desc') {
			params._sort = 'priority'
			params._order = 'asc'
		}

		return params
	}, [filters])

	const { data: allTasks } = useTasksQuery()
	const totalCount = allTasks?.length ?? 0
	const doneCount = allTasks?.filter(t => t.status === 'done').length ?? 0

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<header className={styles.header}>
					<div className={styles.headerInner}>
						<h1 className={styles.title}>Мои Задачи</h1>
						<span className={styles.count}>{totalCount}</span>
					</div>
					<span className={styles.stats}>{doneCount} выполнено</span>
				</header>

				<main className={styles.main}>
					<section className={styles.section}>
						<TaskCreateForm />
					</section>

					<section className={styles.section}>
						<TaskControlToolbar filters={filters} onFilterChange={setFilters} />
					</section>

					<section className={styles.section}>
						<TaskList queryParams={queryParams} />
					</section>
				</main>
			</div>
		</div>
	)
}
