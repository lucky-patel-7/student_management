import React, { useReducer } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import './LeaveApplication.css'
import '../../css/common.css'
import Input from '../../components/forminput/Input'
import { useLocation, useNavigate } from 'react-router-dom'
import { Service } from '../../service/Service'

function LeaveApplication(props) {
  const { isLoading, onLoding } = props.loader
  
  const navigate = useNavigate()
  const location = useLocation()

  const initialState = {
    leaveType: '',
    contact: '',
    leaveFrom: '',
    leaveTo: '',
    reason: '',
  }
  const reducerLeave = (state, action) => {
    switch (action.type) {
      case 'textInput':
        return { ...state, [action.payload.key]: action.payload.value };
      case 'reset':
        return initialState
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };
  const [state, dispatch] = useReducer(reducerLeave, initialState);

  const submitLeave = (event) => {
    onLoding(true)
    event.preventDefault();
    const data = {
      "studentId": location.state.id,
      "leaveType": state.leaveType,
      "leaveFrom": state.leaveFrom,
      "leaveTo": state.leaveTo,
      "reason": state.reason
    }
    Service.post('leaveApplication', data, (res) => {
      if (res.code === "200") {
        navigate('/home')
        dispatch('reset')
        onLoding(false)
      }
      else {
        onLoding(false)
        alert(res.message)
      }
    },
      (err) => {
        console.log(err);
        onLoding(false)
      }
    )
  }
const days = Math.floor((Date.parse(state.leaveTo) - Date.parse(state.leaveFrom)) / 86400000);
 

  return (
    <div className='student-container'>
      <Navbar />
      <div className='home-line' />
      <Header />
      <div className='main-content'>
        <div className='leave-app'>
          <h3>Leave Application</h3>
          <form className='leave-form'>
            {/* <div className='leave-field-app'>
              <Input title={"Enrollment No"} type={"text"} />
              <Input title={"Email"} type={"email"} />
            </div> */}
            <div className='leave-field-app'>
              <Input title={"Leave Type"} state={state.leaveType} onDispatch={dispatch} type={"leaveType"} isType={"leaveType"} />
              <Input title={"Contact Number"} state={state.contact} onDispatch={dispatch} type={"number"} isType={'contact'} />
            </div>
            <div className='leave-field-app'>
              <Input title={"Leave From"} state={state.leaveFrom} onDispatch={dispatch} type={"date"} isType={"leaveFrom"} />
              <Input title={"Leave To"} state={state.leaveTo} onDispatch={dispatch} type={"date"} isType={"leaveTo"} />
            </div>
            <div className='reason-area'>
              <Input title={"Reason"} state={state.reason} onDispatch={dispatch} type={"text"} isType={"reason"} />
            </div>
          </form>
          <div className='submit-leave'>
            <p>Selected Leave Dates: <b data-testid={"days-id"}>{days ? days : 0}</b></p>
            <button onClick={submitLeave}>Submit Application</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveApplication
