import { ApplicationError } from '../../errors/application.error';

export class InvalidLengthPasswordError extends ApplicationError {
  statusCode = 400;

  constructor() {
    super('Password must be longer than or equal to 6 characters');
  }
}

export class InvalidUpdatePasswordError extends ApplicationError {
  statusCode = 400;

  constructor() {
    super('Old password does not match');
  }
}