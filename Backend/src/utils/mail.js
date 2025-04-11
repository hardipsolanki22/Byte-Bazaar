import nodemailer from "nodemailer"
import Mailgen from "mailgen"

const sendEmail = async (options) => {

    // setup main structure
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "ByteBazaar",
            link: "http://localhost:5000"
        }
    })

    // html is not support
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

    // mail send configration
    const mail = {
        from: "hardipsolanki2224@gmail.com", //"bytebazaar@gmail.com"
        to: options.email,
        subject: options.subject,
        html: emailHtml,
        text: emailTextual
    }

    try {
        await transporter.sendMail(mail).then(() => {
            console.log("Email sent...");
        })
    } catch (error) {
        console.log("Email service failed...!", error);

    }
}

// verification mail conent
const emailVerificationMailGenContent = (fullName, emailVerificationUrl                                                                                                      ) => {
    const content = {
        body: {
            name: fullName,
            intro: "Welcome to our app! We're very excited to have you on board",
            action: {
                instructions: "To verify your email please click on the following button:",
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

// forgot password mail content
const forgotPasswordMailContent = (fullName, resetPasswordUrl) => {
    const content = {
        body: {
            name: fullName,
            intro: "We got a request to reset the password of our account",
            action: {
                instructions: "To reset your password click on the following button:",
                button: {
                    text: "Reset Password",
                    link: resetPasswordUrl,
                },
            },
            outro: "Need hepl, or have questions ? Just reply to this email"
        },
    }
    return content
}

export {
    sendEmail,
    emailVerificationMailGenContent,
    forgotPasswordMailContent
}