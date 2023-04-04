import React, { useEffect, useState } from 'react'
import './QuestionsList.css'
import Loader from '../../../components/loader/Loader'
import Navbar from '../../../components/navbar/Navbar'
import { Service } from '../../../service/Service';
import { useNavigate } from 'react-router-dom';

function QuestionsList(props) {

    const navigate = useNavigate();
    const [data, setData] = React.useState([]);

    useEffect(() => {
        let userDetail = JSON.parse(localStorage.getItem('user'));
        getAllQuestion(userDetail._id)
    }, [])

    const getAllQuestion = (id) => {

        Service.get('getAllQuestion', 'student', id, (res) => {
            if (res.code === "200") {
                setData(res.data)
            }
        },
            (err) => { console.log(err) }
        )
    }

    const onNavigate = (item) => {
        let userDetail = JSON.parse(localStorage.getItem('user'));
        navigate('/QuestionsSubmitScreen', { state: { question: item.question, studentId: userDetail._id, questionId: item.questionId } })
    }

    return (
        <>
            <div className='student-container'>
                <Navbar />
                <div className='home-line' />
                <div className='listing-to-question' id='middle-home'>
                    <h3>ALL QUESTIONS</h3>
                    {
                        data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <div className='question-listing' key={index} onClick={() => onNavigate(item)}>
                                        <label className='hhomework'>{`${index + 1}. ${item.question} `}</label>
                                    </div>
                                )
                            })
                            :
                            <div className='no-data-found'>
                                <p>No Data Found !</p>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

// const data = [
//     {
//         name: 'Jalpa Boradiya',
//         status: 'Pending',
//         homework: 'Easy creation of dynamic applications: React makes it easier to create dynamic web applications because it requires less coding and offers more functionality, as opposed to JavaScript, where coding often gets complex very quickly. Improved performance: React uses Virtual DOM, thereby creating web applications faster.'
//     },
//     {
//         name: 'Maitry Acharya',
//         status: 'Submit',
//         homework: 'One of the best ReactJS features is that it helps create an interactive and dynamic UI for mobile apps and websites. Because of this, the ReactJS code gets more user-friendly, readable, and easy to debug. While the library can create engaging UIs, it can also create a seamless view system for every state in the app.'
//     },
// ]

export default QuestionsList