import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainPage } from '@pages/MainPage/ui/MainPage'
import { TaskDetailsPage } from '@pages/TaskDetailsPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
	},
	{
		path: '/tasks/:id',
		element: <TaskDetailsPage />,
	},
	{
		path: '*',
		element: <Navigate to='/' replace />,
	},
])
