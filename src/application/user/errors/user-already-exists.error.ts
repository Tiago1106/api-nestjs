import { ApplicationError } from '../../errors/application.error';

export class UserAlreadyExistsError extends ApplicationError {
  statusCode = 409;

  constructor() {
    super('User with this email already exists');
  }
}