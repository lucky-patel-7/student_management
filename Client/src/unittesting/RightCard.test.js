import { screen } from "@testing-library/react";
import RightCard from "../components/teacher/RightCard";

const data = [
    { "question": "What are the features of React?" },
    { "question": "What is JSX?" },
    { "question": "Can web browsers read JSX directly?" }
]

const mockCallback = jest.fn(x => x);

// Using Mocking Partials testing
jest.mock('../components/teacher/RightCard', () => {
    return {
        __esModule: true,
        default: jest.fn(() => {
            return {
                getAllQuestion: jest.fn(),
                setData: jest.fn(),
                data: data,
            }
        })
    };
});

// Using a mock function Testing
test('forEach mock function', () => {

    data.forEach((item) => {
        mockCallback(item);
    });

    expect(mockCallback.mock.calls).toHaveLength(3);
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({ question: 'What are the features of React?' });

    // .mock property
    const getAllQuestion = jest.fn();
    const a = new getAllQuestion();

    // Manual mock
    // Replacing the mock using mockImplementation() or mockImplementationOnce()
    // Calling jest.mock() with the module factory parameter
    const myMockFn = jest
        .fn(() => 'default')
        .mockImplementation(() => 'print listing')
        // mock function call manually in index wise.
        .mockImplementationOnce(() => mockCallback.mock.calls[0])
        .mockImplementationOnce(() => mockCallback.mock.calls[1])
        .mockImplementationOnce(() => mockCallback.mock.calls[2])
        // .mockreturnvalueOnce('print listing')

    console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
});
