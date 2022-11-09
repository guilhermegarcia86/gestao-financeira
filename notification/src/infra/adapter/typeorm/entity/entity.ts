import { EmailDTO } from '@/core/service'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'email' })
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id?: number

  @Column({ name: 'de' })
  de: string

  @Column()
  para: string

  @Column()
  assunto: string

  @Column()
  mensagem: string

  @Column()
  isSent: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt?: Date

  constructor (de: string, para: string, assunto: string, mensagem: string) {
    this.de = de
    this.para = para
    this.assunto = assunto
    this.mensagem = mensagem
    this.isSent = false
  }

  static fromDomain = (domain: EmailDTO): Email => {
    return new Email(domain.de, domain.para, domain.assunto, domain.mensagem)
  }
}
