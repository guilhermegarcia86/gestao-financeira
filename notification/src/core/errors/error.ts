import { ServiceError } from '@/core/errors/service-error'

export class EmailNotFoundError extends ServiceError {
  httpStatusCode = 404

  constructor (message: string) {
    super(message)
    this.name = 'EmailNameNotFound'
  }
}
