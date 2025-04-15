
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contex/auth-contex'
import InstructorProvider from './contex/instructor-context'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthProvider>
        <InstructorProvider>
          <App/>
        </InstructorProvider>
      </AuthProvider>
  </BrowserRouter>
  
)
