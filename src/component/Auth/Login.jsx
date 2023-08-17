import React,{useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

function Login() {

  const [user,setUser]= useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()

  const readValue = (e)=>{
    const {name ,value} = e.target 
    setUser({...user,[name]:value})
  }

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      console.log(`user`,user)
      await axios.post(`/api/auth/login`,user)
      .then(res=>{
        toast.success(res.data.msg)
        localStorage.setItem('loginStatus',true)
        window.location.href = '/';
        navigate(`/`)
      }).catch(err=>toast.error(err.response.data.msg))
    } catch (err) {
      toast.error(err.message)
    }
  }
  return (
    <div className="container align-items-center">
      <div className="row mt-5">
        <div className="col-md-8 col-sm-12 col-lg-6 offset-lg-3 col-md-2 ">
          <div className="card">
            <div className="card-body p-0" id='auth'>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-12 p-5 text-center bg-light">
                 <div className="title">
                 <h5 className="display-5">LOGIN</h5>
                 </div>
                 <form autoComplete='off'onSubmit={submitHandler}>
                  <div className='form-group mt-4'>
                  <input type="email" name='email'id='email' value={user.email} onChange={readValue}placeholder='email' className="form-control" required/></div>
                  <div className="form-group mt-2"><input type="password" name='password'id='password'
                  value={user.password} onChange={readValue} placeholder='password' className="form-control" required/></div>
                  <div className="form-group mt-2"><input type="submit" value="Login" className="btn btn-success" />
                  </div>
                 </form>
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12 bg-success p-5 text-center p-sm-4 " id='content'>
                  <div className="title">
                    <h5 className="display-5 text-light">Hello user</h5>
                  </div>
                  <div className="content">
                    <p className="text-light">Enter your personal details to start journey with us</p>
                  </div>
                  <NavLink to={`/register`} className="btn btn-outline-light">Register</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
