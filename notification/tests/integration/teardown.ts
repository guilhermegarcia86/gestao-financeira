export default async (): Promise<any> => {
  // @ts-expect-error
  await global.__PG__.stop()
}
