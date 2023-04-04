import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './Home.css';
import { FaUser } from "react-icons/fa";
import MyProfile from '../../components/profile/MyProfile';
import StudentService from '../../components/service/StudentService';
import Header from '../../components/header/Header';
import '../../css/common.css';
import Loader from '../../components/loader/Loader';

function Home(props) {

    const { isLoading, onLoding } = props.loader
    let userDetail = JSON.parse(localStorage.getItem('user'));
   
    const [isModal, setModal] = React.useState(false);
    const [isCalendar, setCalendar] = React.useState(false);

    const modal = {
        isModal: isModal,
        setModal: setModal,
        isCalendar: isCalendar,
        setCalendar: setCalendar,
    }

    return (
        <>
            {
                isLoading ?
                    <div className='loader-route'>
                        <Loader />
                    </div>
                    :
                    <div className='student-container'>
                        <Navbar />
                        <div className='home-line' />
                        <div className='main-content'>
                            <Header />
                            <div className='middle-home' id='middle-home'>
                                <MyProfile data={userDetail} />
                                <StudentService data={userDetail} modal={modal} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Home