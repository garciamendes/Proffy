import { RouterProvider } from 'react-router-dom'
import { routes } from './routers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
export const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} fallbackElement={'Carregando...'} />
    </QueryClientProvider>
  )
}
