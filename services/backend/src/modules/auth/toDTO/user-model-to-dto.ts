import { User } from '@prisma/client';
import { UserResponse } from '../responses';

export const userModelToDto = (user: User): UserResponse => {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
