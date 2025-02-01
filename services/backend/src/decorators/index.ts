import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsValidTimeConstraint implements ValidatorConstraintInterface {
  validate(time: string): boolean {
    const regex = /^\d{2}:\d{2}$/;
    if (!regex.test(time)) return false;

    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  }

  defaultMessage(): string {
    return 'Time must be in the format HH:mm and between 00:00 and 23:59';
  }
}

export function IsValidTime(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidTimeConstraint,
    });
  };
}
