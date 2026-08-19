import React, { useState, useEffect } from 'react'
import { TaskStatus } from '@entities/Task'
import { useDebounce } from '@shared/hooks'
import styles from './TaskControlToolbar.module.css'

export interface FilterState {
	search: string
	status: TaskStatus | 'all'
	sort: string
}

interface TaskControlToolbarProps {
	filters: FilterState
	onFilterChange: (filters: FilterState) => void
}

export const TaskControlToolbar: React.FC<TaskControlToolbarProps> = ({
	filters,
	onFilterChange,
}) => {
	const [searchValue, setSearchValue] = useState(filters.search)
	const debouncedSearch = useDebounce(searchValue, 500)

	useEffect(() => {
		if (debouncedSearch !== filters.search) {
			onFilterChange({ ...filters, search: debouncedSearch })
		}
	}, [debouncedSearch])

	const handleStatusChange = (status: TaskStatus | 'all') => {
		onFilterChange({ ...filters, status })
	}

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onFilterChange({ ...filters, sort: e.target.value })
	}

	return (
		<div className={styles.toolbar}>
			<div className={styles.topRow}>
				<div className={styles.searchWrapper}>
					<svg
						className={styles.searchIcon}
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
					<input
						type='text'
						className={styles.searchInput}
						placeholder='Поиск по названию задачи...'
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
					/>
				</div>

				<select
					className={styles.sortSelect}
					value={filters.sort}
					onChange={handleSortChange}
				>
					<option value='createdAt_desc'>Сначала новые</option>
					<option value='createdAt_asc'>Сначала старые</option>
					<option value='priority_desc'>Сначала высокий приоритет</option>
					<option value='priority_asc'>Сначала низкий приоритет</option>
				</select>
			</div>

			<div className={styles.filtersRow}>
				<button
					type='button'
					className={`${styles.filterTab} ${filters.status === 'all' ? styles.filterTabActive : ''}`}
					onClick={() => handleStatusChange('all')}
				>
					Все
				</button>
				<button
					type='button'
					className={`${styles.filterTab} ${filters.status === 'todo' ? styles.filterTabActive : ''}`}
					onClick={() => handleStatusChange('todo')}
				>
					В работе
				</button>
				<button
					type='button'
					className={`${styles.filterTab} ${filters.status === 'done' ? styles.filterTabActive : ''}`}
					onClick={() => handleStatusChange('done')}
				>
					Выполненные
				</button>
			</div>
		</div>
	)
}
