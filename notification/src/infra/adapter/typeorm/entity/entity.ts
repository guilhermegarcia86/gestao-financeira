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
  mensagem: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt?: Date

  constructor (de: string, para: string, mensagem: string) {
    this.de = de
    this.para = para
    this.mensagem = mensagem
  }

  static fromDomain = (domain: EmailDTO): Email => {
    return new Email(domain.de, domain.para, domain.mensagem)
  }
}
