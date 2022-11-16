import { EmailConsumer } from "@/core/domain/emailConsumer";

export default (emailConsumer: EmailConsumer) => {

    const template = `Olá, 
    
    Foram adicionados items a sua conta do tipo ${emailConsumer.tipo} para o mês ${emailConsumer.mes}
    
    Nome: ${emailConsumer.nome} - valor R$${emailConsumer.valor} com vencimento em ${emailConsumer.vencimento}`
    return template
}