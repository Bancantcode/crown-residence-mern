import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="320608206926-389plb85uv87u867klukn67joc7frulc.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
