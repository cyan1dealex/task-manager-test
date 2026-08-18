import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainPage } from '@pages/MainPage/ui/MainPage'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
})

export const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<MainPage />
		</QueryClientProvider>
	)
}
