import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import './index.css'
import App from './App.jsx'
import appStore from './utils/appStore.js'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Provider store={appStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
