import { Period, User } from '@prisma/client';

type ISeedUserData = Pick<User, 'email'>;
type ISeedPeriodsData = Pick<Period, 'startTime' | 'finishTime'>;

export const seedUsersData: ISeedUserData[] = [
  {
    email: 'user1@some.com',
  },
  {
    email: 'user2@some.com',
  },
];

export const seedPeriodsData: ISeedPeriodsData[] = [
  {
    startTime: '00:00',
    finishTime: '23:59',
  },
  {
    startTime: '00:00',
    finishTime: '23:59',
  },
  {
    startTime: '00:00',
    finishTime: '23:59',
  },
  {
    startTime: '00:00',
    finishTime: '23:59',
  },
  {
    startTime: '00:00',
    finishTime: '23:59',
  },
  {
    startTime: '00:00',
    finishTime: '23:59',
  },
  {
    startTime: '00:00',
    finishTime: '23:59',
  },
];
