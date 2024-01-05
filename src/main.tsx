import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './page/home'
import Auth from './page/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/auth",
    element: <Auth />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
