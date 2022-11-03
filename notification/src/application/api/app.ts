import 'express-async-errors'
import express from 'express'

import { EmailController } from '@/application/api/controller'
import { globalErrorHandler } from '@/application/api/middewares'

const app = express()

app.use(EmailController.getRouter())

app.get('/email/health', (req, res) => {
  res.status(200).send()
})

app.use(globalErrorHandler)

export { app }
