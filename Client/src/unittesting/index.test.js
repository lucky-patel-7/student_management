import React from "react";
import ReactDOM from "react-dom";
import App from '../App'

jest.mock('react-dom', () => ({ render: jest.fn() }))

// Common Matchers  

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  global.document.getElementById = (id) => id === 'root' && div

  //Mocking Custom Matchers testing
  expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
  expect(ReactDOM.render).toMatchSnapshot();
});

