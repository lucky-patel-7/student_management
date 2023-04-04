import React from 'react'
import './StudentService.css'
import { GiCleaver } from "react-icons/gi";
import studentData from '../../util/Student';
import { useNavigate } from 'react-router-dom';
import Punch from '../../screen/punch/Punch';
import AttendanceCalendar from '../../screen/attendanceCalendar/AttendanceCalendar';

function StudentService(props) {
    const { isCalendar, isModal, setModal, setCalendar } = props.modal
    const navigate = useNavigate();



    const onNavigate = (type) => {
        switch (type.title) {
            case "Leave application":
                return navigate('/leaveApp', { state: { id: props.data._id } })
                break;
            case "Check In/Out":
                return setModal(true)
                break;
            case "Attendance Calendar":
                return setCalendar(true)
                break;
            case "Leave Application Status":
                return navigate('/leaveStatus', { state: { id: props.data._id } })
                break;
            case "Attendance Report":
                return navigate('/attendanceReport', { state: { id: props.data._id } })
                break;
            case "Student Lesson":
                return navigate('/QuestionsListScreen', { state: { id: props.data._id } })
                break;
            default:
                break;
        }
    }
    return (
        <>
            <div className='right-card'>
                <h3>EMPLOYEE SELF SERVICES</h3>
                <div className='service-container'>
                    {
                        studentData?.map((item, index) => {
                            return (
                                <div className='service-card' key={index} onClick={() => onNavigate(item)}>
                                    {item.Icon}
                                    <p>{item.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div className='service-card'>
                <GiCleaver className='service-icon' />
                <p>Leave application</p>
            </div> */}
            </div>
            {isModal && <Punch isModal={isModal} setModal={setModal} data={props.data} />}
            {isCalendar && <AttendanceCalendar  isModal={isCalendar} setModal={setCalendar} data={props.data} />}
        </>
    )
}

export default StudentService