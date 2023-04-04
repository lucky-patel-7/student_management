import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import './AttendanceReport.css'
import moment from 'moment'
import { Service } from '../../service/Service'
import { useLocation } from 'react-router-dom'

function AttendanceReport() {
    let hour = 0

    function Get24HourDate(str) {
        var dt = new Date();
        var parts = str.split(':');
        var hour = parseInt(parts[0]);
        var parts2 = parts[1].split(' ');
        var mis = parts2[0];
        var ampm = parts2[1];

        if (ampm.toLowerCase() == 'pm') {
            if (hour < 12)
                hour += 12;
        }

        dt.setHours(hour, mis, 0);
        return dt;
    }

    function getDiff(timestart, timeEnd) {
        var timeStart = timestart.getTime();
        var timeEnd = timeEnd.getTime();
        var hourDiff = timeEnd - timeStart;
        var secDiff = hourDiff / 1000;
        var minDiff = hourDiff / 60 / 1000;
        var hDiff = hourDiff / 3600 / 1000;
        var hours = Math.floor(hDiff);
        var mins = minDiff - 60 * hours;

        return {
            hours: hours,
            mins: mins
        }
    }

    const location = useLocation()

    const [data, setData] = useState([]);

    useEffect(() => {
        onAttendance()
    }, [])

    const onAttendance = () => {
        const userId = location.state.id
        Service.get('monthSummary','Student', userId, (res) => {
            if (res.code === "200") {
                setData(res.data)
                console.log(res.data);
            } else alert(res.message)
        },
            (err) => console.log(err)
        )
    }
    const checkInOut = (item) => {
        return moment(item).format('HH:mm A');
    }

    const totalHours = (item) => {
        const checkOut = moment(item.CheckOutTime).format('HH:mm A');
        const checkIn = moment(item.CheckInTime).format('HH:mm A');
        var timestart = Get24HourDate(checkIn);
        var timeEnd = Get24HourDate(checkOut);
        var obj = getDiff(timestart, timeEnd);
        hour = obj.hours
        return `${obj.hours} : ${obj.mins}`;
    }
    const statusOfDay = () => {
        if (hour >= 9) {
            return <td className='present-stu'>{'Full Day Present'}</td>
        }
        else {
            return <td className='absent-stu'>{'Absent'}</td>
        }
    }
    function getDay(item) {
        var weekDayName = moment(item.CheckInTime).format('ddd');
        var date = moment(item.CheckInTime).format('DD');
        return `${date} ${weekDayName}`
    }
    return (
        <div className='student-container'>
            <Navbar />
            <div className='home-line' />
            <Header />
            <div className='main-content'>
                <div className='leave-detail-status'>
                    <h3>Attendance Table</h3>
                    <div>
                        {
                           data && data.length > 0 ?
                                <table>
                                    <tr>
                                        <th>Date</th>
                                        <th>CheckIn</th>
                                        <th>CheckOut</th>
                                        <th>Hours</th>
                                        <th>Status</th>
                                    </tr>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{getDay(item)}</td>
                                                    <td>{checkInOut(item.CheckInTime)}</td>
                                                    <td>{checkInOut(item.CheckOutTime)}</td>
                                                    <td>{totalHours(item)}</td>
                                                    {statusOfDay()}
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                                :
                                <div className='no-data-found'>
                                    <p>No Data Found !</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttendanceReport