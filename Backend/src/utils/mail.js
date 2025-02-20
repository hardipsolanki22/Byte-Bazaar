import nodemailer from "nodemailer"
import Mailgen from "mailgen"

const sendEmail = async (options) => {

    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "ByteBazzar",
            link: "http://localhost:5000"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailGenContent)

    const emailHtml = mailGenerator.generate(options.mailGenContent)

    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mail = {
        from: "hardipsolanki2224@gmail.com", //"bytebazaar@gmail.com"
        to: options.email,
        subject: options.subject,
        html: emailHtml,
        text: emailTextual
    }

    try {
        await transporter.sendMail(mail).then(() => {
            console.log("Email sent...!");
        })
    } catch (error) {
        console.log("Email service failed...!", error);

    }
}

const emailVerificationMailGenContent = (fullName, emailVerificationUrl) => {
    const content = {
        body: {
            name: fullName,
            intro: "Welcome to our app! We're very excited to have you on board",
            action: {
                instructions: "Emai verify OTP is below",
                button: {
                    text: "Verify your email",
                    link: emailVerificationUrl,
                },
            },
            outro: "Need hepl, or have questions ? Just reply to this email"
        },
    }
    return content
}

export {
    sendEmail,
    emailVerificationMailGenContent
}