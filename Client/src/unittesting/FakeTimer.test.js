// Enable Fake Timers Testing

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
import {timerGame} from '../components/timer/FakeTimer'

test('waits 1 second before ending the game', () => {
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

