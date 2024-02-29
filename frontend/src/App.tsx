import { RouterProvider } from 'react-router-dom'
import { routes } from './routers'

export const App = () => {

  return <RouterProvider router={routes} fallbackElement={'Carregando...'} />
}
