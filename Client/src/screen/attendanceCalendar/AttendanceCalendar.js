import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import '../../css/common.css'
import 'react-calendar/dist/Calendar.css';
import { AiFillCloseCircle } from 'react-icons/ai'
import moment from 'moment';
import { Service } from '../../service/Service';
import './Calendar.css'

function AttendanceCalendar(props) {
    const { setModal, id } = props;
    const [value, onChange] = useState(new Date());
    const [data, setData] = useState([]);

    const color = [
        { color: "#89d595", status: "Full Day" },
        { color: "#a7349f", status: "Week Off" },
        { color: "#ff0a00", status: "Absent" }
    ]

    useEffect(() => {
        onAttendance(id)
    }, [id])

    const onAttendance = (userId) => {
        // const userId = id
        if (userId) {
            Service.get('monthSummary','Student', userId, (res) => {
                if (res.code === "200") {
                    setData(res.data)
                    // console.log(res.data);
                } else alert(res.message)
            },
                (err) => console.log(err)
            )
        }
        
    }

    const onDayStatus = (date, view) => {
        if (data.find(x => x._id === moment(date).format("YYYY-MM-DD"))) {
            const hour = []
            data.find(x => {
                console.log(x);
                    const firstVal = Number(moment(x.CheckOutTime).format('x'));
                    const secondVal = Number(moment(x.CheckInTime).format('x'));
                    var diff = firstVal - secondVal;
                    var tempTime = moment.duration(diff);
                    hour.push(tempTime._data.hours)
                    hour.map((item, index) => {
                        if (item > 6) {
                            // console.log('highlight');
                            return 'highlight'
                        } else {
                            // console.log('highlightRed');
                            return 'highlightRed'
                        }
                    })
            })
            // data.map((x) => {
            //     const firstVal = Number(moment(x.CheckOutTime).format('x'));
            //     const secondVal = Number(moment(x.CheckInTime).format('x'));
            //     var diff = firstVal - secondVal;
            //     var tempTime = moment.duration(diff);
            //     hour.push(tempTime._data.hours)
            //     hour.filter((item, index) => {
            //         if (item > 6) {
            //             // console.log('highlight');
            //             return 'highlight'
            //         } else {
            //             // console.log('highlightRed');
            //             return 'highlightRed'
            //         }
            //     })
            // });
        }

        else if (moment(date).format("dddd") === "Sunday" || moment(date).format("dddd") === "Saturday") {
            return 'satSund'
        }
    }


    return (
        <div className='punch-container add-width'>
            <div className='punch-title'>
                Attendance Calendar
            </div>
            <div className='close-icon'>
                <AiFillCloseCircle onClick={() => setModal(false)} />
            </div>
            <div className="Sample">
                <div className="Sample__container">
                    <main className="Sample__container__content">
                        <Calendar onChange={onChange} value={value} allowPartialRange={true}
                            tileClassName={({ date, view }) => onDayStatus(date, view)}
                        />
                    </main>
                </div>
                <div className='color-suggestion'>
                    {
                        color.map((item, index) => {
                            return (
                                <div className='color-suggestion-item' key={index}>
                                    <div style={{ backgroundColor: item.color }} className="day-box" />
                                    <label>{item.status}</label>
                                </div>
                            )
                        })

                    }
                </div>
            </div>
        </div>
    );
}

export default AttendanceCalendar