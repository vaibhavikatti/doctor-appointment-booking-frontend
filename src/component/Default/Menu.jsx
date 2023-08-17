import React ,{useContext} from 'react'
import { NavLink,Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import {toast} from "react-toastify"


function Menu() {

    const context = useContext(AuthContext)
    const token = context.token

    const isUser = context.isUser
    const isAdmin = context.isAdmin
    const isDoctor = context.isDoctor

    const navigate = useNavigate()

    const logoutHandler = async()=>{
        if(window.confirm(`Are you sure to logout?`)){
            await axios.get(`/api/auth/logout`)
            .then(res=>{
                toast.success(res.data.msg)
                localStorage.removeItem('loginStatus');
                navigate('/')
                window.location.href='/'
            }).catch(err=>toast.error(err.response.data.msg))
        }
        
    }
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success">
        <div className="container">
            <NavLink to={`/`} className="navbar-brand text-uppercase">
                Health<span className="text-dark">CARE</span>
            </NavLink>
            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className= { token?"collapse navbar-collapse justify-content-between":"collapse navbar-collapse justify-content-end"} id='menu'>
                {
                    token?(<React.Fragment>
                 <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to={`/`} className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/about`} className="nav-link">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/contact`} className="nav-link">Contact</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle "data-bs-toggle="dropdown" >Account</NavLink>
                        <ul className="dropdown-menu">
                            {
                                isUser && token ? (
                                    <React.Fragment>
                                        <li>
                                            <NavLink to={`/user/dashboard`} className="dropdown-item">DashBoard</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/services`} className="dropdown-item">Services</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/user/profile`} className="dropdown-item">Profile</NavLink>
                                        </li>
                                    </React.Fragment>
                                ): null
                            }
                            {
                                isAdmin && token ? (
                                    <React.Fragment>
                                        <li>
                                            <NavLink to={`/admin/dashboard`} className="dropdown-item"> Dashboard</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/admin/profile`} className="dropdown-item">Profile</NavLink>
                                        </li>
                                    </React.Fragment>
                                ): null
                            }

{
                                isDoctor && token ? (
                                    <React.Fragment>
                                        <li>
                                            <NavLink to={`/doctor/dashboard`} className="dropdown-item"> Dashboard</NavLink>
                                        </li>
                                         <li>
                                          <NavLink to={`/doctor/slots`} className="dropdown-item">Slots</NavLink>
                                          </li>
                                                       
                                        <li>
                                            <NavLink to={`/doctor/profile`} className="dropdown-item">Profile</NavLink>
                                        </li>
                                    </React.Fragment>
                                ): null
                            }
                          
                            <li className="nav-item dropdown">
                                <NavLink to={`/`} onClick={logoutHandler} className="dropdown-item btn btn-danger">logout</NavLink>
                            </li>
                         </ul>
                    </li>
                </ul>
               
                    </React.Fragment>
                    ):(
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to={`/login`} className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`/admin/login`} className="nav-link">Admin</NavLink>
                            </li>
                        </ul>
                    )
                }
                
            </div>
        </div>
    </nav>
  )
}

export default Menu
