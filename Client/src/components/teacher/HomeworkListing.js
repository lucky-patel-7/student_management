import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import Navbar from '../navbar/Navbar'
import './HomeworkListiong.css'
import { Service } from '../../service/Service';
import { useLocation } from 'react-router-dom';
import { TiArrowUnsorted } from "react-icons/ti";

function HomeworkListing(props) {
    const [isLoading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [isValue, setValue] = React.useState([]);
    const location = useLocation()
    const [sortBy, setSortby] = React.useState('');

    useEffect(() => {
        getAnswerList(location.state.qId, sortBy);
    },[])

    const getAnswerListwithSortBy = (sort) => {
        setSortby(sort)
        getAnswerList(location.state.qId, sort);
    }

    const getAnswerList = (teacherId, sort) => {

        const data = { "FilterBy": sort }
        
        Service.post(`questionAns/${teacherId}`, 'teacher', data, (res) => {
            if (res.code === "200") {
                setData(res.data)
            }
        },
            (err) => {
            }
        )
        // Service.get('questionAns', 'teacher', id, (res) => {
        //     if (res.code === "200") {
        //         setData(res.data)
        //     }
        // },
        //     (err) => { console.log(err) }
        // )
    }



    const addHomework = (item, index) => {
        if (isValue[index] < 1 || isValue[index] == null) {
            alert("score is emty!!!")
            return;
        }
        var data = {
            "teacherId": location.state.tId,
            "questionId": location.state.qId,
            "studentId": item._id,
            "score": isValue[index]
        }

        Service.post('addScores', 'teacher', data, (res) => {
            if (res.code === "200") {
                getAnswerList(location.state.qId);
            }
        },
            (err) => { console.log(err) }
        )
    }

    function handleInputChange(event, index) {
        const result = event.target.value.replace(/\D/g, '');

        let obj = isValue;
        obj[index] = result;
        setValue(obj);
    }
    const status = (status) => {
        if (status) {
            return null
        } else {
            return <span className='pending-homework-status'>{`- Pending `}</span>
        }
    }
    return (
        <>
            {
                isLoading ?
                    <div className='loader-route'>
                        {/* <Loader /> */}
                    </div>
                    :
                    <div className='right-card teacher-right-card'>
                        <Navbar />

                        <div className='search-box'>
                            <h3>ALL QUESTIONS</h3>

                            <div className='open-sort-list' >
                                <span><TiArrowUnsorted fontSize={'18px'} /></span>
                                <select className='sortby-select' onChange={(e) => getAnswerListwithSortBy(e.target.value)}>
                                    {
                                        [
                                            { key: "By Month", value: "" },
                                            { key: "By Status Submitted", value: "ByStatusSubmitted" },
                                            { key: "By Submitted on Time", value: "BySubmittedOnTime" },
                                            { key: "By Submitted not on Time", value: "BySubmittedNotOnTime" }
                                        ]
                                            .map((item, index) => {
                                                return (
                                                    <option key={index} value={item.value}>{item.key}</option>
                                                )
                                            })
                                    }
                                </select>
                            </div>

                        </div>

                        {
                            data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <div className='question-listing'>
                                            <div className='status-and-name'>
                                                <label className='hname'>{`${item.Name} `}</label>
                                                <label className='hstatus'>{status(item.status)}</label>
                                            </div>
                                            {
                                                !item.status ?
                                                    <label>{`Answer not Submited`}</label>
                                                    :
                                                    <label>{`Answer.`}</label>
                                            }
                                            {

                                                item.score && item.score > 0 ?
                                                    <div className='status-and-name'>
                                                        <label className='hhomework'>{`- ${item.answer}`}</label>

                                                        <div className='submit-inputbox-button'>
                                                            <label className='hhomework'>{`Score`}</label>
                                                            <label className='nhomework'>{`${item.score}`}</label>
                                                        </div>

                                                    </div>
                                                    :
                                                    item.status &&
                                                    <div className='status-and-name'>
                                                        <label className='hhomework'>{`- ${item.answer}`}</label>

                                                        <div className='submit-inputbox-button'>
                                                            <input value={isValue[index]} pattern="[0-9]*" type="text" className='writeQuestionInput' onChange={(event) => handleInputChange(event, index)} />
                                                            <button className='btnSubmitHomework' onClick={() => addHomework(item, index)}>SUBMIT</button>
                                                        </div>

                                                    </div>
                                            }

                                        </div>
                                    )
                                })
                                :
                                <div className='no-data-found'>
                                    <p>No Data Found !</p>
                                </div>
                        }


                    </div>
            }
        </>
    )
}

export default HomeworkListing
