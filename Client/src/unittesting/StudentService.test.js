import { getAllByAltText, getRoles, render } from "@testing-library/react"
import { useNavigate } from "react-router-dom"
import StudentService from "../components/service/StudentService"
import AttendanceCalendar from "../screen/attendanceCalendar/AttendanceCalendar"
import Punch from "../screen/punch/Punch"
import renderer from 'react-test-renderer';
import studentData from "../util/Student"


const props = {
    isCalendar: true,
    isModal: true,
    setModal: jest.fn(),
    setCalendar: jest.fn(),
}
let { isCalendar, isModal } = props
isCalendar = Boolean
isModal = Boolean

// Mocking Modules and Functions
jest.mock('react-router-dom')

// Mock Return Values for Mocked Functions
useNavigate.mockReturnValue({
    navigate: jest.fn()
})

describe('StudentService', () => {
    const component = studentData !== null && studentData !== undefined &&
    renderer.create(<StudentService modal={props} />);
    let tree = component.toJSON();
    
    // Snapshot testing for StudentService component
    expect(tree).toMatchSnapshot();

    it('isModal is true then render Punch', () => {
        const component = renderer.create(<Punch modal={props} />);
        let tree = component.toJSON();
        // Snapshot testing for Punch component
        expect(tree).toMatchSnapshot();
    });

    it('isCalendar is true then render AttendanceCalendar', () => {
        const component = renderer.create(<AttendanceCalendar modal={props} />);
        let tree = component.toJSON();
        // Snapshot testing for AttendanceCalendar component
        expect(tree).toMatchSnapshot();
    });

    // Arrays and iterables matcher testing
    test('the listing has Leave application on it', () => {
        expect(studentData).toContain(studentData.find((item) => item.title === 'Leave application'));
        expect(new Set(studentData)).toContain(studentData.find((item) => item.title === 'Leave application'));
    });

})