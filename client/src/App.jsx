
import { Routes , Route } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import AuthPage from './pages/auth'
import RouteGuard from './components/route-gaurd'
import { useContext } from 'react'
import { AuthContex } from './contex/auth-contex'
import InstructorDashboardPage from './pages/instructor'
import StudentHomePage from './pages/student/home'
import StudentViewCommonLayout from './components/Student-view/common-layout'
import NotFoundPage from './pages/not-found'
import AddNewCoursePage from './pages/instructor/add-new-course'

function App() {

const {auth} = useContext(AuthContex);
console.log(auth);

  return (
    <Routes>
      <Route path="/auth" element={
        <RouteGuard element={<AuthPage/>}
          authenticate={auth?.authenticate}
          user={auth?.user}
        />
        }/>


      <Route path="/instructor" element={
        <RouteGuard element={<InstructorDashboardPage/>}
          authenticate={auth?.authenticate}
          user={auth?.user}
        />
        }/>

      <Route path="/instructor/create-new-course" element={
        <RouteGuard element={<AddNewCoursePage/>}
          authenticate={auth?.authenticate}
          user={auth?.user}
        />
        }/>
      <Route path="/instructor/edit-course/:courseId" element={
        <RouteGuard element={<AddNewCoursePage/>}
          authenticate={auth?.authenticate}
          user={auth?.user}
        />
        }/>

      <Route path="/student" element={
        <RouteGuard element={<StudentViewCommonLayout/>}
          authenticate={auth?.authenticate}
          user={auth?.user}
        />
        }/>
      <Route path='home' element={<StudentHomePage/>}/>

      <Route path='*' element={<NotFoundPage/>}/>

    </Routes>
  )
}

export default App
