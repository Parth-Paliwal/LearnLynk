
import { Routes , Route } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import AuthPage from './pages/auth'
import RouteGuard from './components/route-gaurd'
import { useContext } from 'react'
import { AuthContex } from './contex/auth-contex'
import InstructorDashboardPage from './pages/instructor'
import StudentHomePage from './pages/student/home/index'
import StudentViewCommonLayout from './components/Student-view/common-layout'
import NotFoundPage from './pages/not-found'
import AddNewCoursePage from './pages/instructor/add-new-course'
import StudentViewCoursesPage from './pages/student/courses'

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

      <Route path="/" element={
        <RouteGuard element={<StudentViewCommonLayout/>}
          authenticate={auth?.authenticate}
          user={auth?.user}
        />
        }/>
      <Route path="" element={<StudentHomePage />} />
      <Route path="home" element={<StudentHomePage/>}/>
      <Route path="courses" element={<StudentViewCoursesPage/>}/>

      <Route path='*' element={<NotFoundPage/>}/>

    </Routes>
  )
}

export default App
