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

const orderConfirmationMailgenContent = (fullName, items, totalCost) => {
    return {
        body: {
          name: fullName,
          intro: "Your order has been processed successfully.",
          table: {
            data: items?.map((item) => {
              return {
                item: item.product.name,
                price: "INR " + item.product.price + "/-",
                quantity: item.quantity,
              };
            }),
            columns: {
              // Optionally, customize the column widths
              customWidth: {
                item: "30%",
                price: "15%",
                quantity: "15%",
              },
              // Optionally, change column text alignment
              customAlignment: {
                price: "right",
                quantity: "right",
              },
            },
          },
          outro: [
            `Total order cost: INR ${totalCost}/-`,
            "You can check the status of your order and more in your order history",
            "We thank you for your purchase."
          ],
        },
      };
};

const orderStatusUpdateMailgenContent = (fullName, orderId, orderStatus) => {
    return {
        body: {
            name: fullName,
            intro: "Your order status has been updated.",
            table: {
                data: [
                    {
                        item: "Order ID",
                        status: orderId,
                    },
                    {
                        item: "Current Status",
                        status: orderStatus,
                    },
                ],
                columns: {
                    customWidth: {
                        item: "30%",
                        status: "70%",
                    },
                },
            },
            outro: [
                "You can check the status of your order and more in your order history",
                "We thank you for your purchase."
            ],
        },
    };
};

export {
    sendEmail,
    emailVerificationMailGenContent,
    forgotPasswordMailContent,
    orderConfirmationMailgenContent,
    orderStatusUpdateMailgenContent
}