import React from 'react'
import styles from './TaskCardSkeleton.module.css'

export const TaskCardSkeleton: React.FC = () => {
	return (
		<div className={styles.skeletonCard}>
			<div className={styles.left}>
				<div className={styles.checkbox} />
				<div className={styles.text}>
					<div className={styles.title} />
					<div className={styles.desc} />
				</div>
			</div>
			<div className={styles.badge} />
		</div>
	)
}
