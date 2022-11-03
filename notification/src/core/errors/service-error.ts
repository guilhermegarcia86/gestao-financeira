export abstract class ServiceError extends Error {
  abstract httpStatusCode: number

  constructor (message: string) {
    super(message)
    this.name = 'ServiceError'
  }
}
