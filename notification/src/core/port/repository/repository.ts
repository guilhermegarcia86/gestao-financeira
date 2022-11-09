export interface Repository<T> {
  findOne: (id: number) => Promise<T | undefined>
  findAll: () => Promise<T[] | undefined>
  findByEmailAndIsSent: (email: string) => Promise<T[] | undefined>
  save: (t: T) => Promise<T>
  update: (t: T) => Promise<void>
}
