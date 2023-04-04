import React, { useEffect, useState } from 'react'
import '../service/StudentService.css'
import { Link, useNavigate } from 'react-router-dom';
import { Service } from '../../service/Service';
import { BiSearch } from "react-icons/bi";
import { TiArrowUnsorted } from "react-icons/ti";
import Loader from '../loader/Loader';

function RightCard() {
    const teacherId = "640ad53ce843b1161e9868b7";
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [sortBy, setSortby] = React.useState('');
    const [searchStr, setSearchStr] = React.useState('');

    function checkNumbers(str) {
        return /^\d+$/.test(str);
    }

    useEffect(() => {
        getAnswer()
    }, [])

    const getAnswer = () => {

        setLoading(true)
        const data = {
            "Searchby": checkNumbers(searchStr) === true ? '' : searchStr,
            "Month": checkNumbers(searchStr) === true ? searchStr : ''
        }

        Service.post(`allQuestion/${teacherId}`, 'teacher', data, (res) => {
            if (res.code === "200") {
                setData(res.data)
                setLoading(false)
                setSearchStr('')
            }
        },
            (err) => { setLoading(false); console.log(err); }
        )
    }
    const onNavigate = (item) => {
        navigate('./homworkListing', { state: {qId:item._id, tId:teacherId} })
    }
    const handleInput = (value) => {
        setSearchStr(value);
    }
    return (
        <>
            <div className='right-card teacher-right-card'>
                <div className='search-box'>
                    <h3>ALL QUESTIONS</h3>
                    <button className='addh' onClick={() => navigate('/teacher/addHomewrok')}>ADD HOMEWORK</button>
                    <div className='open-search-cal'>
                        <span onClick={() => getAnswer()}><BiSearch fontSize={'18px'} /></span>
                        <input placeholder='Search Docs' value={searchStr}
                            onChange={(e) => handleInput(e.target.value)}
                        />
                    </div>
                    <div className='open-sort-cal' >
                        <span><TiArrowUnsorted fontSize={'18px'} /></span>
                        <select className='sortby-select' onChange={(e) => setSortby(e.target.value)}>
                            {
                                ["By Month", "By Status Submitted", "By Submitted on Time", "By Submitted not on Time"]
                                    .map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    })
                            }
                        </select>
                    </div>

                </div>
                {
                    isLoading ?
                        <div className='question-loader'>
                            <Loader />
                        </div>
                        :
                        (data && data.length > 0 ?
                            <ul className='question-list'>
                                {
                                    data.map((item, index) => {
                                        return (
                                            // <li><Link to={'./homworkListing'}>{`Q - ${item.question}`}</Link></li>
                                            <div key={index} onClick={() => onNavigate(item)} className="getQue">
                                                <li><Link>{`Q - ${item.question}`}</Link></li>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div className='no-data-found'>
                                <p>No Data Found !</p>
                            </div>)
                }
            </div>
        </>
    )
}

export default RightCard