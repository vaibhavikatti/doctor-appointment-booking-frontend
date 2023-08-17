import React,{useState,useEffect,useCallback,useContext} from 'react'
import axios from'axios'
import { toast } from 'react-toastify'
import {AuthContext} from '../../../Context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

function Update() {
  const context = useContext(AuthContext)
  const token = context.token
  const currentUser = context.currentUser

  const navigate = useNavigate()

  const params = useParams()

    const [slot,setSlot] = useState({
        slot_date:"",
        slot_status:""
    })
const initValue = useCallback(()=>{
const readValue = async ()=>{
  const res = await axios.get(`/api/slot/single/${params.id}`,{
    headers:{
      Authorization:`${token}`
    }
  })

  let data = {
    slot_date: res.data.slot.slot_date,
    slot_status: res.data.slot.slot_status ? "available":"booked"
  }
  setSlot(data)
} 
  readValue()
},[])

    useEffect(()=>{
      initValue()
    },[])

    const readValue = (e)=>{
        const {name ,value} = e.target 
        setSlot({...slot,[name]:value})
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
          let status ;
          if(slot.slot_status === "available"){
            status = true;
          }else if(slot.slot_status === "booked"){
            status = false;
          }else{
            toast.warning('choose proper slot status')
          }
          let updateSlot = {
            slot_date:slot.slot_date,
            slot_status: status
          }
            await axios.patch(`/api/slot/update/${params.id}`,updateSlot,{
                headers:{
                    Authorization:`${token}`
                }
            }).then(res => {
                toast.success(res.data.msg)
                navigate(`/doctor/slots`)
            }).catch(err=>toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }
  return (
  <div className="container">
    <div className="row">
        <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Update Slots</h3>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6 offset-md-3">
            <div className="card">
                <div className="card-body">
                    <form autoComplete='off' onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                            <label htmlFor="slot_date">Slot date( <span className='text-success'>{new Date(slot.slot_date).toLocaleString()}</span>)</label>
                             <input type="datetime-local" name='slot_date' id='slot_date' onChange={readValue} value={slot.slot_date} className="form-control" />
                             </div> 
                             <div className="form-group mt-2">
                             <label htmlFor="slot_status">Slot status</label>
                             <select name="slot_status" id="slot_status"  onChange={readValue} value={slot.slot_status} className='form-select'>
                             <option value="null">Choose slot status</option>
                             <option value="available">Available</option>
                             <option value="booked">Booked</option>
                             </select>
                             </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Update" className="btn btn-success" />
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default Update
