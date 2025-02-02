export const POST_LOGIN_URL = 'http://localhost:3000/api/auth/login';
export const GET_PERIODS_URL = 'http://localhost:3000/api/periods';
export const PUT_PERIOD_URL = 'http://localhost:3000/api/periods';

export const WEEK_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const ERROR_MESSAGES: Record<string, string> = {
  'invalid-time-range': 'Invalid Time Range',
  'user-not-found': 'Email doesnt exist',
  'password-invalid': 'Password Invalid',
  'incorrect-finish':
    'Finish time must be in the format HH:mm and between 00:00 and 23:59',
  'incorrect-start':
    'Start time must be in the format HH:mm and between 00:00 and 23:59',
  'out-of-time-range': 'Please, wait for correct time range',
};
