import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'; // ✅ Import Provider

// ⚠️ REPLACE THIS STRING WITH YOUR ACTUAL GOOGLE CLIENT ID
const CLIENT_ID = "1023938203236-9irq03kqv1j3v43p86g5uscg9s3cqf40.apps.googleusercontent.com"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)