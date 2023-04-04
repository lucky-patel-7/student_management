import { render, screen } from "@testing-library/react"
import { useReducer } from "react"
import { useNavigate } from "react-router-dom"
import Login from '../../src/screen/login/Login'
import FormInput from "../components/forminput/FormInput"
import { BsPersonFill } from "react-icons/bs";
import userEvent from "@testing-library/user-event"

const props = {
    isLoading: false,
    onLoding: jest.fn(),
    Icon: BsPersonFill
}
const initialVal = {
    email: '',
    password: '',
}

initialVal.email !== '' && initialVal.password !== '' ? jest.fn() : null

jest.mock('react-router-dom')
useNavigate.mockReturnValue({
    navigate: jest.fn()
})

let input = jest.mock('../components/forminput/FormInput.js')

it('should have a email and password field also a submit button', () => {
    render(<Login loader={props} />)
    const { asFragment } = render(<FormInput state={initialVal.email}
        isLogin={true} type={initialVal.email}
        Icon={props.Icon}
    />)
    expect(asFragment).toMatchSnapshot();
        /* pending for api call */ 
         
});
