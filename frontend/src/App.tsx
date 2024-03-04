import { RouterProvider } from 'react-router-dom'
import { routes } from './routers'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { store } from './store/store'

export const App = () => {

  return (
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={routes} fallbackElement={'Carregando...'} />
      </Provider>
    </CookiesProvider>
  )
}
