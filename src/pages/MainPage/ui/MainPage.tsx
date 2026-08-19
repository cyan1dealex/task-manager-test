import React, { useState, useMemo, useEffect } from 'react'
import { TaskCreateForm } from '@features/CreateTask'
import { TaskPagination } from '@features/TaskPagination'
import { TaskControlToolbar, FilterState } from '@widgets/TaskControlToolbar'
import { TaskList } from '@widgets/TaskList/ui/TaskList'
import { useTasksQuery, TaskQueryParams } from '@entities/Task'
import styles from './MainPage.module.css'

const ITEMS_PER_PAGE = 5

const PRIORITY_WEIGHTS = {
	high: 3,
	medium: 2,
	low: 1,
} as const

export const MainPage: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [filters, setFilters] = useState<FilterState>({
		search: '',
		status: 'all',
		sort: 'createdAt_desc',
	})

	useEffect(() => {
		setCurrentPage(1)
	}, [filters.search, filters.status, filters.sort])

	const queryParams: TaskQueryParams = useMemo(() => {
		const params: TaskQueryParams = {}

		if (filters.status !== 'all') {
			params.status = filters.status
		}

		if (filters.search.trim()) {
			params.title_like = filters.search.trim()
		}

		return params
	}, [filters.status, filters.search])

	const {
		data: rawTasks,
		isLoading,
		isError,
		error,
	} = useTasksQuery(queryParams)

	const { data: allTasks } = useTasksQuery()
	const totalCount = allTasks?.length ?? 0
	const doneCount = allTasks?.filter(t => t.status === 'done').length ?? 0

	const sortedTasks = useMemo(() => {
		if (!rawTasks) return []
		const items = [...rawTasks]

		switch (filters.sort) {
			case 'priority_desc':
				return items.sort(
					(a, b) => PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority],
				)
			case 'priority_asc':
				return items.sort(
					(a, b) => PRIORITY_WEIGHTS[a.priority] - PRIORITY_WEIGHTS[b.priority],
				)
			case 'createdAt_asc':
				return items.sort(
					(a, b) =>
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
				)
			case 'createdAt_desc':
			default:
				return items.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
				)
		}
	}, [rawTasks, filters.sort])

	const totalPages = Math.ceil(sortedTasks.length / ITEMS_PER_PAGE)

	const paginatedTasks = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		return sortedTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE)
	}, [sortedTasks, currentPage])

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
						<TaskList
							tasks={paginatedTasks}
							isLoading={isLoading}
							isError={isError}
							error={error}
						/>
					</section>

					<footer className={styles.section}>
						<TaskPagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setCurrentPage}
						/>
					</footer>
				</main>
			</div>
		</div>
	)
}
