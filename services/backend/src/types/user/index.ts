import { User } from '@prisma/client';

export type IUser = Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>;
