import React from 'react'
import './Input.css'

function Input(props) {
    const { onDispatch, type, state, Icon, title, isType } = props
    return (
        title === "Leave Type" ?
            <div className='leave-app-form'>
                <label>{`${title}:.`}</label>
                <select onChange={(event) => {
                    onDispatch({
                        type: 'textInput',
                        payload: { key: isType, value: event.target.value }
                    })
                }}>
                    <option value="0">Select day:</option>
                    <option value="Half Day">Half Day</option>
                    <option value="One Day">One Day</option>
                    <option value="Multiple Days">Multiple Days</option>
                </select>
            </div>
            :
            title === 'Reason' ?
                <div className='leave-app-area'>
                    <label>{`${title}:.`}</label>
                    <textarea
                        value={state}
                        onChange={(event) => {
                            onDispatch({
                                type: 'textInput',
                                payload: { key: isType, value: event.target.value }
                            })
                        }} />
                </div>
                :
                <div className='leave-app-form'>
                    <label>{`${title}:.`}</label>
                    <input type={type}
                        className='form-control'
                        value={state}
                        onChange={(event) => {
                            onDispatch({
                                type: 'textInput',
                                payload: { key: isType, value: event.target.value }
                            })
                        }}
                    />
                </div>
    )
}

export default Input