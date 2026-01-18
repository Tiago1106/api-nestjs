import { ApplicationError } from "@application/errors/application.error";

export class InvalidCredentialsError extends ApplicationError {
  statusCode = 401;

  constructor() {
    super('Invalid credentials');
  }
}
