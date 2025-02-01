import { setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const getUserDateTime = (userTimezone: string): Date =>
  toZonedTime(new Date(), userTimezone);

export const setTime = (date: Date, time: string): Date => {
  const [hours, minutes, seconds, milliseconds] = time.split(':');
  return setMilliseconds(
    setSeconds(
      setMinutes(setHours(date, Number(hours)), Number(minutes)),
      Number(seconds),
    ),
    Number(milliseconds),
  );
};
