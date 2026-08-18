import React from 'react'
import { TaskList } from '@widgets/TaskList/ui/TaskList'
import styles from './MainPage.module.css'
import { TaskCreateForm } from '@features/CreateTask'

export const MainPage: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<header className={styles.header}>
					<div className={styles.headerInner}>
						<h1 className={styles.title}>Мои Задачи</h1>
						<span className={styles.count}>12</span>
					</div>
					<span className={styles.stats}>0 выполнено</span>
				</header>

				<main className={styles.main}>
					<section className={styles.section}>
						<TaskCreateForm />
					</section>

					<section className={styles.section}>
						{/* TaskControlToolbar */}
					</section>

					<section className={styles.section}>
						<TaskList />
					</section>

					<footer className={styles.section}>{/* TaskPagination */}</footer>
				</main>
			</div>
		</div>
	)
}
