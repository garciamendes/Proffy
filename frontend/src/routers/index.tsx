import { createBrowserRouter } from 'react-router-dom'

import { Login } from '../containers/auth/login'
import { Register } from '../containers/auth/register'
import { SucessRegister } from '../containers/auth/sucessRegister'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/success-register',
    element: <SucessRegister />
  },
])