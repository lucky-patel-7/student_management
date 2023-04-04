import { render, screen } from "@testing-library/react";
import { useLocation, useNavigate } from "react-router-dom";
import LeaveApplication from "../screen/leave/LeaveApplication";
import TestRenderer from 'react-test-renderer';
import Input from "../components/forminput/Input";
import userEvent from "@testing-library/user-event";
import renderer from 'react-test-renderer';

let props = {
    isLoading: false,
    onLoding: jest.fn()
}
jest.mock('react-router-dom')
useNavigate.mockReturnValue({
    navigate: jest.fn()
})

let state = {
    leaveTo : '03/03/2023',
    leaveFrom : '05/03/2023'
}

let location = useLocation()
const days = Math.floor((Date.parse(state.leaveTo) - Date.parse(state.leaveFrom)) / 86400000);

describe('LeaveApplication', () => {

    it("should leave application render without crashing", () => {
        const submit = jest.fn()
        const wrapper = renderer.create(<LeaveApplication submit={submit} loader={props} days={days}  />);
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should render without crashing', () => {
        const submit = jest.fn()
        

        render(<LeaveApplication submit={submit} loader={props} days={days}/>)


        // const number = screen.getByRole("textbox", { type: 'number' })
        // expect(number).toBeInTheDocument();

        const leaveType = screen.getByText("Leave Type:.")
        expect(leaveType).toBeInTheDocument();


        const leaveFrom = screen.getByText("Leave From:.")
        // expect(leaveFrom).toBeInTheDocument();

        const leaveTo = screen.getByText('Leave To:.')
        expect(leaveTo).toBeInTheDocument();

        const reason = screen.getByRole("textbox", { type: 'text' })
        expect(reason).toBeInTheDocument();


        userEvent.type(leaveType, 'One day')
        userEvent.type(leaveFrom, '03/03/2023')
        userEvent.type(leaveTo, '05/03/2023')
        userEvent.type(reason, 'homework')
        const submitButton = screen.getByRole('button', { name: 'Submit Application' })
        // Mocking Modules and Functions Testing
        expect(submitButton).toBeInTheDocument();
        // mocking function check in call how many times
        // expect(submitButton).tobecalldTimes(1);

        // Numbers matchers Test    
        const daysfield = screen.getByTestId("days-id")
        expect(daysfield).toBeDefined();
        days ? expect(days).toBe(days) : expect(days).toBe(0)
        /*
            pending for api call 

            expect(submitButton).not.toBeDisabled();
            userEvent.click(submitButton)

            expect(submit).toHaveBeenCalledWith({
                "studentId": '12',
                "leaveType": '',
                "leaveFrom": '',
                "leaveTo": '',
                "reason": "homework"
            })
        */


    });
})