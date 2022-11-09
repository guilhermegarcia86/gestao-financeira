import { Email } from '@/infra/adapter/typeorm/entity/entity'

export class EmailDTO {
  id?: number
  de: string
  para: string
  assunto: string
  mensagem: string
  isSent: boolean

  constructor (id: number | undefined, de: string, para: string, assunto: string, mensagem: string, isSent: boolean) {
    this.id = id
    this.de = de
    this.para = para
    this.assunto = assunto
    this.mensagem = mensagem
    this.isSent = isSent
  }

  static fromEntity = (control: Email): EmailDTO => {
    return new EmailDTO(control.id, control.de, control.para, control.assunto, control.mensagem, control.isSent)
  }
}
