import React from 'react'
import './MyProfile.css'

function MyProfile(props) {
const { Name, Email } = props.data;
    return (
        <div className='left-card'>
            <h3>MY PROFILE</h3>
            <div className='profile-imgcal'>
                <img
                    className='profile-img'
                    src="https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
            <div className='student-detail'>
                <p><span>Student Enrollment :</span> 6015</p>
                <p><span>Student Name :</span>{` ${Name}`}</p>
                <p className='user-email'><span>Email Id  :</span> {` ${Email}`}</p>
                {/* <p><span>Batch  :</span> B1</p>
                <p><span>Location  :</span> Ahmedabad</p>
                <p><span>Department  :</span> IT</p>
                <p><span>HOD  :</span> Arvind Patel</p> */}
            </div>
        </div>
    )
}

export default MyProfile