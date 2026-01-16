import { ApplicationError } from '../../errors/application.error';

export class NotFoundUserError extends ApplicationError {
  statusCode = 404;

  constructor() {
    super('User not found');
  }
}