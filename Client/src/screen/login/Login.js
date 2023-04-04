import React, { useReducer } from 'react'
import './Login.css'
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineMail } from 'react-icons/ai'

import { RiLockPasswordFill } from 'react-icons/ri'
import FormInput from '../../components/forminput/FormInput';
import { Service } from '../../service/Service';
import { useLocation, useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';

function Login(props) {

    const { isLoading, onLoding } = props.loader

    const initialVal = {
        email: '',
        password: '',
    }
   
    const reducer = (state, action) => {
        switch (action.type) {
            case 'textInput':
                return { ...state, [action.payload.key]: action.payload.value };
            case 'reset':
                return initialVal
            default:
                throw new Error(`Unknown action type: ${action.type}`);
        }
    };

    const [state, dispatch] = useReducer(reducer, initialVal);
    const navigate = useNavigate()
    
    const login = (event) => {
        event.preventDefault();
        onLoding(true)
        const data = {
            "Email": state.email,
            "Password": state.password
        }
        Service.post('sign_in','student', data, (res) => {
            if (res.code === "200") {
                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(res.data[0]));
                navigate('/home')
                dispatch({ type: 'reset' })
                onLoding(false)
            }else{
                alert(res.message)
                onLoding(false)
            }
        },
            (err) => {
                console.log(err);
                onLoding(false)
            })
    }
    return (
        <div className='loginCal'>
            <div className='loginSubCal'>
                <h1 className='loginTitle'>Login Form</h1>
                <p>Login here Using Email & Password</p>
                <form onSubmit={login}>
                    <FormInput state={state.email} isLogin={true} onDispatch={dispatch} type={"email"} Icon={BsPersonFill} />
                    <FormInput state={state.password} isLogin={true} onDispatch={dispatch} type={"password"} Icon={RiLockPasswordFill} />
                    <div className='middleCalLogin'>
                        <div className='checkboxCal'>
                            <input type='checkbox' />
                            <label>Remember me</label>
                        </div>
                        <a href='#top' className='forgot-pass'>Forgot Password?</a>
                    </div>
                    <button className='login-btn'>Login</button>
                </form>
                <div className='navigate-signup'>
                    <p>Don't have an account?</p>
                    <button onClick={() => navigate('/signup')}>Signup</button>
                </div>
            </div>

        </div>
    )
}

export default Login
