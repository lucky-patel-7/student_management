import { GiCleaver } from "react-icons/gi";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";
import { MdHolidayVillage } from "react-icons/md";
import { FaUserGraduate,FaLaptopCode } from "react-icons/fa";

const studentData = [
    {
        Icon: <FaLaptopCode className='service-icon' />,
        title: 'Check In/Out',
    },
    {
        Icon: <GiCleaver className='service-icon' />,
        title: 'Leave application',
    },
    // {
    //     Icon: <BsFillCalendar2CheckFill className='service-icon' />,
    //     title: 'My punch',
    // },
    {
        Icon: <IoCalendar className='service-icon' />,
        title: 'Attendance Calendar',
    },
    {
        Icon: <GiCleaver className='service-icon' />,
        title: 'Leave Application Status',
    },
    // {
    //     Icon: <MdHolidayVillage className='service-icon' />,
    //     title: 'Holiday',
    // },
    // {
    //     Icon: <IoCalendar className='service-icon' />,
    //     title: 'Student leave Calendar',
    // },
    {
        Icon: <IoCalendar className='service-icon' />,
        title: 'Attendance Report',
    },
    {
        Icon: <IoCalendar className='service-icon' />,
        title: 'Student Lesson',
    },
    // {
    //     Icon: <IoCalendar className='service-icon' />,
    //     title: 'Student leave Calendar',
    // },
    // {
    //     Icon: <IoCalendar className='service-icon' />,
    //     title: 'Student leave Calendar',
    // },
    // {
    //     Icon: <IoCalendar className='service-icon' />,
    //     title: 'Student leave Calendar',
    // },
    // {
    //     Icon: <IoCalendar className='service-icon' />,
    //     title: 'Student leave Calendar',
    // },
]

export default studentData;