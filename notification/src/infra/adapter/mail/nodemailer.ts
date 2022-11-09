import * as nodemailer from "nodemailer";
import { Mail } from "@/core/port/mail/mail";
import { EmailDTO } from "@/core/domain/domain";

export class EmailSender implements Mail {

    async send (emailDTO: EmailDTO): Promise<void> {

        const mailOptions = {
            from: emailDTO.de,
            to: emailDTO.para,
            subject: emailDTO.para,
            html: emailDTO.mensagem
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error)
                throw Error()
            }

            console.log('Email sent: ', info.response)
        })

    }
    
}