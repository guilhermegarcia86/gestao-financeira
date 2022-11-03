const vars = process.env

export const env = {
  serverPort: vars.SERVER_PORT ?? 3000
}
