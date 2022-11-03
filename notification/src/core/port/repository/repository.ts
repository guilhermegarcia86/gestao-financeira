export interface Repository<T> {
  findOne: (id: number) => Promise<T | undefined>
  findAll: () => Promise<T[] | undefined>
}
