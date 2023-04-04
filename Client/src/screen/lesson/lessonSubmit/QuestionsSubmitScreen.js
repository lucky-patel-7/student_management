import React, { useReducer } from 'react'
import { Service } from '../../../service/Service';
import './QuestionsSubmit.css'
import Navbar from '../../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'

function QuestionsSubmitScreen() {

    const [isTxtAns, setTxtAns] = React.useState("");
    const location = useLocation()

    const addHomework = (event) => {

        const data = {
            "studentId": location.state.studentId,
            "questionId": location.state.questionId,
            "answer": isTxtAns
        }

        console.log(data);

        Service.post('answer', 'student', data, (res) => {
            if (res.code === "200") {
                setTxtAns("");
                alert("Your answer submitted!")
            }
        },
            (err) => { console.log(err) }
        )

    }
    function handleInputChange(event) {
        setTxtAns(event.target.value);
    }

    return (
        <div className='student-container'>
            <Navbar />
            <div className='home-line' />
            <div className='listing-to-question' id='middle-home'>
                <h3>SUBMIT QUESTIONS</h3>
            </div>

            <div className='listing-to-question'>
                <label className='write-question'>{"Q." + location.state.question}</label>
                <input className='write-question-input' onChange={(event) => handleInputChange(event)} />
            </div>

            <div className='add-to-homework'>
                <button onClick={addHomework}>SUBMIT</button>
            </div>
        </div>

    )
}

export default QuestionsSubmitScreen