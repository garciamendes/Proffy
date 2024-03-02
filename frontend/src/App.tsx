import { RouterProvider } from 'react-router-dom'
import { routes } from './routers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'

const queryClient = new QueryClient()
export const App = () => {

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} fallbackElement={'Carregando...'} />
      </QueryClientProvider>
    </CookiesProvider>
  )
}
