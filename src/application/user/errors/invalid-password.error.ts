import { ApplicationError } from '../../errors/application.error';

export class InvalidPasswordError extends ApplicationError {
  statusCode = 400;

  constructor() {
    super('Password must contain at least 6 characters');
  }
}
