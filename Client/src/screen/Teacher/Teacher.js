import React from 'react'
import Loader from '../../components/loader/Loader'
import Navbar from '../../components/navbar/Navbar'
import LeftCard from '../../components/teacher/LeftCard'
import RightCard from '../../components/teacher/RightCard'

function Teacher(props) {
    const { isLoading, onLoding } = props.loader
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
                        <div className='middle-home space-both' id='middle-home'>
                            {/* <LeftCard /> */}
                            <RightCard />
                        </div>
                    </div>
            }
        </>
    )
}

export default Teacher