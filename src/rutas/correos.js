const nodemailer = require('nodemailer')

const createTrans = () => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "31b816a968edc5",
          pass: "e87510eb581f05"
        }
      });
    return transport;
}

const sendMail = async (from,to,subject,html) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: 'foo@example.com',
        to: ['correo1@example.com','correo2@example.com'],
        subject: "Correo de confirmación",
        html: "<b> Correo de confirmación"
    })

    console.log("Mensaje: %s",info.messageId);

    return
}