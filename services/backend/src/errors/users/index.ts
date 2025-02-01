import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message ?? 'user-not-found');
  }
}

export class PasswordInvalidException extends ForbiddenException {
  constructor(message?: string) {
    super(message ?? 'password-invalid');
  }
}
