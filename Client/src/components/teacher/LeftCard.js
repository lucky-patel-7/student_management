import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { Service } from '../../service/Service';
import Loader from '../loader/Loader';
import Navbar from '../navbar/Navbar';
import '../profile/MyProfile.css'

function LeftCard() {
    // const { isLoading, onLoding } = props.loader
    const [isLoading, setLoading] = React.useState(false);
    const initialState = {
        question: '',
        startDate: '',
        endDate: ''
    }
    const navigate = useNavigate()
    const reducerLeave = (state, action) => {
        switch (action.type) {
            case 'question':
                return { ...state, [action.type]: action.value };
            case 'startDate':
                return { ...state, [action.type]: action.value };
            case 'endDate':
                return { ...state, [action.type]: action.value };
            case 'reset':
                return initialState
            default:
                throw new Error(`Unknown action type: ${action.type}`);
        }
    };

    const [state, dispatch] = useReducer(reducerLeave, initialState);

    function handleInputChange({ event, type }) {
        dispatch({
            type: type,
            value: event.target.value
        });
    }

    const addHomework = (event) => {
        event.preventDefault();
        setLoading(true)
        const data = {
            "teacherId": "640ad53ce843b1161e9868b7",
            "lastDay": state.endDate,
            "question": state.question,
        }
        Service.post('addQuestion', 'teacher', data, (res) => {
            if (res.code === "200") {
                dispatch({
                    type: 'reset'
                })
                navigate('/teacher')
                setLoading(false)
            }
        },
            (err) => {  setLoading(false);alert(err) }
        )
    }


    return (
        <>
            {
                isLoading ?
                    <div className='leftcard-loader'>
                        <Loader />
                    </div>
                    :
                    <div className='student-container'>
                        <Navbar />
                        <div className='home-line' />
                        {/* <div className='middle-home space-both' id='middle-home'> */}
                        <div className='left-card teacher-left-card'>
                            <h3>Add Homework</h3>
                            <div className='add-homework'>
                                <label className='write-question'>Write a question ?</label>
                                <input className='write-question-input' onChange={(event) => handleInputChange({ event: event, type: "question" })} />
                            </div>
                            <div className='homework-date'>
                                <div>
                                    <label className='write-question'>Due Date :</label>
                                    <input type="date" className='homework-input-date' onChange={(event) => handleInputChange({ event: event, type: "endDate" })} />
                                </div>
                            </div>
                            <div className='add-to-homework'>
                                <button onClick={addHomework}>Add Homework</button>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
            }
        </>

    )
}

export default LeftCard