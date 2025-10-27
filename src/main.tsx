import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import { router } from './router';
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store';
import { ThemeProvider } from './components/base/ThemeProvider';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
       <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>

  </StrictMode>,
)
