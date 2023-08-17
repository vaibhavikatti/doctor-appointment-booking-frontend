import React,{useState,useEffect,useCallback,useContext} from 'react'
import axios from'axios'
import { toast } from 'react-toastify'
import {AuthContext} from '../../../Context/AuthContext'
import { NavLink,useNavigate } from 'react-router-dom'



function Slots() {
  const context = useContext(AuthContext)
  const token = context.token
  const currentUser = context.currentUser

  const navigate = useNavigate()

  const [slots,setSlots]=useState([])

  const initData = useCallback(()=>{
    const readData = async ()=>{
      const res = await axios.get(`/api/slot/all`,{
        headers:{
          Authorization:`${token}`
        }
      })

      let filterSlots = res.data.slots.filter(item=>item.doc_id === currentUser._id)
      setSlots(filterSlots)

    }
    readData()
  },[])


  useEffect(()=>{
    initData()
  },[initData])


  //delete slots
  const deleteHandler = async(id)=>{
    if(window.confirm(`Are you sure to delete?`)){
      await axios.delete(`/api/slot/delete/${id}`,{
        headers:{
          Authorization:`${token}`
        }
      }).then(res=>{
        toast.success(res.data.msg)
        navigate(`/doctor/slots`)
        window.location.reload()
      }).catch(err=>toast.error(err.response.data.msg))
    }else{
      toast.warning(`delete terminated`)
    }
  }
  if(slots.length === 0){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <NavLink to={`/doctor/slots/add`} className="btn btn-outline-success float-end">Add New Slots</NavLink>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3 text-secondary">NO SLOTS LIST</h3>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="row">
          <div className="col-md-12 text-center">
            <NavLink to={`/doctor/slots/add`} className="btn btn-outline-success float-end">Add New Slots</NavLink>
          </div>
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-success">Slots Lists</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table table-responsive">
            <table className="table table-striped table-hovered table-bordered text-center">
              <thead>
                <tr>
                  <th>Slot Time </th>
                  <th>Slot Status </th>
                  <th>isActive </th>
                  <th>Actions </th>
                </tr>
              </thead>
              <tbody>
                {
                  slots && slots.map((item,index)=>{
                    return(
                      <tr className="text-center" key={index}>
                        <td>{new Date(item.slot_date).toLocaleString()}</td>
                        <td>{item.slot_status?
                        <span className="text-success">Available</span>:<span className="text-danger">booked</span>}</td>
                        <td>
                        {item.isActive?
                        <span className="text-success">Active</span>:<span className="text-success">in-Active</span>}
                        </td>
                        <td className='d-flex justify-content-evenly'>
                        <NavLink to={`/doctor/slots/edit/${item._id}`} className="btn btn-info "><span className="bi bi-pencil"></span></NavLink>
                          <button onClick={()=>{deleteHandler(item._id)}} className="btn btn-danger "><span className="bi bi-trash"></span></button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slots
