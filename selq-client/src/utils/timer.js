export const INITIAL_TIME_LEFT = 180;

export const timeToMinutes = (timeLeft) =>
  Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');

export const timeToSeconds = (timeLeft) =>
  (timeLeft % 60).toString().padStart(2, '0');
