import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

function UserProfile() {
  
  const context = useContext(AuthContext)
  const currentUser = context.currentUser

  return (
    <div className="container">
    <div className="row">
        <div className="col-md-12 text-center">
            <h3 className="text-success display-3"> User Profile</h3>
       </div>
    </div>
    <div className="row">
      <div className="col-md-8  offset-md-2 col-lg-6 offset-lg-3 col-sm-12">
        <div className="card">
          <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex align-items-center">
            <img src={currentUser.image?currentUser.image.url:"#"} alt="no image" className="card-img-top rounded-circle" />
          </div>
          <div className="col-md-8 col-lg-8 col-sm-6">
          <div className="card-body">
            <h5 className="card-title display-5 text-center text-success">
              {currentUser.name}
            </h5>
            <ul className="list-group mt-2">
              <li className="list-group-item">
                <strong>Email</strong>
                <span className="float-end text-success">
                  {currentUser.email}
                </span>
              </li>
              <li className="list-group-item">
                <strong>Mobile</strong>
                <span className="float-end text-success">
                  {currentUser.mobile}
                </span>
              </li>
              <li className="list-group-item">
                <strong>Address</strong>
                <span className="float-end text-success">
                  {currentUser.adress}
                </span>
              </li>
            </ul>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserProfile
