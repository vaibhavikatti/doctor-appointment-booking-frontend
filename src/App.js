import React,{useContext} from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

import { ToastContainer } from 'react-toastify'
import Menu from './component/Default/Menu'
import Home from './component/Default/Home'
import Contact from './component/Default/Contact'
import Register from './component/Auth/Register'
import Login from './component/Auth/Login'
import Services from './component/Default/Services'
import Pnf from './component/Default/Pnf'
import AdminDashboard from './component/Admin/AdminDashboard'
import DoctorDashboard from './component/Doctor/DoctorDashboard'
import Userdashboard from './component/User/Userdashboard'
import About from './component/Default/About'
import PrivateRouter from './PrivateRoute/PrivateRouter'
import UserProfile from './component/User/UserProfile'
import AdminProfile from './component/Admin/AdminProfile'
import DoctorProfile from './component/Doctor/DoctorProfile'
import Slots from './component/Doctor/slots/Slots'
import AddSlots from './component/Doctor/slots/AddSlots'
import Update from './component/Doctor/slots/Update'


function App() {
    const context = useContext(AuthContext)
    const token = context.token

    const isUser = context.isUser
    const isAdmin = context.isAdmin
    const isDoctor = context.isDoctor

  return (
    <Router>
      <Menu/>
      <ToastContainer autoClose={4000} position='top-right'/>
      <Routes>
        <Route element={<PrivateRouter/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>

              {
                isUser && token ? (
                  <React.Fragment>
                    <Route path='/services' element={<Services/>}/>
                    <Route path='/user/dashboard' element={<Userdashboard/>}/>
                    <Route path='/user/profile' element={<UserProfile/>}/>
                  </React.Fragment>
                ):(null)
              }
                {
                isAdmin && token ? (
                  <React.Fragment>
                  <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
                  <Route path='/admin/profile' element={<AdminProfile/>}/>
                  </React.Fragment>
                ):(null)
              }

              
              {
                isDoctor && token ? (
                  <React.Fragment>
                  <Route path='/doctor/dashboard' element={<DoctorDashboard/>}/>
                  <Route path={`/doctor/slots`} element={<Slots/>}/>
                  <Route path={`/doctor/slots/add`} element={<AddSlots/>}/>
                  <Route path={`/doctor/slots/edit/:id`} element={<Update/>}/>
                  <Route path='/doctor/profile' element={<DoctorProfile/>}/>
                  </React.Fragment>
                ):(null)
              }
       </Route>

       <Route path='/contact' element={<Contact/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={token ? <Navigate to={`/`}/>:<Login/>}/>
       <Route path='/*' element={<Pnf/>}/>
      </Routes>
    </Router>
  )
}

export default App
