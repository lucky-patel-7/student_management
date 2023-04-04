import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import '../../css/common.css'
import { Service } from '../../service/Service'
import './LeaveStatus.css'

function LeaveStatus() {
    const [data, setData] = useState([])
    const location = useLocation()

    useEffect(() => {
        leaveStatus()
    }, [])


    const leaveStatus = () => {
        let userId = location.state.id;
        Service.get('leaveApplication', userId, (res) => {
            if (res.code === '200') {
                setData(res.data)
            } else alert(res.message)
        },
            (err) => console.log(err))
    }
    const totalDays = (fromDate, toDate) => {
        const diff = moment(toDate).diff(moment(fromDate), 'days')
        return diff + 1
    }
    return (
        <div className='student-container'>
            <Navbar />
            <div className='home-line' />
            <Header />
            <div className='main-content'>
                <div className='leave-detail-status'>
                    <h3>Leave Application Detail</h3>
                    <div>
                        {
                            data && data.length > 0 ?
                                <table>
                                    <tr>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Leave Type</th>
                                        <th>No of Leave</th>
                                        <th>Status</th>
                                    </tr>
                                    {
                                        data?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{moment(item.leaveFrom).format('DD/MM/YYYY')}</td>
                                                    <td>{moment(item.leaveTo).format('DD/MM/YYYY')}</td>
                                                    <td>{item.leaveType}</td>
                                                    <td>{totalDays(item.leaveFrom, item.leaveTo)}</td>
                                                    <td>{item.status}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                                :
                                <div className='no-data-found' data-testid={"errorboundary"}>
                                    <p>No Data Found !</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaveStatus