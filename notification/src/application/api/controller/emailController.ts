import { EmailService } from '@/core/service'
import { makeEmailService } from '@/core/service/factory'
import { RequestHandler, Router } from 'express'

export class EmailController {
  constructor (private readonly emailService: EmailService) {}

  findEmailById: RequestHandler = async (req, res): Promise<any> => {
    const { id } = req.params

    const email = await this.emailService.findEmailById(Number(id))

    return res.status(200).json(email)
  }

  findAll: RequestHandler = async (_, res): Promise<any> => {

    const email = await this.emailService.findAll()

    return res.status(200).json(email)
  }

  static getRouter = (): Router => {
    const emailController = new EmailController(makeEmailService())
    const router = Router()
    router.get('/email/v1/:id', emailController.findEmailById)
    router.get('/email/v1', emailController.findAll)
    return router
  }
}
