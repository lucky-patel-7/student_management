import React, { useState } from 'react'
import { BsPersonFill } from "react-icons/bs";
import './FormInput.css'

function FormInput(props) {
    const [gender,] = useState('')
    const { onDispatch, type, state, Icon } = props
    function showPreview(event) {
        // onDispatch({
        //     type: 'textInput',setGender
        //     payload: { key: type, value: event.target.files[0] }
        // })
        //   var src = URL.createObjectURL(event.target.files[0]);
    }
    const onGender = (props) => {
        const { event, isType } = props
        onDispatch({
            type: 'textInput',
            payload: { key: isType, value: event.target.value }
        })
    }
    const onType = (props) => {
        const { event, isType } = props
        onDispatch({
            type: 'radioButtom',
            payload: { key: isType, value: event.target.value }
        })
    }
  
    
    return (
        type === 'gender' ?
            <div className="fieldCal">
                <label>Select Gender:</label>
                <div className='genderCal'>
                    <label>
                        <input type="radio" name="gender" value={'male'} required
                            onChange={(event) => onGender({ event, isType:'gender' })}
                        />Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value={'female'} 
                          onChange={(event) => onGender({ event, isType:'gender' })}
                        />Female
                    </label>
                    <label>
                        <input type="radio" name="gender" value={'other'}
                          onChange={(event) => onGender({ event, isType: 'gender'})}
                        />Other
                    </label>
                </div>
            </div> :
             type === 'type' ?
             <div className="fieldCal">
                 <label>Select Type:</label>
                 <div className='genderCal'>
                     <label>
                         <input type="radio" name="type" value={'Student'} required
                             onChange={(event) => onType({ event, isType:'type' })}
                         />Student
                     </label>
                     <label>
                         <input type="radio" name="type" value={'Teacher'} 
                           onChange={(event) => onType({ event, isType:'type' })}
                         />Teacher
                     </label>
                 </div>
             </div> :
            type === 'file' ?
                <div className='imageFieldCal'>
                    <label htmlFor='file-ip-1'>Upload Image</label>
                    <input type={type} id='file-ip-1' accept='image/*'
                        value={state}
                        onChange={(event) => {
                            onDispatch({
                                type: 'textInput',
                                payload: { key: type, value: event.target.files[0] }
                            })
                        }}
                    />
                </div>
                :
                <div className={props?.isLogin ? 'fieldCal' : 'fieldCal signupField'}>
                   {
                    type !== 'date' && <span><Icon /></span>
                   } 
                    <input type={type}
                        className='form-control' placeholder={`Enter ${type}`}
                        value={state}
                        onChange={(event) => {
                            onDispatch({
                                type: 'textInput',
                                payload: { key: type, value: event.target.value }
                            })
                        }}
                    />
                </div>
    )
}

export default FormInput