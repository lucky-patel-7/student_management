import React from 'react'
import './Header.css'
import { RiDashboardFill } from "react-icons/ri";
import { json } from 'react-router-dom';

function Header(props) {
    let data = JSON.parse(localStorage.getItem('user'));
    data = data === null && data == undefined ? { Name: 'Name' } : data

    return (
        <div className='header-container'>
            <div className='dashboard-title'>
                <span><RiDashboardFill /></span>
                <h1>DASHBOARD</h1>
                <h1 className='name-heading'>{`Welcome : ${data.Name}`}</h1>
            </div>
            <div className='home-line' />
        </div>
    )
}

export default Header