import { Email } from '@/infra/adapter/typeorm/entity/entity'

export class EmailDTO {
  id?: number
  de: string
  para: string
  mensagem: string

  constructor (id: number | undefined, de: string, para: string, mensagem: string) {
    this.id = id
    this.de = de
    this.para = para
    this.mensagem = mensagem
  }

  static fromEntity = (control: Email): EmailDTO => {
    return new EmailDTO(control.id, control.de, control.para, control.mensagem)
  }
}
