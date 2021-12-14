import nodemailer from "nodemailer";

const sendEmail = (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST, // "smtp.gmail.com"
            service: process.env.SERVICE, // "gmail"
            port: 465, // see Edith's code
            secure: true,
            auth: {
                user: process.env.USER, // verfificationfreshbnb@gmail.com
                pass: process.env.PASS  // APP Password from Gmail
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        await transporter.sendMail({
            from: process.env.USER, 
            to: email,
            subject: subject,
            text: text
        })

        console.log("mail sent successfully")
    } catch (e) {
        console.log("mail not sent")
        console.log(e)
    }
}

export default sendEmail;