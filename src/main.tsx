import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import App from './App.tsx'
import store from './states'

const root = document.getElementById('root')

if (!root) {
    throw new Error('Root element not found');
}

createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </Provider>
)
