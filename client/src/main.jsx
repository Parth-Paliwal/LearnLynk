
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contex/auth-contex'
import InstructorProvider from './contex/instructor-context'
import StudentProvider from './contex/student-context'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthProvider>
        <InstructorProvider>
          <StudentProvider>
          <App/>
          </StudentProvider>
        </InstructorProvider>
      </AuthProvider>
  </BrowserRouter>
  
)
