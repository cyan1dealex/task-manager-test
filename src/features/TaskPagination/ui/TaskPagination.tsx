import React from 'react'
import styles from './TaskPagination.module.css'

interface TaskPaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export const TaskPagination: React.FC<TaskPaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	if (totalPages <= 1) return null

	const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

	return (
		<nav className={styles.pagination}>
			<button
				type='button'
				className={styles.button}
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				←
			</button>

			{pages.map(page => (
				<button
					key={page}
					type='button'
					className={`${styles.button} ${currentPage === page ? styles.active : ''}`}
					onClick={() => onPageChange(page)}
					aria-current={currentPage === page ? 'page' : undefined}
				>
					{page}
				</button>
			))}

			<button
				type='button'
				className={styles.button}
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				→
			</button>
		</nav>
	)
}
