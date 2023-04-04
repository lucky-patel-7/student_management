import renderer, { create } from 'react-test-renderer';
import Home from '../../src/screen/home/Home';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const loader = {
    isLoading: true,
    onLoding: jest.fn(),
    isModal: Boolean,
    setModal: jest.fn(),
    isCalendar: Boolean,
    setCalendar: jest.fn(),
};

describe('Home', () => {
    it('match snapshot', () => {
        const { asFragment } = render(<Home loader={loader} />);
        expect(asFragment).toMatchSnapshot();

    });
    test('should match boolean', () => {
        expect(loader.isLoading).toBeTruthy();
        expect(loader.isLoading).not.toBeFalsy();
    })
    // Exceptions Matcher
    function compileAndroidCode() {
        throw new Error('loader is not defined!');
    }

    test('loader is null and undefined', () => {
        expect(() => compileAndroidCode()).toThrow();
        !loader && expect(() => compileAndroidCode()).toThrow(Error);

    });
})
