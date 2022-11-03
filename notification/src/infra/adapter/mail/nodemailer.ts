import * as nodemailer from "nodemailer";
import { Mail } from "@/core/port/mail/mail";

export class EmailSender implements Mail {

    async send (): Promise<void> {

        const mailOptions = {
            from: "portalband@band.com.br",
            to: "supermandra@gmail.com",
            subject: "aviso",
            html: "testando app"
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