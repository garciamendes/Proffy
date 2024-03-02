import { createBrowserRouter } from 'react-router-dom'

import { Login } from '../containers/auth/login'
import { Register } from '../containers/auth/register'
import { SucessRegister } from '../containers/auth/sucessRegister'
import Home from '../containers/home'
import { ForgotPassword } from '../containers/auth/forgotPassword'

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
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
])