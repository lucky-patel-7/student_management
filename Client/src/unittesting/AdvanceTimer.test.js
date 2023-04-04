// Advance Timers by Time
import {timerGame} from '../components/timer/FakeTimer'

jest.useFakeTimers();
it('calls the callback after 1 second via advanceTimersByTime', () => {
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.advanceTimersByTime(1000);

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  // Mocking Callbacks call in how many times
  expect(callback).toHaveBeenCalledTimes(1);
});