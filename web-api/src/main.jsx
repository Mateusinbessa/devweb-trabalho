import React from 'react'
import './styles/index.css'
import routes from './routes'
import { store } from 'src/app/store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
